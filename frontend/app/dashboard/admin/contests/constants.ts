import { ContestStatus } from "./types";

export const STAGE_OPTIONS = [
  "Published",
  "Registration Open",
  "Registration Closed",
  "Admin Approval",
  "Round 1",
  "Round 2",
  "Semi Final",
  "Grand Finale",
  "Completed",
  "Cancelled",
] as const;

export const STATUS_OPTIONS: { label: string; value: ContestStatus | "all" }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Active", value: "active" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const DEFAULT_CONTEST_FORM = {
  title: "Mr. India Fashion Hunt 2026",
  description: "Join India's biggest fashion modeling competition. Showcase your talent, compete through multiple rounds, and win exciting prizes.",
  bannerImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  registrationStart: "2026-08-01T00:00:00.000Z",
  registrationEnd: "2026-08-20T23:59:59.000Z",
  registrationFee: 0,
  participationFee: 999,
  eligibility: {
    minAge: 18,
    maxAge: 30,
    gender: "Male" as const,
  },
  location: {
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    venue: "Phoenix Convention Centre",
  },
  rounds: [
    {
      roundNumber: 1,
      name: "Round 1 - Photo Submission",
      description: "Upload 5 professional photos including headshot and full body.",
      submissionType: "photo" as const,
      startDate: "2026-08-21T00:00:00.000Z",
      endDate: "2026-08-25T23:59:59.000Z",
      maxParticipantsSelected: 100,
      status: "upcoming" as const,
    },
    {
      roundNumber: 2,
      name: "Round 2 - Video/Ramp Walk",
      description: "Upload a 60-second ramp walk introduction video.",
      submissionType: "video" as const,
      startDate: "2026-08-27T00:00:00.000Z",
      endDate: "2026-08-30T23:59:59.000Z",
      maxParticipantsSelected: 30,
      status: "upcoming" as const,
    },
    {
      roundNumber: 3,
      name: "Semi Final",
      description: "Live interview and fashion challenge.",
      submissionType: "live" as const,
      startDate: "2026-09-05T00:00:00.000Z",
      endDate: "2026-09-05T23:59:59.000Z",
      maxParticipantsSelected: 10,
      status: "upcoming" as const,
    },
    {
      roundNumber: 4,
      name: "Grand Finale",
      description: "Final runway competition.",
      submissionType: "live" as const,
      startDate: "2026-09-10T00:00:00.000Z",
      endDate: "2026-09-10T23:59:59.000Z",
      maxParticipantsSelected: 3,
      status: "upcoming" as const,
    },
  ],
  prizes: [
    {
      position: "Winner",
      title: "Mr. India Fashion Hunt Winner",
      cashPrize: 500000,
      description: "Winner Trophy, Crown and Brand Contracts",
    },
    {
      position: "Runner-up",
      title: "1st Runner-up",
      cashPrize: 200000,
      description: "Runner-up Trophy and Gifts",
    },
    {
      position: "Top 10",
      title: "Top 10 Finalists",
      cashPrize: 25000,
      description: "Certificate and Goodie Bag",
    },
  ],
  status: "draft" as const,
  isFeatured: true,
};
