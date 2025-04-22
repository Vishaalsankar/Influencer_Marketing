
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Upload, Image, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export interface CampaignActionMenuProps {
  onEdit?: () => void;
  onUploadContent?: () => void;
  onUploadMemo?: () => void;
  onUploadImage?: () => void;
  role: "brand" | "influencer";
}

const CampaignActionMenu: React.FC<CampaignActionMenuProps> = ({
  onEdit,
  onUploadContent,
  onUploadMemo,
  onUploadImage,
  role,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[160px] z-50 bg-background shadow-md border rounded-md">
        {role === "brand" && (
          <DropdownMenuItem asChild>
            <button onClick={onEdit} className="flex items-center gap-2 px-2 py-1 w-full hover:bg-accent">
              <Edit className="h-4 w-4" /> Edit
            </button>
          </DropdownMenuItem>
        )}
        {role === "influencer" && (
          <>
            <DropdownMenuItem asChild>
              <button onClick={onUploadContent} className="flex items-center gap-2 px-2 py-1 w-full hover:bg-accent">
                <Upload className="h-4 w-4" /> Upload Content
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={onUploadMemo} className="flex items-center gap-2 px-2 py-1 w-full hover:bg-accent">
                <FileText className="h-4 w-4" /> Upload Memo
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={onUploadImage} className="flex items-center gap-2 px-2 py-1 w-full hover:bg-accent">
                <Image className="h-4 w-4" /> Upload Image
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignActionMenu;
