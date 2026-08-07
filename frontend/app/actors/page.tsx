"use client"; // 👈 Add this line at top
import TalentCategoryListing from "@/components/TalentCategoryListing/page";
import { Drama } from "lucide-react";

export default function ActorsPage() {
  return (
    <TalentCategoryListing
      category="Actor"
      title="Discover Exceptional Actors & Actresses"
      subtitle="Browse professional theater, film, TV series, and commercial actors available for casting calls and screen roles."
      icon={Drama}
    />
  );
}