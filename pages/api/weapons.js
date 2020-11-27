import { connectToDatabase } from "../../util/mongoDB";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const weapons = await db
    .collection("weapons")
    .find({})
    .sort({ name: 1 })
    .toArray();

  res.json(weapons);
};