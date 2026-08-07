import TalentCategoryListing from "@/components/TalentCategoryListing/page";
import { Mic } from "lucide-react";

export default function SingersPage() {
  return (
    <TalentCategoryListing
      category="Singer"
      title="Discover Exceptional Singers & Vocalists"
      subtitle="Browse classical, playback, pop, rock, and live performance vocalists available for concerts and music projects."
      icon={Mic}
    />
  );
}