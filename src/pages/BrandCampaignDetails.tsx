
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
  Users 
} from "lucide-react";
import { useParams } from 'react-router-dom';
import { mockCampaigns } from "@/services/mockData";
import { formatINR, formatPercent } from "@/lib/formatters";

const BrandCampaignDetails: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  
  // Find the campaign by ID (replace with actual Supabase query later)
  const campaign = mockCampaigns.find(c => c.campaign_id === campaignId);

  if (!campaign) {
    return (
      <MainLayout requiredRole="brand">
        <div className="text-center text-muted-foreground">Campaign not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requiredRole="brand">
      <div className="space-y-6">
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
                  <span>Category:</span>
                  <span className="font-semibold">{campaign.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Goals:</span>
                  <span className="font-semibold">{campaign.goals}</span>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline">Edit Campaign</Button>
          <Button>View Influencers</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default BrandCampaignDetails;
