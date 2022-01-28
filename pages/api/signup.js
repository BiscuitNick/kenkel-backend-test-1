import { connectToDatabase } from "../../util/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { insertUser, findUserByEmail } from "../../lib/user";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { body } = req;
  const { db } = await connectToDatabase();

  const cookie = await req.session.user;

  if (cookie) {
    res.status(200).json({
      message:
        "You are already signed in. Logout first to create a new account",
      user: req.session.user,
      isLoggedIn: true,
    });
  }

  var { name, email, password } = body;

  if (!name || !email || !password) {
    res.status(400).json({
      message: "Missing name email or password",
      user: null,
      isLoggedIn: false,
    });
  }

  var user = await findUserByEmail(db, email);

  if (!user) {
    try {
      user = await insertUser(db, { name, email, password });

      req.session.user = user;
      await req.session.save();

      res.status(201).json({
        message: "Successfully Created New Account",
        user: req.session.user,
        isLoggedIn: true,
      });
    } catch (e) {
      console.log("insertUser Error", e.message);
      res
        .status(500)
        .json({ message: e.message, user: null, isLoggedIn: false });
    }
  } else {
    res.status(500).json({
      message: "Email is already registered",
      user: null,
      isLoggedIn: false,
    });
  }
}, sessionOptions);
