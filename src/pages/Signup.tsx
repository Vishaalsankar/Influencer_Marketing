
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { PhoneVerification } from "@/components/auth/PhoneVerification";

const Signup: React.FC = () => {
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [verificationPhone, setVerificationPhone] = useState("");
  const { isAuthenticated, userRole } = useAuth();

  const handleSignupSuccess = (phone: string) => {
    setVerificationPhone(phone);
    setShowOtpVerification(true);
  };

  const handlePhoneVerified = () => {
    if (userRole === "brand") {
      window.location.href = "/brand";
    } else {
      window.location.href = "/influencer";
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (userRole === "admin") {
      return <Navigate to="/admin" />;
    } else if (userRole === "brand") {
      return <Navigate to="/brand" />;
    } else if (userRole === "influencer") {
      return <Navigate to="/influencer" />;
    }
  }

  if (showOtpVerification) {
    return (
      <AuthLayout
        title="Verify your phone"
        description="Enter the verification code sent to your phone"
        footerText=""
        footerLink={{ text: "", to: "" }}
      >
        <PhoneVerification phone={verificationPhone} onVerified={handlePhoneVerified} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Sign Up"
      description="Create your account"
      footerText="Already have an account?"
      footerLink={{ text: "Sign in", to: "/login" }}
    >
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </AuthLayout>
  );
};

export default Signup;
