import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs"; 

export async function findUserByEmailandPassword(db, { email, password }) {
  email = normalizeEmail(email);
  const user = await db.collection("accounts").findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined };
  }
  return null;
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);

  const user = await db.collection("accounts").findOne({ email });
  return user || null;
}

export async function insertUser(db, { name, email, password: unhashedPW }) {
  email = normalizeEmail(email);
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
