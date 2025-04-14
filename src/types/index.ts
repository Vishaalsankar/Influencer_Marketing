export type UserRole = 'admin' | 'influencer' | 'brand';

export type InfluencerCategory = 'nano' | 'micro' | 'macro' | 'celebrity';

export type InfluencerNiche = 'fitness' | 'food' | 'cosmetics' | 'tech' | 'travel' | 'vlog' | 'fashion' | 'beauty' | 'lifestyle' | 'gaming' | 'education';

export type CampaignStatus = 'draft' | 'active' | 'completed';

export type ContentStatus = 'pending' | 'approved' | 'rejected';

export type User = {
  user_id: string;
  email: string;
  role: UserRole;
  name: string;
  created_at: string;
  profile_image?: string;
};

export type Influencer = {
  influencer_id: string;
  user_id: string;
  name: string;
  category: InfluencerCategory;
  niches: InfluencerNiche[];
  followers: number;
  engagement_rate: number;
  fee_inr: number;
  platform: string;
  audience_interests: string[];
  status: 'active' | 'banned';
  profile_image?: string;
  bio?: string;
};

export type Product = {
  product_id: string;
  name: string;
  category: string;
  price_inr: number;
  demand_level: string;
};

export type Campaign = {
  campaign_id: string;
  brand_id: string;
  name: string;
  budget_inr: number;
  start_date: string;
  end_date: string;
  category: string;
  goals: string;
  status: CampaignStatus;
};

export type CampaignInfluencer = {
  campaign_id: string;
  influencer_id: string;
  fee_inr: number;
  content_url: string;
  content_status: ContentStatus;
};

export type PerformanceMetric = {
  performance_id: string;
  campaign_id: string;
  cac_inr: number;
  roi_percent: number;
  engagement_rate: number;
  sales_inr: number;
  sentiment_score: number;
};

export type FraudScore = {
  influencer_id: string;
  fraud_score: number;
  reason: string;
  updated_at: string;
};

export type TestScenario = {
  budget_inr: number;
  category: string;
  influencer_type: InfluencerCategory;
  results: {
    cac_inr: number;
    conversion_percent: number;
    roi_percent: number;
  };
};

export type Message = {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
  sender_role: UserRole;
};
