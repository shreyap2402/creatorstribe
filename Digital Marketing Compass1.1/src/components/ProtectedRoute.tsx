import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { LoginModal } from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Auto-show login modal if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <div className="max-w-md w-full mx-4">
            <div className="bg-background rounded-lg border shadow-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
              <p className="text-muted-foreground mb-6">
                This area is restricted to authorized administrators only. 
                Please verify your identity to continue.
              </p>
              
              <Button 
                onClick={() => setShowLoginModal(true)}
                className="w-full"
                size="lg"
              >
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Need access? Contact your system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  return <>{children}</>;
}