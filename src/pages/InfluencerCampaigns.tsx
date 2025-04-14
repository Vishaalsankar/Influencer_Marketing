
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { mockCampaignInfluencers, mockCampaigns, mockInfluencers } from "@/services/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { formatINR } from "@/lib/formatters";

const InfluencerCampaigns: React.FC = () => {
  const { user } = useAuth();
  
  // Get influencer ID for this user
  const influencer = mockInfluencers.find(inf => inf.user_id === user?.user_id);
  
  // Get all campaigns for this influencer
  const influencerCampaigns = influencer
    ? mockCampaignInfluencers
        .filter(ci => ci.influencer_id === influencer.influencer_id)
        .map(ci => {
          const campaign = mockCampaigns.find(c => c.campaign_id === ci.campaign_id);
          return {
            ...ci,
            campaign_name: campaign?.name || "Unknown Campaign",
            campaign_category: campaign?.category || "Unknown",
            campaign_status: campaign?.status || "draft",
            brand_id: campaign?.brand_id || "",
          };
        })
    : [];
  
  const getContentStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };
  
  return (
    <MainLayout requiredRole="influencer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
          <p className="text-muted-foreground">
            View and manage your campaign collaborations
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Collaborations</CardTitle>
            <CardDescription>
              View all your campaign collaborations and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                {influencerCampaigns.length === 0
                  ? "You are not currently assigned to any campaigns"
                  : `You are part of ${influencerCampaigns.length} campaigns`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Fee (INR)</TableHead>
                  <TableHead>Content Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencerCampaigns.map((campaign) => (
                  <TableRow key={campaign.campaign_id}>
                    <TableCell className="font-medium">
                      {campaign.campaign_name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {campaign.campaign_category}
                    </TableCell>
                    <TableCell className="inr">
                      {formatINR(campaign.fee_inr)}
                    </TableCell>
                    <TableCell>
                      {getContentStatusBadge(campaign.content_status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/influencer/campaigns/${campaign.campaign_id}`}>
                          <span className="sr-only">View details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InfluencerCampaigns;
