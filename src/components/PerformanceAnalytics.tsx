
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatINR, formatPercent } from "@/lib/formatters";
import { Campaign, PerformanceMetric } from "@/types";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface PerformanceAnalyticsProps {
  campaigns: Campaign[];
  metrics: (PerformanceMetric | undefined)[];
}

const COLORS = ["#8B5CF6", "#60A5FA", "#34D399", "#F87171", "#FBBF24"];

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ campaigns, metrics }) => {
  // Filter out any campaigns without metrics
  const campaignsWithMetrics = campaigns
    .filter((_, index) => metrics[index] !== undefined)
    .map((campaign, index) => ({
      ...campaign,
      ...metrics[index],
    }));

  // Prepare data for charts
  const roiData = campaignsWithMetrics.map((item) => ({
    name: item.name,
    roi: item.roi_percent,
  }));

  const cacData = campaignsWithMetrics.map((item) => ({
    name: item.name,
    cac: item.cac_inr,
  }));

  const sentimentData = [
    {
      name: "Positive",
      value: campaignsWithMetrics.filter((item) => (item as any).sentiment_score >= 0.7).length,
    },
    {
      name: "Neutral",
      value: campaignsWithMetrics.filter(
        (item) => (item as any).sentiment_score >= 0.4 && (item as any).sentiment_score < 0.7
      ).length,
    },
    {
      name: "Negative",
      value: campaignsWithMetrics.filter((item) => (item as any).sentiment_score < 0.4).length,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Analytics</CardTitle>
          <CardDescription>
            View ROI, CAC, engagement metrics and sales data for your campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* ROI Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Return on Investment (ROI)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} tickFormatter={(value) => value.substring(0, 10) + (value.length > 10 ? "..." : "")} />
                      <YAxis unit="%" />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, "ROI"]}
                        labelFormatter={(label) => `Campaign: ${label}`}
                      />
                      <Bar dataKey="roi" fill="#8B5CF6" name="ROI %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CAC Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Customer Acquisition Cost (CAC)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cacData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} tickFormatter={(value) => value.substring(0, 10) + (value.length > 10 ? "..." : "")} />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`₹${formatINR(value)}`, "CAC"]}
                        labelFormatter={(label) => `Campaign: ${label}`}
                      />
                      <Line type="monotone" dataKey="cac" stroke="#60A5FA" name="CAC (INR)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [value, "Campaigns"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Campaign Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>CAC</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignsWithMetrics.map((item) => (
                      <TableRow key={item.campaign_id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="inr">{formatINR((item as any).cac_inr)}</TableCell>
                        <TableCell>{formatPercent((item as any).roi_percent)}</TableCell>
                        <TableCell className="inr">{formatINR((item as any).sales_inr)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;
