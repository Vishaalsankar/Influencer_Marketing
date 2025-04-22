
import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CampaignForm from "@/components/CampaignForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

const BrandCreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (campaign: any) => {
    try {
      // Generate a new campaign ID
      const campaignId = uuidv4();
      
      // In a real app, this would call the Supabase API to create the campaign
      console.log("Campaign data to be submitted:", campaign);
      
      // Insert campaign into mock data service
      // This would be replaced with a Supabase call in a production app
      const newCampaign = {
        campaign_id: campaignId,
        brand_id: user?.user_id || "",
        name: campaign.name,
        budget_inr: campaign.budget_inr,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        category: campaign.category,
        goals: campaign.goals,
        status: campaign.status || "draft",
      };
      
      // Log the campaign (in production, this would go to Supabase)
      console.log("New campaign created:", newCampaign);
      
      // Show success message
      toast({
        title: "Campaign Created",
        description: "Your campaign has been created successfully.",
      });
      
      // Navigate back to brand portal
      navigate("/brand");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "There was an error creating your campaign. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <MainLayout requiredRole="brand">
      <CampaignForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default BrandCreateCampaign;
