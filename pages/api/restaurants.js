import dbConnect from '../../util/dbConnect';
import Restaurants from '../../models/Restaurants';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log(query);

  await dbConnect();

  switch (method) {
    case 'GET':
      query.limit = 100;
      const restaurants = await Restaurants.find({}, null, query);
      res.status(200).json({ success: true, data: restaurants });
      break;
    case 'POST':
      const newRestaurant = await Restaurants.create({
        ...req.body,
      });
      res.status(201).json({ success: true, data: newRestaurant });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
