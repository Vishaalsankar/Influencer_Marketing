
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockCampaignInfluencers, mockCampaigns, mockInfluencers } from "@/services/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { formatINR } from "@/lib/formatters";

const InfluencerEarnings: React.FC = () => {
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
            campaign_start_date: campaign?.start_date || "",
            brand_id: campaign?.brand_id || "",
          };
        })
    : [];
  
  // Calculate total earnings
  const totalEarnings = influencerCampaigns.reduce((sum, campaign) => {
    // Only count approved content or completed campaigns
    if (campaign.content_status === "approved" || campaign.campaign_status === "completed") {
      return sum + campaign.fee_inr;
    }
    return sum;
  }, 0);
  
  // Calculate pending earnings
  const pendingEarnings = influencerCampaigns.reduce((sum, campaign) => {
    // Only count pending content in active campaigns
    if (campaign.content_status === "pending" && campaign.campaign_status === "active") {
      return sum + campaign.fee_inr;
    }
    return sum;
  }, 0);
  
  // Prepare data for charts
  const earningsData = influencerCampaigns
    .filter(campaign => campaign.content_status === "approved" || campaign.campaign_status === "completed")
    .map(campaign => ({
      name: campaign.campaign_name.substring(0, 15) + (campaign.campaign_name.length > 15 ? "..." : ""),
      earnings: campaign.fee_inr,
    }));
  
  return (
    <MainLayout requiredRole="influencer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Earnings</h1>
          <p className="text-muted-foreground">
            Track your campaign earnings and payment status
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl inr">
                {formatINR(totalEarnings)}
              </CardTitle>
              <CardDescription>Total Earnings</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl inr">
                {formatINR(pendingEarnings)}
              </CardTitle>
              <CardDescription>Pending Earnings</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {influencerCampaigns.filter(c => c.content_status === "approved").length}
              </CardTitle>
              <CardDescription>Approved Content</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {influencerCampaigns.length}
              </CardTitle>
              <CardDescription>Total Campaigns</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>
                Your campaign earnings by project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`₹${formatINR(value)}`, "Earnings"]}
                      labelFormatter={(label) => `Campaign: ${label}`}
                    />
                    <Bar dataKey="earnings" fill="#8B5CF6" name="Earnings (INR)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>
                Status of your campaign payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Paid</span>
                  <Badge className="bg-green-100 text-green-800">
                    <span className="inr">{formatINR(totalEarnings)}</span>
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Pending</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <span className="inr">{formatINR(pendingEarnings)}</span>
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Rejected</span>
                  <Badge className="bg-red-100 text-red-800">
                    <span className="inr">{formatINR(0)}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Details of your campaign payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                {influencerCampaigns.length === 0
                  ? "No payment records found"
                  : "Recent payment history"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (INR)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencerCampaigns.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {campaign.campaign_name}
                    </TableCell>
                    <TableCell>
                      {new Date(campaign.campaign_start_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="inr">
                      {formatINR(campaign.fee_inr)}
                    </TableCell>
                    <TableCell>
                      {campaign.content_status === "approved" ? (
                        <Badge className="bg-green-100 text-green-800">
                          Paid
                        </Badge>
                      ) : campaign.content_status === "rejected" ? (
                        <Badge className="bg-red-100 text-red-800">
                          Rejected
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      )}
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

export default InfluencerEarnings;
