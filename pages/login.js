import { useState, useEffect } from "react";
import { Login } from "../components/Login";

export default function LoginPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? <Login /> : "Loading";
}
