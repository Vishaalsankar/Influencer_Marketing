
export type Campaign = {
  campaign_id: string;
  user_id: string;  // Changed from brand_id to user_id
  name: string;
  budget_inr: number;
  start_date: string;
  end_date: string;
  category: string;
  goals: string | null;  // Made goals nullable
  status: CampaignStatus;
  created_at?: string;  // Optional created_at
};
