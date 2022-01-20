import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs/dist/bcrypt";

import { connectToDatabase } from "../../util/mongodb";

async function findUserByEmailandPassword(db, { email, password }) {
  const user = await db.collection("accounts").findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined };
  }
  return null;
}

export default async function handler(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();
  var { email, password } = body;
  email = normalizeEmail(email);

  var user = await findUserByEmailandPassword(db, { email, password });

  console.log("user", user);

  if (!user) {
    res
      .status(401)
      .json({ message: "Invalid Email or Password", user, email, password });
  } else {
    res.status(200).json({ message: "Successfully LogedIn", user });
  }

  //   const user = req.db.collection("users").insertOne({ name, email, password });
}
