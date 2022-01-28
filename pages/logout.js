import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useUser } from "../lib/useUser";
import { NavList } from "../components/Navbar";

export default function LogoutPage() {
  const { user, isLoggedIn, logout } = useUser();

  useEffect(() => {
    if (user || isLoggedIn) {
      logout();
    }
  }, [user, isLoggedIn, logout]);

  return (
    <Layout>
      <div className="box">
        <h2>{isLoggedIn ? "Logging Out..." : "You are logged Out"}</h2>
        <NavList routesKey={"notAuthedRoutes"} />
      </div>
    </Layout>
  );
}
