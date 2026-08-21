import type { Metadata } from "next";
import HomeEditorial from "@/components/sections/HomeEditorial";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: siteConfig.defaultMeta.title,
  description: siteConfig.defaultMeta.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return <HomeEditorial />;
}
