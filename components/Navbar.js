import Link from "next/link";
import { useUser } from "../lib/useUser";

export const Navbar = () => {
  const { user } = useUser();

  const routes = !user
    ? [
        { href: "/", label: "Home" },
        { href: "/login", label: "Login" },
        { href: "/signup", label: "SignUp" },
        { href: "/readme", label: "Documentation" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/readme", label: "Documentation" },
        { href: "/logout", label: "Logout" },
      ];

  const navitems = routes.map((r) => (
    <Link href={r.href}>
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
