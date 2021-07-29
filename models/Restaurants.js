import mongoose from 'mongoose';

const RestaurantsSchema = new mongoose.Schema({
  address: {
    building: {
      type: Date,
    },
    coord: {
      type: [Number],
    },
    street: {
      type: String,
    },
    zipcode: {
      type: Date,
    },
  },
  borough: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  grades: {
    type: ['Mixed'],
  },
  name: {
    type: String,
  },
  restaurant_id: {
    type: String,
  },
});

export default mongoose.models?.Restaurants ||
  mongoose.model('Restaurants', RestaurantsSchema, 'restaurants');
