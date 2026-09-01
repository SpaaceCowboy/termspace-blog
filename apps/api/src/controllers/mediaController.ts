import type { Request, Response } from "express";
import sharp from "sharp";
import { prisma } from "../lib/prisma.js";
import { deleteImage, storeImage } from "../lib/mediaStorage.js";

const supportedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function listMedia(_req: Request, res: Response) {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  res.json({ data: assets });
}

export async function uploadMedia(req: Request, res: Response) {
  if (!req.file || !supportedTypes.has(req.file.mimetype)) {
    res.status(400).json({ error: { code: "INVALID_IMAGE", message: "Upload a JPEG, PNG, WebP, or AVIF image" } });
    return;
  }

  const width = Math.min(2400, Math.max(320, Number(req.body.width) || 2000));
  const height = Number(req.body.height) > 0 ? Math.min(2400, Math.max(200, Number(req.body.height))) : undefined;
  const altText = String(req.body.altText ?? "").trim();
  if (!altText || altText.length > 240) {
    res.status(400).json({ error: { code: "INVALID_ALT_TEXT", message: "Alt text is required and must be under 240 characters" } });
    return;
  }

  const sourceMetadata = await sharp(req.file.buffer, { limitInputPixels: 40_000_000 }).metadata();
  if (!sourceMetadata.width || !sourceMetadata.height || sourceMetadata.width * sourceMetadata.height > 40_000_000) {
    res.status(400).json({ error: { code: "IMAGE_TOO_LARGE", message: "Image dimensions are too large" } });
    return;
  }

  const pipeline = sharp(req.file.buffer, { limitInputPixels: 40_000_000 }).rotate().resize({ width, height, fit: height ? "cover" : "inside", withoutEnlargement: true });
  const buffer = await pipeline.webp({ quality: 82 }).toBuffer();
  const metadata = await sharp(buffer).metadata();
  const stored = await storeImage({ buffer, originalName: req.file.originalname, contentType: "image/webp" });
  let asset;
  try {
    asset = await prisma.mediaAsset.create({
      data: {
        ...stored,
        altText,
        mimeType: "image/webp",
        size: buffer.length,
        width: metadata.width,
        height: metadata.height,
      },
    });
  } catch (error) {
    await deleteImage(stored.key).catch((cleanupError) => req.log?.error({ err: cleanupError, key: stored.key }, "Failed to clean up media object"));
    throw error;
  }
  res.status(201).json({ data: asset });
}

export async function removeMedia(req: Request, res: Response) {
  const asset = await prisma.mediaAsset.findUnique({ where: { id: String(req.params.id) } });
  if (!asset) {
    res.status(404).json({ error: { code: "NOT_FOUND", message: "Media asset not found" } });
    return;
  }
  const [articleReference, editionReference] = await Promise.all([
    prisma.article.findFirst({ where: { heroImage: asset.url }, select: { id: true } }),
    prisma.edition.findFirst({ where: { coverImage: asset.url }, select: { id: true } }),
  ]);
  if (articleReference || editionReference) {
    res.status(409).json({ error: { code: "MEDIA_IN_USE", message: "Media is still referenced by published content" } });
    return;
  }

  await prisma.mediaAsset.delete({ where: { id: asset.id } });
  await deleteImage(asset.key);
  res.status(204).send();
}
