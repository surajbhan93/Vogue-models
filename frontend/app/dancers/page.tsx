"use client";

import TalentCategoryListing from "@/components/TalentCategoryListing/page";
import { Activity } from "lucide-react";

export default function DancersPage() {
  return (
    <TalentCategoryListing
      category="Dancer"
      title="Discover Exceptional Dancers & Choreographers"
      subtitle="Browse classical, contemporary, hip hop, and commercial dancers available for music videos, shows, and events."
      icon={Activity}
    />
  );
}