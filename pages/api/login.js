import { connectToDatabase } from "../../util/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { findUserByEmailandPassword } from "../../lib/user";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();
  const cookie = await req.session.user;
  var { email, password } = body;

  console.log("api/login", cookie, body);

  if (cookie) {
    await req.session.save();
    res.status(200).json({
      user: cookie,
      isLoggedIn: true,
    });
  } else if (!email || !password) {
    await req.session.save();
    res.status(200).json({
      message: "Missing email or password",
      user: null,
      isLoggedIn: false,
      body,
    });
  } else {
    var user = await findUserByEmailandPassword(db, { email, password });
    if (!user) {
      req.session.user = null;
      await req.session.save();
      res.status(200).json({
        message: "Invalid Email or Password",
        user: null,
        isLoggedIn: false,
      });
    } else {
      req.session.user = user;
      await req.session.save();
      res.status(200).json({
        message: "Successfully LogedIn",
        user: req.session.user,
        isLoggedIn: true,
      });
    }
  }
}, sessionOptions);
