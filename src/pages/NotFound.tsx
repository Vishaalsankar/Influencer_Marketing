
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Go to the home page
  };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-md max-w-md">
        <div>
          <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        </div>
        
        <p className="text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button onClick={handleGoHome} className="gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
