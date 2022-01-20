import { MongoClient } from "mongodb";

//Path (including credentials) to Mongoose Database
let uri = process.env.MONGODB_URI;

//Database name. Defaults to "test" if .env variable not set.
let dbName = process.env.MONGODB_DB || "test";

let indexCreated = false;
let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function createIndex(db) {
  //Using Email as primary key for collection.
  //This will prevent multiple entries with the same email.
  await db.collection("accounts").createIndex({ email: 1 }, { unique: true });

  //Toggle flag to true after index creation.
  indexCreated = true;
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    //Return cachedClient and db is already active
    return { client: cachedClient, db: cachedDb };
  }

  //Initialize client and db
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  if (!indexCreated) {
    //CreateIndex if not already created
    await createIndex(db);
  }

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
