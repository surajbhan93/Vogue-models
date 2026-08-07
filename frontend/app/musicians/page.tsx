"use client";

import TalentCategoryListing from "@/components/TalentCategoryListing/page";
import { Music } from "lucide-react";

export default function MusiciansPage() {
  return (
    <TalentCategoryListing
      category="Musician"
      title="Discover Exceptional Musicians & Composers"
      subtitle="Browse instrumentalists, guitarists, pianists, and music producers available for live gigs and studio sessions."
      icon={Music}
    />
  );
}