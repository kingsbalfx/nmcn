import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await api.get("/auth/me");
        if (mounted) setLoading(false);
      } catch (err) {
        // Not authenticated — redirect to login
        if (mounted) router.push("/login");
      }
    })();

    return () => (mounted = false);
  }, []);

  if (loading) return null;
  return children;
}
