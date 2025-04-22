
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { Influencer, InfluencerCategory, InfluencerNiche } from "@/types";
import { useQuery } from "@tanstack/react-query";

const InfluencerPortal: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock data for development until we fetch from Supabase
  const mockInfluencers: Influencer[] = [
    {
      influencer_id: "inf-1",
      user_id: user?.user_id || "",
      name: user?.name || "Demo Influencer",
      category: "micro",
      niches: ["fashion", "beauty"],
      followers: 8000,
      engagement_rate: 5.2,
      fee_inr: 15000,
      platform: "Instagram",
      audience_interests: ["fashion", "beauty", "lifestyle"],
      status: "active",
      profile_image: user?.profile_image || "/placeholder.svg",
      bio: "I'm a lifestyle influencer passionate about fashion and beauty products."
    }
  ];
  
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
    influencerProfile?.bio || "I'm a lifestyle influencer passionate about fashion and beauty products."
  );
  
  const [profileImage, setProfileImage] = React.useState<string>(
    influencerProfile?.profile_image || "/placeholder.svg"
  );
  
  const [selectedNiches, setSelectedNiches] = React.useState<InfluencerNiche[]>(
    influencerProfile?.niches || ["fashion", "beauty"]
  );
  
  const [isEditing, setIsEditing] = React.useState(false);
  
  const [paymentQRCode, setPaymentQRCode] = useState<string | null>(
    influencerProfile?.payment_qr_code || null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNicheChange = (niche: InfluencerNiche) => {
    if (selectedNiches.includes(niche)) {
      setSelectedNiches(selectedNiches.filter(n => n !== niche));
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleQRCodeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.user_id}_qr_code.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('qr-codes')
          .upload(filePath, file, {
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('qr-codes')
          .getPublicUrl(filePath);

        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({ payment_qr_code: publicUrl })
          .eq('user_id', user?.user_id);

        if (profileUpdateError) throw profileUpdateError;

        setPaymentQRCode(publicUrl);
        toast({
          title: "QR Code Uploaded",
          description: "Your payment QR code has been successfully uploaded.",
        });
      } catch (error) {
        console.error("Error uploading QR code:", error);
        toast({
          title: "Upload Failed",
          description: "There was an error uploading your QR code.",
          variant: "destructive",
        });
      }
    }
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
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-24 w-24 border-2 border-primary/10">
                        <AvatarImage src={profileImage} alt={user?.name || "Profile"} />
                        <AvatarFallback className="text-lg">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">{user?.name}</h2>
                        <p className="text-muted-foreground">{user?.email}</p>
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
                      <h3 className="text-sm font-medium text-muted-foreground">Niches</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedNiches.map(niche => (
                          <Badge key={niche} variant="outline" className="capitalize">
                            {niche}
                          </Badge>
                        ))}
                      </div>
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
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24 border-2 border-primary/10">
                          <AvatarImage src={profileImage} alt={user?.name || "Profile"} />
                          <AvatarFallback className="text-lg">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Label htmlFor="profileImage" className="cursor-pointer">
                            Upload Image
                            <Input 
                              id="profileImage" 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload}
                            />
                          </Label>
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 flex-grow">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" value={user?.name} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={user?.email} disabled />
                        </div>
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
                      <Label>Niches (Select all that apply)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {['fitness', 'food', 'cosmetics', 'tech', 'travel', 'vlog', 'fashion', 'beauty', 'lifestyle', 'gaming', 'education'].map((niche) => (
                          <div key={niche} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`niche-${niche}`} 
                              checked={selectedNiches.includes(niche as InfluencerNiche)} 
                              onCheckedChange={() => handleNicheChange(niche as InfluencerNiche)}
                            />
                            <label
                              htmlFor={`niche-${niche}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                              {niche}
                            </label>
                          </div>
                        ))}
                      </div>
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
      
      {isEditing && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary/10">
                <AvatarImage 
                  src={paymentQRCode || "/placeholder.svg"} 
                  alt="Payment QR Code" 
                />
                <AvatarFallback>QR</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="qrCodeUpload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>
                      Upload QR Code
                      <Input 
                        id="qrCodeUpload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleQRCodeUpload}
                      />
                    </span>
                  </Button>
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload your UPI or payment QR code
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
};

export default InfluencerPortal;
