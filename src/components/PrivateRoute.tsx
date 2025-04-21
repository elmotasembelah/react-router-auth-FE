// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    if (!hasHydrated) hydrate();
  }, [hasHydrated]);

  if (!hasHydrated) return <div>Loading...</div>;

  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

export default PrivateRoute;
