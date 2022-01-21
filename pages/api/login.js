import { connectToDatabase } from "../../util/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { findUserByEmailandPassword } from "../../lib/user";


export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();
  var { email, password } = body;

  var user = await findUserByEmailandPassword(db, { email, password });

  if (!user) {
    req.session.user = null;
    await req.session.save();

    res
      .status(401)
      .json({ message: "Invalid Email or Password", user: req.session.user });
  } else {
    req.session.user = user;
    await req.session.save();

    res
      .status(200)
      .json({ message: "Successfully LogedIn", user: req.session.user });
  }
}, sessionOptions);
// }
