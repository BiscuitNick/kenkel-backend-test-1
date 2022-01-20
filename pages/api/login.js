import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs/dist/bcrypt";
import { connectToDatabase } from "../../util/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironOptions";

async function findUserByEmailandPassword(db, { email, password }) {
  const user = await db.collection("accounts").findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined };
  }
  return null;
}

// export default withIronSessionApiRoute(loginRoute, ironOptions);

export default async function loginRoute(req, res) {
  // if (req.session.user) {
  //   console.log("session saved");
  //   res.json({
  //     ...req.session.user,
  //     isLoggedIn: true,
  //   });
  // } else {
  const { body } = req;
  const { db } = await connectToDatabase();
  var { email, password } = body;
  email = normalizeEmail(email);

  var user = await findUserByEmailandPassword(db, { email, password });

  if (!user) {
    res
      .status(401)
      .json({ message: "Invalid Email or Password", user, email, password });
  } else {
    res.status(200).json({ message: "Successfully LogedIn", user });
  }
}
// }
