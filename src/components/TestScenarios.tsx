
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatINR, formatPercent } from "@/lib/formatters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfluencerCategory, TestScenario } from "@/types";
import { PlayCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TestScenariosProps {
  testScenarios: any[];
}

const TestScenarios: React.FC<TestScenariosProps> = ({ testScenarios }) => {
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("luxury");
  const [influencerType, setInfluencerType] = useState<InfluencerCategory>("celebrity");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestScenario | null>(null);
  
  const { toast } = useToast();
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setBudget(value);
  };
  
  const handleRunTest = () => {
    if (!budget) {
      toast({
        title: "Missing budget",
        description: "Please enter a budget amount.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRunning(true);
    
    // In a real app, this would call an API to run the test
    setTimeout(() => {
      // Simulate test results
      let cac_inr, conversion_percent, roi_percent;
      
      if (category === "luxury" && influencerType === "celebrity") {
        cac_inr = 6000;
        conversion_percent = 20;
        roi_percent = 200;
      } else if (category !== "luxury" && influencerType === "nano") {
        cac_inr = 100;
        conversion_percent = 15;
        roi_percent = 300;
      } else if (category !== "luxury" && influencerType === "micro") {
        cac_inr = 300;
        conversion_percent = 18;
        roi_percent = 250;
      } else {
        // Default values for other combinations
        cac_inr = 1000;
        conversion_percent = 10;
        roi_percent = 150;
      }
      
      setResults({
        budget_inr: Number(budget),
        category,
        influencer_type: influencerType,
        results: {
          cac_inr,
          conversion_percent,
          roi_percent,
        },
      });
      
      setIsRunning(false);
      
      toast({
        title: "Test completed",
        description: "The test scenario has been successfully run.",
      });
    }, 2000);
  };
  
  return (
    <Tabs defaultValue="run">
      <TabsList className="mb-4">
        <TabsTrigger value="run">Run Test</TabsTrigger>
        <TabsTrigger value="history">Test History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="run">
        <Card>
          <CardHeader>
            <CardTitle>Run Test Scenario</CardTitle>
            <CardDescription>
              Simulate campaign performance with different parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget (INR)</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="budget"
                      value={budget}
                      onChange={handleBudgetChange}
                      className="pl-7"
                      placeholder="Enter budget amount"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="non-luxury">Non-Luxury</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="influencerType">Influencer Type</Label>
                  <Select value={influencerType} onValueChange={(value) => setInfluencerType(value as InfluencerCategory)}>
                    <SelectTrigger id="influencerType">
                      <SelectValue placeholder="Select influencer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nano">Nano</SelectItem>
                      <SelectItem value="micro">Micro</SelectItem>
                      <SelectItem value="macro">Macro</SelectItem>
                      <SelectItem value="celebrity">Celebrity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                onClick={handleRunTest}
                disabled={isRunning || !budget}
                className="w-full"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                {isRunning ? "Running Test..." : "Run Test"}
              </Button>
              
              {results && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Test Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-secondary p-4 rounded-lg text-center">
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Customer Acquisition Cost
                        </div>
                        <div className="text-2xl font-bold inr">
                          {formatINR(results.results.cac_inr)}
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-4 rounded-lg text-center">
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Conversion Rate
                        </div>
                        <div className="text-2xl font-bold">
                          {formatPercent(results.results.conversion_percent)}
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-4 rounded-lg text-center">
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          ROI
                        </div>
                        <div className="text-2xl font-bold">
                          {formatPercent(results.results.roi_percent)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p className="mb-2">
                        <strong>Scenario:</strong> {results.category} brand using {results.influencer_type} influencers with a budget of{" "}
                        <span className="inr">{formatINR(results.budget_inr)}</span>
                      </p>
                      <p>
                        <strong>Recommendation:</strong>{" "}
                        {results.results.roi_percent >= 250
                          ? "Highly recommended strategy with excellent ROI."
                          : results.results.roi_percent >= 180
                          ? "Recommended strategy with good ROI."
                          : "Consider alternative strategies for better ROI."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Test History</CardTitle>
            <CardDescription>
              View previous test scenarios and their results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List of previously run test scenarios</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Budget (INR)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Influencer Type</TableHead>
                  <TableHead>CAC (INR)</TableHead>
                  <TableHead>Conversion</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testScenarios.map((scenario, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{scenario.name}</TableCell>
                    <TableCell className="inr">{formatINR(scenario.budget_inr)}</TableCell>
                    <TableCell className="capitalize">{scenario.category}</TableCell>
                    <TableCell className="capitalize">{scenario.influencer_type}</TableCell>
                    <TableCell className="inr">{formatINR(scenario.results.cac_inr)}</TableCell>
                    <TableCell>{formatPercent(scenario.results.conversion_percent)}</TableCell>
                    <TableCell>{formatPercent(scenario.results.roi_percent)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TestScenarios;
