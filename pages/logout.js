import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useUser } from "../lib/useUser";
import { NavList } from "../components/Navbar";

export default function LogoutPage() {
  const { user, logout } = useUser();

  useEffect(() => {
    if (user) {
      logout();
    }
  }, [user, logout]);

  return (
    <Layout>
      <div className="box">
        <h2>{user ? "Logging Out..." : "You are logged Out"}</h2>
        <NavList routesKey={"notAuthedRoutes"} />
      </div>
    </Layout>
  );
}
