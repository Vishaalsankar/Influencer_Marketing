
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { mockInfluencers } from "@/services/mockData";
import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { InfluencerCategory } from "@/types";

const InfluencerPortal: React.FC = () => {
  const { user } = useAuth();
  
  // Find the influencer profile for this user
  const influencerProfile = mockInfluencers.find(
    (inf) => inf.user_id === user?.user_id
  );
  
  const [category, setCategory] = React.useState<InfluencerCategory>(
    influencerProfile?.category || "nano"
  );
  const [fee, setFee] = React.useState(
    influencerProfile?.fee_inr.toString() || "15000"
  );
  const [platform, setPlatform] = React.useState(
    influencerProfile?.platform || "Instagram"
  );
  const [interests, setInterests] = React.useState(
    influencerProfile?.audience_interests.join(", ") || "fashion, beauty"
  );
  const [followers, setFollowers] = React.useState(
    influencerProfile?.followers.toString() || "8000"
  );
  const [engagement, setEngagement] = React.useState(
    influencerProfile?.engagement_rate.toString() || "5.2"
  );
  const [bio, setBio] = React.useState(
    "I'm a lifestyle influencer passionate about fashion and beauty products."
  );
  
  const [isEditing, setIsEditing] = React.useState(false);
  
  const handleSave = () => {
    // In a real app, this would call an API to update the profile
    setIsEditing(false);
  };
  
  return (
    <MainLayout requiredRole="influencer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Influencer Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile to attract more brand collaborations
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  ) : (
                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                        <p className="text-base">{user?.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p className="text-base">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                        <Badge className="mt-1 capitalize">
                          {category}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Platform</h3>
                        <p className="text-base">{platform}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                      <p className="text-base">{bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Audience Interests</h3>
                      <p className="text-base capitalize">{interests}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Followers</h3>
                        <p className="text-base">{formatNumber(Number(followers))}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
                        <p className="text-base">{formatPercent(Number(engagement))}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Base Fee</h3>
                        <p className="text-base inr">{formatINR(Number(fee))}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={user?.name} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nano">Nano</SelectItem>
                            <SelectItem value="micro">Micro</SelectItem>
                            <SelectItem value="macro">Macro</SelectItem>
                            <SelectItem value="celebrity">Celebrity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger id="platform">
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="TikTok">TikTok</SelectItem>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="Twitter">Twitter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell brands about yourself"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Audience Interests (comma separated)</Label>
                      <Input
                        id="interests"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="fashion, beauty, lifestyle"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="followers">Followers</Label>
                        <Input
                          id="followers"
                          value={followers}
                          onChange={(e) => setFollowers(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="8000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="engagement">Engagement Rate (%)</Label>
                        <Input
                          id="engagement"
                          value={engagement}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, "");
                            setEngagement(value);
                          }}
                          placeholder="5.2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fee">Base Fee (INR)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            ₹
                          </span>
                          <Input
                            id="fee"
                            value={fee}
                            onChange={(e) => setFee(e.target.value.replace(/[^0-9]/g, ""))}
                            className="pl-7"
                            placeholder="15000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Profile Completion
                    </div>
                    <div className="text-2xl font-bold">
                      100%
                    </div>
                    <div className="w-full h-2 bg-secondary-foreground/20 rounded-full mt-2">
                      <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Profile Visibility
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Visible to Brands
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Verification Status
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Verified
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips to Get More Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</div>
                    <span>Keep your engagement rate above 3%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</div>
                    <span>Add specific niche interests to your profile</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</div>
                    <span>Upload previous campaign examples</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</div>
                    <span>Regularly update your profile stats</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InfluencerPortal;
