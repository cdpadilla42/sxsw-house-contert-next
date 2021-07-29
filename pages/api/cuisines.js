import dbConnect from '../../util/dbConnect';
import Restaurants from '../../models/Restaurants';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const pipeline = [
        {
          $group: {
            _id: '$cuisine',
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];

      const results = await Restaurants.aggregate(pipeline);

      const cuisines = results.map((cuisine) => cuisine._id);

      res.status(200).json({ success: true, cuisines });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
