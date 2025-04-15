
import { 
  User, 
  Influencer, 
  Campaign, 
  CampaignInfluencer, 
  PerformanceMetric, 
  FraudScore, 
  Product 
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    user_id: "1",
    email: "admin@promopulse.com",
    role: "admin",
    name: "Admin User",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    user_id: "2",
    email: "brand@promopulse.com",
    role: "brand",
    name: "Fashion Brand",
    created_at: "2023-01-02T00:00:00Z",
  },
  {
    user_id: "3",
    email: "influencer@promopulse.com",
    role: "influencer",
    name: "Priya Sharma",
    created_at: "2023-01-03T00:00:00Z",
  },
  {
    user_id: "4",
    email: "technobrand@promopulse.com",
    role: "brand",
    name: "Tech Innovations",
    created_at: "2023-01-04T00:00:00Z",
  },
  {
    user_id: "5",
    email: "beautybrand@promopulse.com",
    role: "brand",
    name: "Glamour Beauty",
    created_at: "2023-01-05T00:00:00Z",
  },
  {
    user_id: "6",
    email: "amit@promopulse.com",
    role: "influencer",
    name: "Amit Kumar",
    created_at: "2023-01-06T00:00:00Z",
  },
  {
    user_id: "7",
    email: "neha@promopulse.com",
    role: "influencer",
    name: "Neha Gupta",
    created_at: "2023-01-07T00:00:00Z",
  },
  {
    user_id: "8",
    email: "rahul@promopulse.com",
    role: "influencer",
    name: "Rahul Singh",
    created_at: "2023-01-08T00:00:00Z",
  },
  {
    user_id: "9",
    email: "foodbrand@promopulse.com",
    role: "brand",
    name: "Tasty Treats",
    created_at: "2023-01-09T00:00:00Z",
  },
  {
    user_id: "10",
    email: "admin2@promopulse.com",
    role: "admin",
    name: "Super Admin",
    created_at: "2023-01-10T00:00:00Z",
  },
];

// Mock Influencers
export const mockInfluencers: Influencer[] = [
  {
    influencer_id: "1",
    user_id: "3",
    name: "Priya Sharma",
    category: "nano",
    followers: 8000,
    engagement_rate: 5.2,
    fee_inr: 15000,
    platform: "Instagram",
    audience_interests: ["fashion", "beauty"],
    status: "active",
  },
  {
    influencer_id: "2",
    user_id: "6",
    name: "Amit Kumar",
    category: "micro",
    followers: 35000,
    engagement_rate: 4.1,
    fee_inr: 45000,
    platform: "Instagram",
    audience_interests: ["tech", "gadgets"],
    status: "active",
  },
  {
    influencer_id: "3",
    user_id: "7",
    name: "Neha Gupta",
    category: "micro",
    followers: 52000,
    engagement_rate: 3.8,
    fee_inr: 65000,
    platform: "Instagram",
    audience_interests: ["fashion", "luxury", "travel"],
    status: "active",
  },
  {
    influencer_id: "4",
    user_id: "8",
    name: "Rahul Singh",
    category: "macro",
    followers: 180000,
    engagement_rate: 2.9,
    fee_inr: 120000,
    platform: "Instagram",
    audience_interests: ["fitness", "nutrition", "health"],
    status: "active",
  },
  {
    influencer_id: "5",
    user_id: "",
    name: "Ananya Patel",
    category: "nano",
    followers: 9500,
    engagement_rate: 6.3,
    fee_inr: 18000,
    platform: "Instagram",
    audience_interests: ["food", "cooking", "travel"],
    status: "active",
  },
  {
    influencer_id: "6",
    user_id: "",
    name: "Vikram Malhotra",
    category: "macro",
    followers: 220000,
    engagement_rate: 2.7,
    fee_inr: 150000,
    platform: "Instagram",
    audience_interests: ["tech", "gaming", "entertainment"],
    status: "active",
  },
  {
    influencer_id: "7",
    user_id: "",
    name: "Shreya Kapoor",
    category: "micro",
    followers: 45000,
    engagement_rate: 4.5,
    fee_inr: 55000,
    platform: "Instagram",
    audience_interests: ["beauty", "skincare", "wellness"],
    status: "active",
  },
  {
    influencer_id: "8",
    user_id: "",
    name: "Arjun Reddy",
    category: "macro",
    followers: 320000,
    engagement_rate: 2.4,
    fee_inr: 180000,
    platform: "Instagram",
    audience_interests: ["fitness", "sports", "lifestyle"],
    status: "active",
  },
  {
    influencer_id: "9",
    user_id: "",
    name: "Kavita Desai",
    category: "nano",
    followers: 12000,
    engagement_rate: 5.8,
    fee_inr: 22000,
    platform: "Instagram",
    audience_interests: ["art", "design", "creativity"],
    status: "active",
  },
  {
    influencer_id: "10",
    user_id: "",
    name: "Rohan Mehta",
    category: "micro",
    followers: 75000,
    engagement_rate: 3.5,
    fee_inr: 80000,
    platform: "Instagram",
    audience_interests: ["tech", "business", "startups"],
    status: "active",
  },
  {
    influencer_id: "11",
    user_id: "",
    name: "Divya Sharma",
    category: "nano",
    followers: 15000,
    engagement_rate: 5.5,
    fee_inr: 25000,
    platform: "Instagram",
    audience_interests: ["fashion", "streetwear", "lifestyle"],
    status: "active",
  },
  {
    influencer_id: "12",
    user_id: "",
    name: "Kabir Khanna",
    category: "celebrity",
    followers: 1200000,
    engagement_rate: 1.8,
    fee_inr: 500000,
    platform: "Instagram",
    audience_interests: ["luxury", "travel", "lifestyle"],
    status: "active",
  },
  {
    influencer_id: "13",
    user_id: "",
    name: "Meera Iyer",
    category: "micro",
    followers: 42000,
    engagement_rate: 4.2,
    fee_inr: 50000,
    platform: "Instagram",
    audience_interests: ["food", "recipes", "home cooking"],
    status: "active",
  },
  {
    influencer_id: "14",
    user_id: "",
    name: "Aditya Nair",
    category: "macro",
    followers: 280000,
    engagement_rate: 2.5,
    fee_inr: 160000,
    platform: "Instagram",
    audience_interests: ["finance", "investing", "business"],
    status: "active",
  },
  {
    influencer_id: "15",
    user_id: "",
    name: "Ritu Verma",
    category: "celebrity",
    followers: 950000,
    engagement_rate: 2.0,
    fee_inr: 350000,
    platform: "Instagram",
    audience_interests: ["fashion", "luxury", "beauty"],
    status: "active",
  },
  {
    influencer_id: "16",
    user_id: "",
    name: "Siddharth Roy",
    category: "nano",
    followers: 7500,
    engagement_rate: 7.1,
    fee_inr: 12000,
    platform: "Instagram",
    audience_interests: ["tech", "gadgets", "reviews"],
    status: "active",
  },
  {
    influencer_id: "17",
    user_id: "",
    name: "Tanvi Menon",
    category: "micro",
    followers: 60000,
    engagement_rate: 3.9,
    fee_inr: 70000,
    platform: "Instagram",
    audience_interests: ["travel", "adventure", "photography"],
    status: "active",
  },
  {
    influencer_id: "18",
    user_id: "",
    name: "Vivek Choudhary",
    category: "macro",
    followers: 195000,
    engagement_rate: 2.8,
    fee_inr: 130000,
    platform: "Instagram",
    audience_interests: ["fitness", "nutrition", "wellness"],
    status: "active",
  },
  {
    influencer_id: "19",
    user_id: "",
    name: "Preeti Joshi",
    category: "nano",
    followers: 11000,
    engagement_rate: 6.0,
    fee_inr: 20000,
    platform: "Instagram",
    audience_interests: ["beauty", "skincare", "makeup"],
    status: "active",
  },
  {
    influencer_id: "20",
    user_id: "",
    name: "Karan Saxena",
    category: "celebrity",
    followers: 1500000,
    engagement_rate: 1.7,
    fee_inr: 800000,
    platform: "Instagram",
    audience_interests: ["entertainment", "music", "lifestyle"],
    status: "active",
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    product_id: "1",
    name: "Smartphone",
    category: "tech",
    price_inr: 50000,
    demand_level: "high",
  },
  {
    product_id: "2",
    name: "Designer Handbag",
    category: "luxury",
    price_inr: 75000,
    demand_level: "medium",
  },
  {
    product_id: "3",
    name: "Skincare Set",
    category: "beauty",
    price_inr: 3500,
    demand_level: "high",
  },
  {
    product_id: "4",
    name: "Fitness Tracker",
    category: "fitness",
    price_inr: 8000,
    demand_level: "medium",
  },
  {
    product_id: "5",
    name: "Coffee Maker",
    category: "home",
    price_inr: 12000,
    demand_level: "medium",
  },
  {
    product_id: "6",
    name: "Gaming Console",
    category: "tech",
    price_inr: 45000,
    demand_level: "high",
  },
  {
    product_id: "7",
    name: "Premium Headphones",
    category: "tech",
    price_inr: 25000,
    demand_level: "high",
  },
  {
    product_id: "8",
    name: "Designer Watch",
    category: "luxury",
    price_inr: 120000,
    demand_level: "medium",
  },
  {
    product_id: "9",
    name: "Protein Powder",
    category: "fitness",
    price_inr: 2500,
    demand_level: "high",
  },
  {
    product_id: "10",
    name: "Smart Home System",
    category: "tech",
    price_inr: 35000,
    demand_level: "medium",
  },
  {
    product_id: "11",
    name: "Luxury Perfume",
    category: "beauty",
    price_inr: 8000,
    demand_level: "high",
  },
  {
    product_id: "12",
    name: "Trail Running Shoes",
    category: "fitness",
    price_inr: 12000,
    demand_level: "medium",
  },
  {
    product_id: "13",
    name: "Gourmet Food Box",
    category: "food",
    price_inr: 3000,
    demand_level: "medium",
  },
  {
    product_id: "14",
    name: "Designer Sunglasses",
    category: "fashion",
    price_inr: 15000,
    demand_level: "high",
  },
  {
    product_id: "15",
    name: "Electric Scooter",
    category: "tech",
    price_inr: 70000,
    demand_level: "medium",
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    campaign_id: "1",
    brand_id: "2",
    name: "Summer Fashion Collection",
    budget_inr: 250000,
    start_date: "2023-04-01",
    end_date: "2023-05-15",
    category: "fashion",
    goals: "Increase brand awareness and drive sales of new summer collection",
    status: "active",
  },
  {
    campaign_id: "2",
    brand_id: "4",
    name: "Tech Gadget Launch",
    budget_inr: 500000,
    start_date: "2023-05-10",
    end_date: "2023-06-10",
    category: "tech",
    goals: "Generate buzz around new smartphone launch",
    status: "active",
  },
  {
    campaign_id: "3",
    brand_id: "5",
    name: "Skincare Awareness",
    budget_inr: 150000,
    start_date: "2023-03-15",
    end_date: "2023-04-15",
    category: "beauty",
    goals: "Educate audience about skincare routine and promote products",
    status: "completed",
  },
  {
    campaign_id: "4",
    brand_id: "9",
    name: "Healthy Eating Challenge",
    budget_inr: 100000,
    start_date: "2023-06-01",
    end_date: "2023-06-30",
    category: "food",
    goals: "Promote healthy recipes using brand products",
    status: "draft",
  },
  {
    campaign_id: "5",
    brand_id: "2",
    name: "Winter Collection Preview",
    budget_inr: 300000,
    start_date: "2023-09-01",
    end_date: "2023-10-15",
    category: "fashion",
    goals: "Generate pre-orders for winter collection",
    status: "draft",
  },
  {
    campaign_id: "6",
    brand_id: "4",
    name: "Gaming Accessories Promotion",
    budget_inr: 350000,
    start_date: "2023-07-01",
    end_date: "2023-08-15",
    category: "tech",
    goals: "Increase sales of gaming peripherals",
    status: "active",
  },
  {
    campaign_id: "7",
    brand_id: "5",
    name: "Makeup Tutorial Series",
    budget_inr: 200000,
    start_date: "2023-04-01",
    end_date: "2023-05-31",
    category: "beauty",
    goals: "Showcase makeup techniques using brand products",
    status: "completed",
  },
  {
    campaign_id: "8",
    brand_id: "9",
    name: "Festive Season Recipes",
    budget_inr: 180000,
    start_date: "2023-10-01",
    end_date: "2023-11-15",
    category: "food",
    goals: "Share festive recipes featuring brand products",
    status: "draft",
  },
  {
    campaign_id: "9",
    brand_id: "2",
    name: "Sustainable Fashion Initiative",
    budget_inr: 400000,
    start_date: "2023-08-01",
    end_date: "2023-09-30",
    category: "fashion",
    goals: "Highlight brand's sustainable practices and eco-friendly products",
    status: "active",
  },
  {
    campaign_id: "10",
    brand_id: "4",
    name: "Work From Home Essentials",
    budget_inr: 275000,
    start_date: "2023-02-15",
    end_date: "2023-04-15",
    category: "tech",
    goals: "Promote tech products for remote work",
    status: "completed",
  },
];

// Mock Campaign Influencers
export const mockCampaignInfluencers: CampaignInfluencer[] = [
  {
    campaign_id: "1",
    influencer_id: "1",
    fee_inr: 15000,
    content_url: "https://instagram.com/content1",
    content_status: "approved",
  },
  {
    campaign_id: "1",
    influencer_id: "3",
    fee_inr: 65000,
    content_url: "https://instagram.com/content2",
    content_status: "approved",
  },
  {
    campaign_id: "1",
    influencer_id: "15",
    fee_inr: 350000,
    content_url: "https://instagram.com/content3",
    content_status: "pending",
  },
  {
    campaign_id: "2",
    influencer_id: "2",
    fee_inr: 45000,
    content_url: "https://instagram.com/content4",
    content_status: "approved",
  },
  {
    campaign_id: "2",
    influencer_id: "6",
    fee_inr: 150000,
    content_url: "https://instagram.com/content5",
    content_status: "pending",
  },
  {
    campaign_id: "2",
    influencer_id: "10",
    fee_inr: 80000,
    content_url: "https://instagram.com/content6",
    content_status: "approved",
  },
  {
    campaign_id: "3",
    influencer_id: "7",
    fee_inr: 55000,
    content_url: "https://instagram.com/content7",
    content_status: "approved",
  },
  {
    campaign_id: "3",
    influencer_id: "19",
    fee_inr: 20000,
    content_url: "https://instagram.com/content8",
    content_status: "approved",
  },
  {
    campaign_id: "4",
    influencer_id: "5",
    fee_inr: 18000,
    content_url: "",
    content_status: "pending",
  },
  {
    campaign_id: "4",
    influencer_id: "13",
    fee_inr: 50000,
    content_url: "",
    content_status: "pending",
  },
  {
    campaign_id: "6",
    influencer_id: "2",
    fee_inr: 45000,
    content_url: "https://instagram.com/content11",
    content_status: "approved",
  },
  {
    campaign_id: "6",
    influencer_id: "6",
    fee_inr: 150000,
    content_url: "https://instagram.com/content12",
    content_status: "pending",
  },
  {
    campaign_id: "6",
    influencer_id: "14",
    fee_inr: 160000,
    content_url: "https://instagram.com/content13",
    content_status: "pending",
  },
  {
    campaign_id: "7",
    influencer_id: "3",
    fee_inr: 65000,
    content_url: "https://instagram.com/content14",
    content_status: "approved",
  },
  {
    campaign_id: "7",
    influencer_id: "7",
    fee_inr: 55000,
    content_url: "https://instagram.com/content15",
    content_status: "approved",
  },
  {
    campaign_id: "7",
    influencer_id: "15",
    fee_inr: 350000,
    content_url: "https://instagram.com/content16",
    content_status: "approved",
  },
  {
    campaign_id: "9",
    influencer_id: "1",
    fee_inr: 15000,
    content_url: "https://instagram.com/content17",
    content_status: "pending",
  },
  {
    campaign_id: "9",
    influencer_id: "11",
    fee_inr: 25000,
    content_url: "https://instagram.com/content18",
    content_status: "approved",
  },
  {
    campaign_id: "9",
    influencer_id: "15",
    fee_inr: 350000,
    content_url: "https://instagram.com/content19",
    content_status: "pending",
  },
  {
    campaign_id: "10",
    influencer_id: "2",
    fee_inr: 45000,
    content_url: "https://instagram.com/content20",
    content_status: "approved",
  },
];

// Mock Performance Metrics
export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    performance_id: "1",
    campaign_id: "1",
    cac_inr: 350,
    roi_percent: 220,
    engagement_rate: 4.8,
    sales_inr: 800000,
    sentiment_score: 0.8,
  },
  {
    performance_id: "2",
    campaign_id: "2",
    cac_inr: 450,
    roi_percent: 180,
    engagement_rate: 4.2,
    sales_inr: 1400000,
    sentiment_score: 0.75,
  },
  {
    performance_id: "3",
    campaign_id: "3",
    cac_inr: 280,
    roi_percent: 250,
    engagement_rate: 5.1,
    sales_inr: 525000,
    sentiment_score: 0.9,
  },
  {
    performance_id: "4",
    campaign_id: "6",
    cac_inr: 380,
    roi_percent: 190,
    engagement_rate: 3.9,
    sales_inr: 1015000,
    sentiment_score: 0.72,
  },
  {
    performance_id: "5",
    campaign_id: "7",
    cac_inr: 320,
    roi_percent: 230,
    engagement_rate: 4.7,
    sales_inr: 660000,
    sentiment_score: 0.85,
  },
  {
    performance_id: "6",
    campaign_id: "9",
    cac_inr: 420,
    roi_percent: 150,
    engagement_rate: 4.0,
    sales_inr: 1000000,
    sentiment_score: 0.65,
  },
  {
    performance_id: "7",
    campaign_id: "10",
    cac_inr: 290,
    roi_percent: 240,
    engagement_rate: 4.5,
    sales_inr: 935000,
    sentiment_score: 0.82,
  },
];

// Mock Fraud Scores
export const mockFraudScores: FraudScore[] = [
  {
    influencer_id: "6",
    fraud_score: 85,
    reason: "Suspicious follower growth pattern",
    updated_at: "2023-04-15T10:30:00Z",
  },
  {
    influencer_id: "10",
    fraud_score: 72,
    reason: "Engagement anomalies",
    updated_at: "2023-04-20T14:45:00Z",
  },
  {
    influencer_id: "14",
    fraud_score: 68,
    reason: "Bot-like comments",
    updated_at: "2023-04-25T09:15:00Z",
  },
  {
    influencer_id: "17",
    fraud_score: 78,
    reason: "Purchased engagement",
    updated_at: "2023-05-02T11:20:00Z",
  },
  {
    influencer_id: "20",
    fraud_score: 90,
    reason: "Fake followers",
    updated_at: "2023-05-10T16:00:00Z",
  },
];

// Test Scenarios
export const mockTestScenarios = [
  {
    id: "1",
    name: "Luxury Brand with Celebrity Influencer",
    budget_inr: 1500000,
    category: "luxury",
    influencer_type: "celebrity",
    results: {
      cac_inr: 6000,
      conversion_percent: 20,
      roi_percent: 200,
    },
  },
  {
    id: "2",
    name: "Non-Luxury Brand with Nano Influencer",
    budget_inr: 25000,
    category: "fashion",
    influencer_type: "nano",
    results: {
      cac_inr: 100,
      conversion_percent: 15,
      roi_percent: 300,
    },
  },
  {
    id: "3",
    name: "Non-Luxury Brand with Micro Influencer",
    budget_inr: 100000,
    category: "tech",
    influencer_type: "micro",
    results: {
      cac_inr: 300,
      conversion_percent: 18,
      roi_percent: 250,
    },
  },
];

// Helper function to filter influencers by budget range and category
export const filterInfluencers = (
  minBudget: number,
  maxBudget: number,
  category?: string
): Influencer[] => {
  let filtered = mockInfluencers.filter(
    (inf) => inf.fee_inr >= minBudget && inf.fee_inr <= maxBudget
  );

  if (category && category !== "all") {
    filtered = filtered.filter((inf) =>
      inf.audience_interests.includes(category.toLowerCase())
    );
  }

  // Sort by a score based on engagement rate and fee efficiency
  // This simulates the AI ranking without implementing a real ML model
  return filtered.sort((a, b) => {
    const scoreA = a.engagement_rate * 10 - a.fee_inr / 10000;
    const scoreB = b.engagement_rate * 10 - b.fee_inr / 10000;
    return scoreB - scoreA;
  });
};

// Helper function to get campaigns for a specific brand
export const getBrandCampaigns = (brandId: string): Campaign[] => {
  return mockCampaigns.filter((campaign) => campaign.brand_id === brandId);
};

// Helper function to get influencers for a specific campaign
export const getCampaignInfluencers = (campaignId: string): any[] => {
  const campaignInfluencers = mockCampaignInfluencers.filter(
    (ci) => ci.campaign_id === campaignId
  );
  
  return campaignInfluencers.map((ci) => {
    const influencer = mockInfluencers.find(
      (inf) => inf.influencer_id === ci.influencer_id
    );
    
    return {
      ...ci,
      influencer_name: influencer?.name || "Unknown",
      category: influencer?.category || "unknown",
      followers: influencer?.followers || 0,
      engagement_rate: influencer?.engagement_rate || 0,
    };
  });
};

// Helper function to get performance metrics for a specific campaign
export const getCampaignPerformance = (campaignId: string): PerformanceMetric | undefined => {
  return mockPerformanceMetrics.find((metric) => metric.campaign_id === campaignId);
};

// Helper function to get all users of a specific role
export const getUsersByRole = (role: "admin" | "influencer" | "brand"): User[] => {
  return mockUsers.filter((user) => user.role === role);
};

// Helper function to get fraud detection data with influencer details
export const getFraudDetectionData = (): any[] => {
  return mockFraudScores.map((fraud) => {
    const influencer = mockInfluencers.find(
      (inf) => inf.influencer_id === fraud.influencer_id
    );
    
    return {
      ...fraud,
      name: influencer?.name || "Unknown",
      followers: influencer?.followers || 0,
      engagement_rate: influencer?.engagement_rate || 0,
    };
  });
};
