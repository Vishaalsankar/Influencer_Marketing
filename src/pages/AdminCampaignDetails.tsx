
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  Target, 
  TrendingUp, 
  FileText, 
  Users,
  ArrowLeft,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { mockCampaigns, updateCampaignStatus } from "@/services/mockData";
import { formatINR, formatPercent } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";
import { CampaignStatus } from "@/types";

const AdminCampaignDetails: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the campaign by ID (replace with actual Supabase query later)
  const campaign = mockCampaigns.find(c => c.campaign_id === campaignId);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleStatusChange = (newStatus: CampaignStatus) => {
    if (campaign) {
      // Update the campaign status
      updateCampaignStatus(campaign.campaign_id, newStatus);
      
      // Show a toast notification
      toast({
        title: "Campaign Status Updated",
        description: `Campaign has been marked as ${newStatus}`,
      });
    }
  };

  if (!campaign) {
    return (
      <MainLayout requiredRole="admin">
        <div className="space-y-4">
          <Button onClick={handleGoBack} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <div className="text-center text-muted-foreground">Campaign not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requiredRole="admin">
      <div className="space-y-6">
        <Button onClick={handleGoBack} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <Badge 
            variant="outline" 
            className={
              campaign.status === "active" 
                ? "bg-green-100 text-green-800" 
                : campaign.status === "draft" 
                ? "bg-gray-100 text-gray-800" 
                : "bg-blue-100 text-blue-800"
            }
          >
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Campaign Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Brand ID:</span>
                  <span className="font-semibold">{campaign.brand_id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold">{campaign.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goals:</span>
                  <span className="font-semibold">{campaign.goals || "No goals specified"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Budget:</span>
                  <span className="font-semibold inr">{formatINR(campaign.budget_inr)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spent to Date:</span>
                  <span className="font-semibold inr">{formatINR(campaign.budget_inr * 0.4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-semibold inr">{formatINR(campaign.budget_inr * 0.6)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span className="font-semibold">{new Date(campaign.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span className="font-semibold">{new Date(campaign.end_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">
                    {Math.round((new Date(campaign.end_date).getTime() - new Date(campaign.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">Engagement Rate</h3>
                <p className="text-2xl font-bold">{formatPercent(0.042)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">Conversion Rate</h3>
                <p className="text-2xl font-bold">{formatPercent(0.018)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">ROI</h3>
                <p className="text-2xl font-bold">{formatPercent(0.235)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-muted-foreground">Impressions</h3>
                <p className="text-2xl font-bold">242.3K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Influencer Participation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Influencer Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">5 Influencers</p>
                    <p className="text-sm text-muted-foreground">Currently participating in this campaign</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <div className="flex gap-4">
          {campaign.status !== "active" && (
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => handleStatusChange("active")}
            >
              <CheckCircle className="h-4 w-4" />
              Approve Campaign
            </Button>
          )}
          
          {campaign.status === "active" && (
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => handleStatusChange("completed")}
            >
              <CheckCircle className="h-4 w-4" />
              Mark as Completed
            </Button>
          )}
          
          {campaign.status === "draft" && (
            <Button 
              variant="destructive" 
              className="gap-2"
              onClick={() => handleStatusChange("rejected")}
            >
              <XCircle className="h-4 w-4" />
              Reject Campaign
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminCampaignDetails;
