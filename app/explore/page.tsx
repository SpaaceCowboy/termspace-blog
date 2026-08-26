import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DiscoveryExperience } from "@/features/discovery/discovery-experience";
export const metadata: Metadata = { title: "Explore" };
export default function ExplorePage() {
  return (
    <>
      <Header />
      <DiscoveryExperience />
      <Footer />
    </>
  );
}
