import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  req.session.user = null;
  req.session.destroy();
  // await req.session.save();

  res
    .status(200)
    .json({ user: req.session.user, message: "successfully logged out" });
}, sessionOptions);
