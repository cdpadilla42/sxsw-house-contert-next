import dbConnect from '../../util/dbConnect';
import Neighborhoods from '../../models/Neighborhoods';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      console.log(query);
      const neighborhoods = await Neighborhoods.find(
        {
          name: { $regex: 'East' },
        },
        { name: 1 }
      );

      res.status(200).json({ success: true, neighborhoods });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
