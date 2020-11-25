import { connectToDatabase } from "../../util/mongoDB";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const monsters = await db
    .collection("monsters")
    .find({})
    .sort({ name: 1 })
    .toArray();

  res.json(monsters);
};