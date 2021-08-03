import dbConnect from '../../util/dbConnect';
import Neighborhoods from '../../models/Neighborhoods';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const neighborhood = await Neighborhoods.findOne({
        _id: query.id,
      });

      res.status(200).json({ success: true, neighborhood });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
