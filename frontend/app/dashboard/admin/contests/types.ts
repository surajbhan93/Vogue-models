export type ContestStatus = "draft" | "active" | "ongoing" | "completed" | "cancelled";

export type SubmissionType = "photo" | "video" | "live" | "text";

export type RoundStatus = "upcoming" | "active" | "completed";

export interface Round {
  roundNumber: number;
  name: string;
  description: string;
  submissionType: SubmissionType;
  startDate: string;
  endDate: string;
  maxParticipantsSelected: number;
  status: RoundStatus;
}

export interface Prize {
  position: string;
  title: string;
  cashPrize: number;
  description: string;
}

export interface Eligibility {
  minAge: number;
  maxAge: number;
  gender: "Male" | "Female" | "All";
}

export interface LocationInfo {
  city: string;
  state: string;
  country: string;
  venue: string;
}

export interface ContestResults {
  winner: string;
  runnerUp: string;
  top10: string[];
}

export interface Contest {
  id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  registrationStart: string;
  registrationEnd: string;
  registrationFee: number;
  participationFee: number;
  eligibility: Eligibility;
  location: LocationInfo;
  rounds: Round[];
  prizes: Prize[];
  status: ContestStatus;
  currentStage?: string;
  isFeatured: boolean;
  views?: number;
  registrationsCount?: number;
  results?: ContestResults;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContestFiltersState {
  search: string;
  status: string;
  featured: string; // "all", "true", "false"
  stage: string;
  startDate: string;
  endDate: string;
}

export type ViewMode = "table" | "grid";
