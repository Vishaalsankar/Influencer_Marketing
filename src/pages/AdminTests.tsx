
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import TestScenarios from "@/components/TestScenarios";
import { mockTestScenarios } from "@/services/mockData";

const AdminTests: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Scenarios</h1>
          <p className="text-muted-foreground">
            Run test simulations to analyze campaign performance
          </p>
        </div>
        
        <TestScenarios testScenarios={mockTestScenarios} />
      </div>
    </MainLayout>
  );
};

export default AdminTests;
