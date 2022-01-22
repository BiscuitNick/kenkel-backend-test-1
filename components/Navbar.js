import Link from "next/link";
import { useUser } from "../lib/useUser";

const authRoutes = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/logout", label: "Logout" },
  {
    href: "https://github.com/BiscuitNick/kenkel-backend-test-1",
    label: "Source",
  },
];
const notAuthedRoutes = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "SignUp" },
  {
    href: "https://github.com/BiscuitNick/kenkel-backend-test-1",
    label: "Source",
  },
];
const allRoutes = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "SignUp" },
  { href: "/logout", label: "Logout" },
  {
    href: "https://github.com/BiscuitNick/kenkel-backend-test-1",
    label: "Source",
  },
];
const apiRoutes = [
  { href: "/api/login", label: "Login" },
  { href: "/api/logout", label: "Logout" },
  { href: "/api/signup", label: "Signup" },
  { href: "/api/user", label: "User" },
];

const routes = {
  allRoutes,
  authRoutes,
  notAuthedRoutes,
  apiRoutes,
};

export const Navbar = () => {
  const { user } = useUser();

  const navroutes = !user ? notAuthedRoutes : authRoutes;

  const navitems = navroutes.map((r, i) => (
    <Link href={r.href} key={i}>
      <a href={r.href}>{r.label}</a>
    </Link>
  ));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,

        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "space-around",
        width: "100vw",
        background: "black",
        color: "white",

        padding: 10,
      }}
    >
      {navitems}
    </div>
  );
};

export const NavList = ({ routesKey = "allRoutes" }) => {
  const navitems = routes[routesKey].map((r, i) => (
    <Link href={r.href} key={i}>
      <a href={r.href}>{r.label}</a>
    </Link>
  ));

  return navitems;
};
