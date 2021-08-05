import dbConnect from '../../util/dbConnect';
import Restaurants from '../../models/Restaurants';
import Neighborhoods from '../../models/Neighborhoods';
import { calculateMapBounds } from '../../util/functions';

export default async function handler(req, res) {
  const { method, query } = req;
  let limit,
    skip = 0;
  let coordinates;

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

  if (query.neighborhoodID) {
    const neighborhood = await Neighborhoods.findById(query.neighborhoodID);
    if (neighborhood) {
      // Grab coordinates to send to client
      coordinates = neighborhood.geometry.coordinates[0];
      // filter restaurant results
      query['address.coord'] = {
        $geoWithin: {
          $geometry: neighborhood.geometry,
        },
      };
    }
    delete query.neighborhoodID;
  }

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

      const resultObject = { success: true, data, totalCount: count };

      if (coordinates) {
        // Check if this neighborhood has an extra array nested. If so, go one level deeper
        if (coordinates[0] && coordinates[0][0] && coordinates[0][0][0]) {
          coordinates = coordinates[0];
        }
        const bounds = calculateMapBounds(coordinates);
        resultObject.bounds = bounds;
      }

      res.status(200).json(resultObject);
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
