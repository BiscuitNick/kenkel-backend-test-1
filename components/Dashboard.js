import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../util/useUser";
import { SignOutButton } from "./SignOutButton";

export const Dashboard = () => {
  const [user, setUser] = useUser();
  const router = useRouter();



  useEffect(() => {
    // if (!window) {
    //   //cannot access window.sessionStorage if window object isn't loaded
    //   return null;
    // }

    if (!user) {
      console.log("You must login to continue");
      router.push("/login");
    }
  }, [user]);

  //   return !isReady ? (
  //     <div>Loading...</div>
  //   ) :
  return user ? (
    <div>
      <h1>Dashboard</h1>
      <div>Welcome {user.name}!</div>
      <SignOutButton setUser={setUser} />
    </div>
  ) : (
    <div>
      Restricted Page. Must be logged in to access this page. Redirecting...
    </div>
  );
};
