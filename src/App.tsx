
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import BrandPortal from "@/pages/BrandPortal";
import BrandCreateCampaign from "@/pages/BrandCreateCampaign";
import BrandInfluencerSearch from "@/pages/BrandInfluencerSearch";
import BrandAnalytics from "@/pages/BrandAnalytics";
import BrandCampaignDetails from "@/pages/BrandCampaignDetails";
import InfluencerPortal from "@/pages/InfluencerPortal";
import InfluencerCampaigns from "@/pages/InfluencerCampaigns";
import InfluencerEarnings from "@/pages/InfluencerEarnings";
import AdminPortal from "@/pages/AdminPortal";
import AdminCampaigns from "@/pages/AdminCampaigns";
import AdminCampaignDetails from "@/pages/AdminCampaignDetails";
import AdminFraudDetection from "@/pages/AdminFraudDetection";
import AdminTests from "@/pages/AdminTests";
import NotFound from "@/pages/NotFound";
import Chat from "@/pages/Chat";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Brand Routes */}
            <Route path="/brand" element={<BrandPortal />} />
            <Route path="/brand/create-campaign" element={<BrandCreateCampaign />} />
            <Route path="/brand/influencer-search" element={<BrandInfluencerSearch />} />
            <Route path="/brand/analytics" element={<BrandAnalytics />} />
            <Route path="/brand/campaigns/:campaignId" element={<BrandCampaignDetails />} />
            
            {/* Influencer Routes */}
            <Route path="/influencer" element={<InfluencerPortal />} />
            <Route path="/influencer/campaigns" element={<InfluencerCampaigns />} />
            <Route path="/influencer/earnings" element={<InfluencerEarnings />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/campaigns" element={<AdminCampaigns />} />
            <Route path="/admin/campaigns/:campaignId" element={<AdminCampaignDetails />} />
            <Route path="/admin/fraud-detection" element={<AdminFraudDetection />} />
            <Route path="/admin/tests" element={<AdminTests />} />
            
            {/* Chat Route */}
            <Route path="/chat" element={<Chat />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
