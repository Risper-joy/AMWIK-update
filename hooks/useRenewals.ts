import { useState, useEffect } from "react";

export default function useRenewals() {
  const [renewals, setRenewals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRenewals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/renewals");
      if (!res.ok) throw new Error("Failed to fetch renewals");
      const data = await res.json();
      setRenewals(data);
    } catch (err: any) {
      setError(err.message || "Error fetching renewals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRenewals();
  }, []);

  return { renewals, loading, error, refetch: fetchRenewals };
}
