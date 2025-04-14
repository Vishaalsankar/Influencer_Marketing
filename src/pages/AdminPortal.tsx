
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUsersByRole } from "@/services/mockData";
import { User } from "@/types";

const AdminPortal: React.FC = () => {
  const adminUsers = getUsersByRole("admin");
  const brandUsers = getUsersByRole("brand");
  const influencerUsers = getUsersByRole("influencer");
  
  const allUsers: (User & { role_badge: JSX.Element })[] = [
    ...adminUsers.map(user => ({
      ...user,
      role_badge: <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
    })),
    ...brandUsers.map(user => ({
      ...user,
      role_badge: <Badge className="bg-blue-100 text-blue-800">Brand</Badge>
    })),
    ...influencerUsers.map(user => ({
      ...user,
      role_badge: <Badge className="bg-green-100 text-green-800">Influencer</Badge>
    }))
  ];
  
  // Sort users by creation date, newest first
  allUsers.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  return (
    <MainLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">
            Manage users, campaigns, and platform settings
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {allUsers.length}
              </CardTitle>
              <CardDescription>Total Users</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {brandUsers.length}
              </CardTitle>
              <CardDescription>Brands</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">
                {influencerUsers.length}
              </CardTitle>
              <CardDescription>Influencers</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all users on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List of all registered users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role_badge}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminPortal;
