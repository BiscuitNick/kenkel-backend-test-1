import { Layout } from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div style={{ display: "grid", gridGap: 10 }}>
        <h1>Simple Authentication App</h1>
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
