// app/dashboard/model/selection/components/Types.ts
export interface Round {
  round: number;
  title: string;
  status: 'approved' | 'pending' | 'rejected' | 'skipped';
  remarks?: string;
  reviewedAt?: string;
}

export interface SelectionData {
  _id: string;
  model: string;
  currentRound: number;
  overallStatus: string;
  adminRemarks?: string;
  updatedAt: string;
  rounds: Round[];
}