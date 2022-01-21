import { Navbar } from "./Navbar";

export const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar />
      {props.children}
    </div>
  );
};
