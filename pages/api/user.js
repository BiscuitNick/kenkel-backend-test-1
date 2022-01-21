import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function userRoute(req, res) {
  const cookie = await req.session.user;

  console.log(req.session.user);
  console.log(cookie);

  if (!cookie) {
    req.session.user = null;
    await req.session.save();
  }

  res.status(200).json({
    user: req.session.user,
  });
}, sessionOptions);
