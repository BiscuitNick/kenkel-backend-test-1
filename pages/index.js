import { Layout } from "../components/Layout";
import { NavList } from "../components/Navbar";
export default function Home() {
  return (
    <Layout>
      <div
        className="box"
        style={{
          display: "grid",
          gridGap: 10,
        }}
      >
        <h1>Authentication App</h1>
        <div style={{ display: "grid" }}>
          <h3>Page Routes</h3>
          <NavList routesKey={"allRoutes"} />
        </div>
        <div style={{ display: "grid" }}>
          <h3>API Routes</h3>
          <NavList routesKey={"apiRoutes"} />
        </div>
      </div>
    </Layout>
  );
}
