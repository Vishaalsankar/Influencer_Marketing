
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercent } from "@/lib/formatters";
import { Ban } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FraudDetectionProps {
  fraudData: {
    influencer_id: string;
    name: string;
    followers: number;
    engagement_rate: number;
    fraud_score: number;
    reason: string;
  }[];
}

const getFraudScoreBadge = (score: number) => {
  if (score >= 80) {
    return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
  } else if (score >= 60) {
    return <Badge className="bg-orange-100 text-orange-800">Medium Risk</Badge>;
  } else {
    return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
  }
};

const FraudDetection: React.FC<FraudDetectionProps> = ({ fraudData }) => {
  const { toast } = useToast();

  const handleBanInfluencer = (influencerId: string, name: string) => {
    // In a real app, this would call an API to ban the influencer
    toast({
      title: "Influencer banned",
      description: `${name} has been banned from the platform.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Detection</CardTitle>
        <CardDescription>
          Influencers flagged for potential fraudulent activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Fraud detection using K-Means clustering on followers, engagement rate, and growth patterns
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Engagement Rate</TableHead>
              <TableHead>Fraud Score</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fraudData.map((item) => (
              <TableRow key={item.influencer_id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{formatNumber(item.followers)}</TableCell>
                <TableCell>{formatPercent(item.engagement_rate)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{item.fraud_score}</span>
                    {getFraudScoreBadge(item.fraud_score)}
                  </div>
                </TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBanInfluencer(item.influencer_id, item.name)}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Ban
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

export default FraudDetection;
