
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, FileEdit, Plus, ChevronRight } from "lucide-react";
import { formatINR } from "@/lib/formatters";
import { Campaign, CampaignStatus } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CampaignsListProps {
  campaigns: Campaign[];
  onStatusChange?: (campaignId: string, newStatus: CampaignStatus) => void;
  title?: string;
  description?: string;
}

const CampaignStatusControl: React.FC<{
  status: CampaignStatus;
  onStatusChange: (status: CampaignStatus) => void;
}> = ({ status, onStatusChange }) => {
  const { toast } = useToast();

  const handleStatusChange = (newStatus: CampaignStatus) => {
    onStatusChange(newStatus);
    toast({
      title: "Campaign Status Updated",
      description: `Campaign has been marked as ${newStatus}`,
    });
  };

  return (
    <Select value={status} onValueChange={(value: CampaignStatus) => handleStatusChange(value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue>
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-800"
                : status === "draft"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="draft">
          <div className="flex items-center">
            <FileEdit className="mr-2 h-4 w-4" />
            Draft
          </div>
        </SelectItem>
        <SelectItem value="active">
          <div className="flex items-center">
            <Play className="mr-2 h-4 w-4" />
            Active
          </div>
        </SelectItem>
        <SelectItem value="completed">
          <div className="flex items-center">
            <Pause className="mr-2 h-4 w-4" />
            Completed
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const CampaignsList: React.FC<CampaignsListProps> = ({
  campaigns,
  onStatusChange,
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
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No campaigns found
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((campaign) => (
                <TableRow key={campaign.campaign_id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="capitalize">{campaign.category}</TableCell>
                  <TableCell>{formatINR(campaign.budget_inr)}</TableCell>
                  <TableCell>
                    {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {isBrand && onStatusChange ? (
                      <CampaignStatusControl
                        status={campaign.status}
                        onStatusChange={(newStatus) => onStatusChange(campaign.campaign_id, newStatus)}
                      />
                    ) : (
                      <Badge
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
                    )}
                  </TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
