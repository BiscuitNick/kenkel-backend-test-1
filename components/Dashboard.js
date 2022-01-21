import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/useUser";

import Link from "next/link";

export const Dashboard = () => {
  const router = useRouter();
  const { user, logout } = useUser(); //[user, setUser] = useUser();
  const [redirect, setRedirect] = useState("/login");

  useEffect(() => {
    if (!user) {
      console.log("You must login to continue");
      router.push(redirect);
    }
    console.log("14", user);
  }, [user, redirect, router]);

  return user ? (
    <div className="box">
      <h1>{user.name + `&apos;s Dashboard`} </h1>
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
  ) : (
    <div>
      Restricted Page. Must be logged in to access this page. Redirecting...
    </div>
  );
};
