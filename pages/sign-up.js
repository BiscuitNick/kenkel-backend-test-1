import { SignUp } from "../components/SignUp";
import { useState, useEffect } from "react";

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? <SignUp /> : null;
}
