
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, BarChart2, Users, AlertTriangle, Search, Megaphone, User, BadgeDollarSign } from "lucide-react";

const AppSidebar: React.FC = () => {
  const { user, logout, userRole } = useAuth();
  const location = useLocation();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-4">
          <div className="flex items-center flex-1">
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">PromoPULSE</span>
              <span className="text-xs text-muted-foreground">Influencer Marketing Platform</span>
            </div>
          </div>
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/admin" 
                      className={location.pathname === "/admin" ? "text-primary" : ""}
                    >
                      <Users size={18} />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/admin/campaigns" 
                      className={location.pathname === "/admin/campaigns" ? "text-primary" : ""}
                    >
                      <Megaphone size={18} />
                      <span>Campaigns</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/admin/fraud-detection" 
                      className={location.pathname === "/admin/fraud-detection" ? "text-primary" : ""}
                    >
                      <AlertTriangle size={18} />
                      <span>Fraud Detection</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/admin/tests" 
                      className={location.pathname === "/admin/tests" ? "text-primary" : ""}
                    >
                      <BarChart2 size={18} />
                      <span>Tests</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "brand" && (
          <SidebarGroup>
            <SidebarGroupLabel>Brand Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/brand" 
                      className={location.pathname === "/brand" ? "text-primary" : ""}
                    >
                      <Megaphone size={18} />
                      <span>Campaigns</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/brand/influencer-search" 
                      className={location.pathname === "/brand/influencer-search" ? "text-primary" : ""}
                    >
                      <Search size={18} />
                      <span>Influencer Search</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/brand/analytics" 
                      className={location.pathname === "/brand/analytics" ? "text-primary" : ""}
                    >
                      <BarChart2 size={18} />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "influencer" && (
          <SidebarGroup>
            <SidebarGroupLabel>Influencer Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/influencer" 
                      className={location.pathname === "/influencer" ? "text-primary" : ""}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/influencer/campaigns" 
                      className={location.pathname === "/influencer/campaigns" ? "text-primary" : ""}
                    >
                      <Megaphone size={18} />
                      <span>Campaigns</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/influencer/earnings" 
                      className={location.pathname === "/influencer/earnings" ? "text-primary" : ""}
                    >
                      <BadgeDollarSign size={18} />
                      <span>Earnings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarFallback>
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={logout}>
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
