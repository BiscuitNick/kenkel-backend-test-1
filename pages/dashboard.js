import { useState, useEffect } from "react";
import { Dashboard } from "../components/Dashboard";

export default function DashboardPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? <Dashboard /> : "Loading...";
}
