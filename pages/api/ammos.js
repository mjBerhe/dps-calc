import { connectToDatabase } from '../../util/mongoDB';

export default async (req, res) => {
   const { db } = await connectToDatabase();

   const ammos = await db
      .collection('ammos')
      .find()
      .sort({ name: 1 })
      .toArray();

   res.json(ammos);

};