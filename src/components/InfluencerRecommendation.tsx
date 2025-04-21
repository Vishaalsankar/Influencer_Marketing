
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { filterInfluencers } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Influencer, InfluencerCategory } from "@/types";

interface InfluencerRecommendationProps {
  onSelect?: (influencers: Influencer[]) => void;
}

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "fashion", label: "Fashion" },
  { value: "tech", label: "Tech" },
  { value: "beauty", label: "Beauty" },
  { value: "luxury", label: "Luxury" },
  { value: "fitness", label: "Fitness" },
  { value: "food", label: "Food" },
];

const getCategoryLabel = (category: InfluencerCategory): string => {
  switch (category) {
    case "nano":
      return "Nano";
    case "micro":
      return "Micro";
    case "macro":
      return "Macro";
    case "celebrity":
      return "Celebrity";
    default:
      return category;
  }
};

const getCategoryBadge = (category: InfluencerCategory) => {
  const colors: Record<InfluencerCategory, string> = {
    nano: "bg-green-100 text-green-700",
    micro: "bg-blue-100 text-blue-700",
    macro: "bg-purple-100 text-purple-700",
    celebrity: "bg-orange-100 text-orange-700",
  };

  return (
    <Badge className={`font-medium ${colors[category]}`}>
      {getCategoryLabel(category)}
    </Badge>
  );
};

const InfluencerRecommendation: React.FC<InfluencerRecommendationProps> = ({ onSelect }) => {
  const [budgetRange, setBudgetRange] = useState<[number, number]>([20000, 100000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recommendedInfluencers, setRecommendedInfluencers] = useState<Influencer[]>([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);

  useEffect(() => {
    // Get filtered influencers based on budget range, category, and name search
    const filtered = filterInfluencers(budgetRange[0], budgetRange[1], selectedCategory)
      .filter(influencer => 
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setRecommendedInfluencers(filtered);
  }, [budgetRange, selectedCategory, searchQuery]);

  const handleBudgetChange = (values: number[]) => {
    setBudgetRange([values[0], values[1]]);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const toggleInfluencerSelection = (influencerId: string) => {
    setSelectedInfluencers((prev) => {
      if (prev.includes(influencerId)) {
        return prev.filter((id) => id !== influencerId);
      } else {
        return [...prev, influencerId];
      }
    });
  };

  useEffect(() => {
    if (onSelect) {
      const selected = recommendedInfluencers.filter((inf) => 
        selectedInfluencers.includes(inf.influencer_id)
      );
      onSelect(selected);
    }
  }, [selectedInfluencers, recommendedInfluencers, onSelect]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Influencer Recommendations</CardTitle>
        <CardDescription>
          Find the right influencers for your campaign based on budget and category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Set Budget Range (INR)
              </label>
              <div className="pt-6 px-1">
                <Slider
                  defaultValue={[20000, 100000]}
                  min={1000}
                  max={1000000}
                  step={1000}
                  onValueChange={handleBudgetChange}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span className="inr">{formatINR(budgetRange[0])}</span>
                <span className="inr">{formatINR(budgetRange[1])}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Recommended Influencers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery && (
                <span>
                  Searching for "{searchQuery}"{" "}
                </span>
              )}
              Showing influencers with fees between{" "}
              <span className="inr font-medium">{formatINR(budgetRange[0])}</span> and{" "}
              <span className="inr font-medium">{formatINR(budgetRange[1])}</span>
              {selectedCategory !== "all" && (
                <> in the <span className="font-medium">{selectedCategory}</span> category</>
              )}
            </p>

            <div className="border rounded-md">
              <Table>
                <TableCaption>
                  {recommendedInfluencers.length === 0
                    ? "No influencers match your criteria"
                    : `Showing ${recommendedInfluencers.length} influencers`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Fee (INR)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendedInfluencers.map((influencer) => (
                    <TableRow 
                      key={influencer.influencer_id}
                      className={selectedInfluencers.includes(influencer.influencer_id) ? "bg-primary/5" : ""}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedInfluencers.includes(influencer.influencer_id)}
                          onChange={() => toggleInfluencerSelection(influencer.influencer_id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{influencer.name}</TableCell>
                      <TableCell>{getCategoryBadge(influencer.category)}</TableCell>
                      <TableCell>{formatNumber(influencer.followers)}</TableCell>
                      <TableCell>{formatPercent(influencer.engagement_rate)}</TableCell>
                      <TableCell className="inr font-medium">{formatINR(influencer.fee_inr)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerRecommendation;

