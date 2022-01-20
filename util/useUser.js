import { useState } from "react";
import { useSessionStorage } from "./useStorage";

export const useUser = () => {
  const [user, setUser] = useSessionStorage("user", null);
  return [user, setUser];
};
