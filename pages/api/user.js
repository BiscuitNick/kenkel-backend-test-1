import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function userRoute(req, res) {
  const cookie = await req.session.user;

  console.log("api/user", cookie);

  res.status(200).json({
    user: cookie ? cookie : null,
    isLoggedIn: cookie ? true : false,
  });
}, sessionOptions);
