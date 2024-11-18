import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin-1:admin@felistream.l1vgf.mongodb.net/?retryWrites=true&w=majority&appName=FeliStream";

let db;

const connectDB = async () => {
  if (db) return db;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado a MongoDB");
  db = client.db("<nombre_base_datos>");
  return db;
};

export default connectDB;
