import dbConnect from '../../util/dbConnect';
import Restaurants from '../../models/Restaurants';

export default async function handler(req, res) {
  const { method, query } = req;
  console.log(query);
  let limit,
    skip = 0;
  if (query.limit) {
    limit = parseInt(query.limit);
    delete query.limit;
  }
  if (query.skip) {
    skip = parseInt(query.skip);
    delete query.skip;
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      const restaurants = await Restaurants.find(query, null, { limit, skip });
      res
        .status(200)
        .json({ success: true, data: restaurants, totalCount: 33 });
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
