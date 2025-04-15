
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignStatusProps {
  status: string;
  onStatusChange: (status: string) => void;
  disabled?: boolean;
}

const CampaignStatus: React.FC<CampaignStatusProps> = ({
  status,
  onStatusChange,
  disabled = false,
}) => {
  return (
    <Select
      value={status}
      onValueChange={onStatusChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CampaignStatus;
