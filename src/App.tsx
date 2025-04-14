
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Portal Pages
import AdminPortal from "./pages/AdminPortal";
import AdminCampaigns from "./pages/AdminCampaigns";
import AdminFraudDetection from "./pages/AdminFraudDetection";
import AdminTests from "./pages/AdminTests";

// Brand Portal Pages
import BrandPortal from "./pages/BrandPortal";
import BrandInfluencerSearch from "./pages/BrandInfluencerSearch";
import BrandAnalytics from "./pages/BrandAnalytics";
import BrandCreateCampaign from "./pages/BrandCreateCampaign";

// Influencer Portal Pages
import InfluencerPortal from "./pages/InfluencerPortal";
import InfluencerCampaigns from "./pages/InfluencerCampaigns";
import InfluencerEarnings from "./pages/InfluencerEarnings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Admin Portal Routes */}
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/campaigns" element={<AdminCampaigns />} />
            <Route path="/admin/fraud-detection" element={<AdminFraudDetection />} />
            <Route path="/admin/tests" element={<AdminTests />} />

            {/* Brand Portal Routes */}
            <Route path="/brand" element={<BrandPortal />} />
            <Route path="/brand/influencer-search" element={<BrandInfluencerSearch />} />
            <Route path="/brand/analytics" element={<BrandAnalytics />} />
            <Route path="/brand/create-campaign" element={<BrandCreateCampaign />} />

            {/* Influencer Portal Routes */}
            <Route path="/influencer" element={<InfluencerPortal />} />
            <Route path="/influencer/campaigns" element={<InfluencerCampaigns />} />
            <Route path="/influencer/earnings" element={<InfluencerEarnings />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
