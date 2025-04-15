
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useCampaigns() {
  const queryClient = useQueryClient();

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: "Error",
          description: "Failed to load campaigns",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  const updateCampaignStatus = useMutation({
    mutationFn: async ({ campaignId, status }: { campaignId: string; status: string }) => {
      const { error } = await supabase
        .from('campaigns')
        .update({ status })
        .eq('campaign_id', campaignId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast({
        title: "Success",
        description: "Campaign status updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive",
      });
    },
  });

  return {
    campaigns,
    isLoading,
    updateCampaignStatus,
  };
}
