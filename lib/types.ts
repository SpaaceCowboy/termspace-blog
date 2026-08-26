export type ProductType =
  | "Prompt"
  | "Prompt pack"
  | "Skill"
  | "Agent"
  | "Workflow"
  | "MCP server"
  | "AI tool"
  | "Developer utility";
export type Platform =
  "ChatGPT" | "Claude" | "Codex" | "Cursor" | "VS Code" | "Gemini" | "API";
export type AIModel = "GPT-5" | "Claude 4" | "Gemini 2.5" | "Model agnostic";
export interface Creator {
  id: string;
  name: string;
  handle: string;
  initials: string;
  verified: boolean;
  bio: string;
  products: number;
  followers: number;
}
export interface Pricing {
  amount: number;
  currency: "USD";
  model: "one-time" | "free";
}
export interface Compatibility {
  platforms: Platform[];
  models: AIModel[];
}
export interface ProductVersion {
  version: string;
  date: string;
  notes: string;
}
export interface PermissionDisclosure {
  level: "None" | "Low" | "Moderate";
  items: string[];
  summary: string;
}
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  verifiedPurchase: boolean;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  outcome: string;
  description: string;
  creator: Creator;
  pricing: Pricing;
  compatibility: Compatibility;
  category: string;
  rating: number;
  reviewCount: number;
  usageCount: number;
  updatedAt: string;
  version: string;
  featured?: boolean;
  trending?: boolean;
  verified: boolean;
  tags: string[];
}
