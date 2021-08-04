import dbConnect from '../../util/dbConnect';
import Restaurants from '../../models/Restaurants';
import Neighborhoods from '../../models/Neighborhoods';

export default async function handler(req, res) {
  const { method, query } = req;
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
  if (query.grade) {
    const { grade } = query;
    delete query.grade;
    if (typeof query.grade === 'object') {
      query.grades.$elemMatch = { grade };
    } else {
      query.grades = { $elemMatch: { grade } };
    }
  }

  if (!!query.neighborhoodID) {
    const neighborhood = await Neighborhoods.findById(query.neighborhoodID);
    if (neighborhood) {
      console.log(neighborhood);
      query['address.coord'] = {
        $geoWithin: {
          $geometry: neighborhood.geometry,
        },
      };
    }
    delete query.neighborhoodID;
  }

  console.log(query);

  await dbConnect();

  switch (method) {
    case 'GET':
      const pipeline = [
        {
          $match: query,
        },
        {
          $facet: {
            data: [
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
            totalCount: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ];

      const results = await Restaurants.aggregate(pipeline);

      const { data, totalCount } = results[0];

      const count = totalCount[0]?.count || 0;

      res.status(200).json({ success: true, data, totalCount: count });
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
