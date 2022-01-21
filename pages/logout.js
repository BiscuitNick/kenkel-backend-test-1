import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useUser } from "../lib/useUser";
import Link from "next/link";

export default function LogoutPage() {
  const { user, logout } = useUser();

  useEffect(() => {
    if (user) {
      logout();
    }
  }, [user, logout]);

  return (
    <Layout>
      <div style={{ display: "grid", gridGap: 10 }}>
        <h2>{user ? "Logging Out..." : "You are logged Out"}</h2>
        <Link href="/signup">
          <a>SignUp</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        <Link href="/readme">
          <a>Readme</a>
        </Link>
      </div>
    </Layout>
  );
}
