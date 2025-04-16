import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CampaignsList from "@/components/CampaignsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, DollarSign, Percent } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getBrandCampaigns, getCampaignPerformance, updateCampaignStatus } from "@/services/mockData";
import { formatINR, formatPercent } from "@/lib/formatters";
import { CampaignStatus } from "@/types";

const BrandPortal: React.FC = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = React.useState(getBrandCampaigns(user?.user_id || ""));
  
  // Calculate summary metrics
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget_inr, 0);
  
  // Calculate average ROI
  const campaignPerformances = campaigns.map(c => getCampaignPerformance(c.campaign_id));
  const validPerformances = campaignPerformances.filter(p => p !== undefined);
  const averageRoi = validPerformances.length > 0
    ? validPerformances.reduce((sum, p) => sum + (p?.roi_percent || 0), 0) / validPerformances.length
    : 0;

  const handleStatusChange = (campaignId: string, newStatus: CampaignStatus) => {
    // In a real app, this would be an API call
    updateCampaignStatus(campaignId, newStatus);
    
    // Update local state
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.campaign_id === campaignId
          ? { ...campaign, status: newStatus }
          : campaign
      )
    );
  };
  
  return (
    <MainLayout requiredRole="brand">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Portal</h1>
          <p className="text-muted-foreground">
            Manage your marketing campaigns and find influencers
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {campaigns.length}
              </CardTitle>
              <CardDescription>Total Campaigns</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {activeCampaigns}
              </CardTitle>
              <CardDescription>Active Campaigns</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl inr">
                {formatINR(totalBudget)}
              </CardTitle>
              <CardDescription>Total Budget</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center">
                {formatPercent(averageRoi)}
                {averageRoi > 0 && (
                  <ArrowUp className="ml-2 h-5 w-5 text-green-500" />
                )}
              </CardTitle>
              <CardDescription>Average ROI</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <Button asChild className="h-24" variant="outline">
                <Link to="/brand/create-campaign">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <div>
                    <div className="font-medium">Create Campaign</div>
                    <div className="text-xs text-muted-foreground">Launch a new marketing campaign</div>
                  </div>
                </Link>
              </Button>
              
              <Button asChild className="h-24" variant="outline">
                <Link to="/brand/influencer-search">
                  <Percent className="h-6 w-6 mb-2" />
                  <div>
                    <div className="font-medium">Find Influencers</div>
                    <div className="text-xs text-muted-foreground">Search and filter influencers</div>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Draft</span>
                  <span className="text-sm font-medium">
                    {campaigns.filter(c => c.status === "draft").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Active</span>
                  <span className="text-sm font-medium">
                    {campaigns.filter(c => c.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-sm font-medium">
                    {campaigns.filter(c => c.status === "completed").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <CampaignsList 
          campaigns={campaigns} 
          onStatusChange={handleStatusChange}
        />
      </div>
    </MainLayout>
  );
};

export default BrandPortal;
