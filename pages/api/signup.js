import { connectToDatabase } from "../../util/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { insertUser, findUserByEmail } from "../../lib/user";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();
  var { name, email, password } = body;

  var user = await findUserByEmail(db, email);

  if (!user) {
    try {
      user = await insertUser(db, { name, email, password });

      req.session.user = user;
      await req.session.save();

      res.status(201).json({
        message: "Successfully Created New Account",
        user: req.session.user,
      });
    } catch (e) {
      console.log("insertUser Error", e.message);
      res.status(500).json({ message: e.message, user: null });
    }
  } else {
    res
      .status(500)
      .json({ message: "Email is already registered", user: null });
  }

  //   const user = req.db.collection("users").insertOne({ name, email, password });
}, sessionOptions);