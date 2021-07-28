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
      ];

      const results = await Restaurants.aggregate(pipeline);
      console.log('results', results);

      const cuisines = results.map((cuisine) => cuisine._id);

      console.log(cuisines);

      res.status(200).json({ success: true, cuisines });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
