
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronRight } from "lucide-react";
import { formatINR } from "@/lib/formatters";
import { Campaign, CampaignStatus } from "@/types";

interface CampaignsListProps {
  campaigns: Campaign[];
  title?: string;
  description?: string;
}

const getStatusBadge = (status: CampaignStatus) => {
  const statusConfig: Record<CampaignStatus, { label: string; className: string }> = {
    draft: {
      label: "Draft",
      className: "bg-gray-100 text-gray-800",
    },
    active: {
      label: "Active",
      className: "bg-green-100 text-green-800",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-100 text-blue-800",
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

const CampaignsList: React.FC<CampaignsListProps> = ({
  campaigns,
  title = "Your Campaigns",
  description = "View and manage your marketing campaigns",
}) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const isBrand = userRole === "brand";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {isBrand && (
          <Button asChild>
            <Link to="/brand/create-campaign">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            {campaigns.length === 0
              ? "No campaigns found"
              : `List of ${campaigns.length} campaigns`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Budget (INR)</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.campaign_id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell className="capitalize">{campaign.category}</TableCell>
                <TableCell className="inr">{formatINR(campaign.budget_inr)}</TableCell>
                <TableCell>
                  {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      to={
                        isAdmin
                          ? `/admin/campaigns/${campaign.campaign_id}`
                          : `/brand/campaigns/${campaign.campaign_id}`
                      }
                    >
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
  );
};

export default CampaignsList;
