
export type Campaign = {
  campaign_id: string;
  brand_id: string; // Added this line
  name: string;
  budget_inr: number;
  start_date: string;
  end_date: string;
  category: string;
  goals: string;
  status: CampaignStatus;
};
