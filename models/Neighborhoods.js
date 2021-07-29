import mongoose from 'mongoose';

const NeighborhoodsSchema = new mongoose.Schema({
  geometry: {
    coordinates: {
      type: ['Array'],
    },
    type: {
      type: 'String',
    },
  },
  name: {
    type: 'String',
  },
});

export default mongoose.models?.Neighborhoods ||
  mongoose.model('Neighborhoods', NeighborhoodsSchema, 'neighborhoods');
