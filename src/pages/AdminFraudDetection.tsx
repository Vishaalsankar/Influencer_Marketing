
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import FraudDetection from "@/components/FraudDetection";
import { getFraudDetectionData } from "@/services/mockData";

const AdminFraudDetection: React.FC = () => {
  const fraudData = getFraudDetectionData();
  
  return (
    <MainLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Detection</h1>
          <p className="text-muted-foreground">
            Monitor and manage potential fraud on the platform
          </p>
        </div>
        
        <FraudDetection fraudData={fraudData} />
      </div>
    </MainLayout>
  );
};

export default AdminFraudDetection;
