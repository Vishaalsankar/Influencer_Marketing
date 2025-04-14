
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CampaignForm from "@/components/CampaignForm";

const BrandCreateCampaign: React.FC = () => {
  const handleSubmit = (campaign: any) => {
    console.log("Campaign created:", campaign);
    // In a real app, this would call an API to create the campaign
  };
  
  return (
    <MainLayout requiredRole="brand">
      <CampaignForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default BrandCreateCampaign;
