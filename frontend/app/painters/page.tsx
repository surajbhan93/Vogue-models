"use client";
import TalentCategoryListing from "@/components/TalentCategoryListing/page";
import { Palette } from "lucide-react";

export default function PaintersPage() {
  return (
    <TalentCategoryListing
      category="Painter"
      title="Discover Exceptional Painters & Visual Artists"
      subtitle="Browse fine art, canvas, digital, mural, and abstract visual artists available for exhibitions and custom art projects."
      icon={Palette}
    />
  );
}