import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs/dist/bcrypt";
import { connectToDatabase } from "../../util/mongodb";

async function insertUser(db, { name, email, password: unhashedPW }) {
  const user = {
    name,
    email,
  };
  const password = await bcrypt.hash(unhashedPW, 10);
  const { insertedId } = await db
    .collection("accounts")
    .insertOne({ ...user, password });
  user._id = insertedId;
  return user;
}

async function findUserByEmail(db, email) {
  const user = await db.collection("accounts").findOne({ email });
  return user || null;
}

export default async function handler(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();
  var { name, email, password } = body;
  email = normalizeEmail(email);

  var user = await findUserByEmail(db, email);

  if (!user) {
    try {
      user = await insertUser(db, { name, email, password });

      // req.session.user = user;
      // await req.session.save();

      // res.send({ user: req.session.user });

      res.status(201).json({
        message: "Successfully Created New Account",
        user,
      });
    } catch (e) {
      console.log("insertUser Error", e.message);
      res.status(500).json({ message: e.message, user: null });
    }
  } else {
    console.log(user);
    console.log("email is already registered");
    res
      .status(500)
      .json({ message: "Email is already registered", user: null });
  }

  //   const user = req.db.collection("users").insertOne({ name, email, password });
}
