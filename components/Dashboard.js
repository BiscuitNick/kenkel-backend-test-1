import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/useUser";

import Link from "next/link";

export const Dashboard = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useUser(); //[user, setUser] = useUser();

  useEffect(() => {
    if (isLoggedIn === false) {
      const delayedRedirect = setTimeout(() => {
        //console.log("This will run after 1 second!");
        router.push("/login");
      }, 3000);
      return () => clearTimeout(delayedRedirect);
    }
  }, [isLoggedIn]);

  return isLoggedIn && user ? (
    <div className="box">
      <h1>{user.name} &apos;s Dashboard</h1>
      <form>
        <label>Name</label>
        <div>{user.name}</div>
        <label>Email</label>
        <div>{user.email}</div>
        <Link href={"/logout"}>
          <button
            passHref={"/logout"}
            className="button"
            style={{ background: "red" }}
          >
            Logout
          </button>
        </Link>
      </form>
    </div>
  ) : isLoggedIn === null ? (
    <div>Verifying Credentials...</div>
  ) : isLoggedIn === false ? (
    <div>Unauthorized Page. Will Redirect in 3 seconds</div>
  ) : (
    <div>Unexpected Error</div>
  );
};
