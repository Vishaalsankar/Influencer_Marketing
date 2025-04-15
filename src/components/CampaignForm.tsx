import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import InfluencerRecommendation from "./InfluencerRecommendation";
import { Influencer } from "@/types";
import { supabase } from "@/lib/supabase";

interface CampaignFormProps {
  onSubmit?: (campaign: any) => void;
}

const CATEGORY_OPTIONS = [
  { value: "fashion", label: "Fashion" },
  { value: "tech", label: "Tech" },
  { value: "beauty", label: "Beauty" },
  { value: "luxury", label: "Luxury" },
  { value: "fitness", label: "Fitness" },
  { value: "food", label: "Food" },
];

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [goals, setGoals] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setBudget(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!name || !budget || !category || !startDate || !endDate || !goals) {
        toast({
          title: "Missing fields",
          description: "Please fill in all the required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (new Date(startDate) > new Date(endDate)) {
        toast({
          title: "Invalid dates",
          description: "End date must be after start date.",
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
      return;
    }
    
    if (selectedInfluencers.length === 0) {
      toast({
        title: "No influencers selected",
        description: "Please select at least one influencer for your campaign.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          name,
          budget_inr: Number(budget),
          category,
          goals,
          start_date: startDate?.toISOString().split("T")[0],
          end_date: endDate?.toISOString().split("T")[0],
          status: "draft"
        })
        .select()
        .single();

      if (campaignError) throw campaignError;

      if (campaign) {
        const influencerLinks = selectedInfluencers.map((influencer) => ({
          campaign_id: campaign.campaign_id,
          influencer_id: influencer.influencer_id
        }));

        const { error: influencerError } = await supabase
          .from('campaign_influencers')
          .insert(influencerLinks);

        if (influencerError) throw influencerError;
      }

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      navigate("/brand");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInfluencerSelect = (influencers: Influencer[]) => {
    setSelectedInfluencers(influencers);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create a New Campaign</h1>
        <p className="text-muted-foreground">
          {step === 1
            ? "Fill in your campaign details"
            : "Select influencers for your campaign"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                Provide basic information about your marketing campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Summer Collection Launch"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget (INR)</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="budget"
                      value={budget}
                      onChange={handleBudgetChange}
                      className="pl-7"
                      placeholder="50000"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) =>
                            startDate ? date < startDate : false
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="goals">Campaign Goals</Label>
                  <Textarea
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="Describe the goals and objectives of your campaign"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/brand")}>
                Cancel
              </Button>
              <Button type="submit">Continue to Select Influencers</Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <InfluencerRecommendation onSelect={handleInfluencerSelect} />
            
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to Campaign Details
              </Button>
              <div className="flex gap-2">
                {selectedInfluencers.length > 0 && (
                  <div className="flex items-center mr-4">
                    <span className="text-sm font-medium mr-2">
                      Selected Influencers:
                    </span>
                    <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                      {selectedInfluencers.length}
                    </span>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CampaignForm;
