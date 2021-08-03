import dbConnect from '../../util/dbConnect';
import Neighborhoods from '../../models/Neighborhoods';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const neighborhoods = await Neighborhoods.find(
        {
          name: { $regex: query.search },
        },
        { name: 1 },
        { limit: 6 }
      );

      res.status(200).json({ success: true, neighborhoods });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
