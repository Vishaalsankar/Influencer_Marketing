
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import InfluencerRecommendation from "@/components/InfluencerRecommendation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Influencer } from "@/types";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BrandInfluencerSearch: React.FC = () => {
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChatWithInfluencer = (influencer: Influencer) => {
    // Navigate to chat with this influencer
    navigate(`/brand/chat?contact=${influencer.user_id}&name=${encodeURIComponent(influencer.name)}`);
    
    toast({
      title: "Chat initiated",
      description: `Starting conversation with ${influencer.name}`,
    });
  };

  const handleSelectionChange = (influencers: Influencer[]) => {
    setSelectedInfluencers(influencers);
  };

  return (
    <MainLayout requiredRole="brand">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Influencer Search</h1>
          <p className="text-muted-foreground">
            Find the perfect influencers for your campaigns
          </p>
        </div>
        
        <InfluencerRecommendation onSelect={handleSelectionChange} />

        {selectedInfluencers.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Selected Influencers</h3>
            <div className="space-y-4">
              {selectedInfluencers.map((influencer) => (
                <div key={influencer.influencer_id} className="flex justify-between items-center p-3 bg-card rounded-md shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                      <img 
                        src={influencer.profile_image || "/placeholder.svg"} 
                        alt={influencer.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{influencer.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{influencer.category}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleChatWithInfluencer(influencer)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BrandInfluencerSearch;
