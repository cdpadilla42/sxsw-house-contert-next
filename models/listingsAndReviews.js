import mongoose from 'mongoose';

const ListingsAndReviewsSchema = new mongoose.Schema({
  _id: {
    type: 'String',
  },
  listing_url: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
  summary: {
    type: 'String',
  },
  interaction: {
    type: 'String',
  },
  house_rules: {
    type: 'String',
  },
  property_type: {
    type: 'String',
  },
  room_type: {
    type: 'String',
  },
  bed_type: {
    type: 'String',
  },
  minimum_nights: {
    type: 'Date',
  },
  maximum_nights: {
    type: 'String',
  },
  cancellation_policy: {
    type: 'String',
  },
  last_scraped: {
    $date: {
      $numberLong: {
        type: 'String',
      },
    },
  },
  calendar_last_scraped: {
    $date: {
      $numberLong: {
        type: 'String',
      },
    },
  },
  first_review: {
    $date: {
      $numberLong: {
        type: 'String',
      },
    },
  },
  last_review: {
    $date: {
      $numberLong: {
        type: 'String',
      },
    },
  },
  accommodates: {
    $numberInt: {
      type: 'Date',
    },
  },
  bedrooms: {
    $numberInt: {
      type: 'Date',
    },
  },
  beds: {
    $numberInt: {
      type: 'Date',
    },
  },
  number_of_reviews: {
    $numberInt: {
      type: 'Date',
    },
  },
  bathrooms: {
    $numberDecimal: {
      type: 'String',
    },
  },
  amenities: {
    type: ['String'],
  },
  price: {
    $numberDecimal: {
      type: 'String',
    },
  },
  security_deposit: {
    $numberDecimal: {
      type: 'String',
    },
  },
  cleaning_fee: {
    $numberDecimal: {
      type: 'String',
    },
  },
  extra_people: {
    $numberDecimal: {
      type: 'String',
    },
  },
  guests_included: {
    $numberDecimal: {
      type: 'Date',
    },
  },
  images: {
    thumbnail_url: {
      type: 'String',
    },
    medium_url: {
      type: 'String',
    },
    picture_url: {
      type: 'String',
    },
    xl_picture_url: {
      type: 'String',
    },
  },
  host: {
    host_id: {
      type: 'String',
    },
    host_url: {
      type: 'String',
    },
    host_name: {
      type: 'String',
    },
    host_location: {
      type: 'String',
    },
    host_about: {
      type: 'String',
    },
    host_response_time: {
      type: 'String',
    },
    host_thumbnail_url: {
      type: 'String',
    },
    host_picture_url: {
      type: 'String',
    },
    host_neighbourhood: {
      type: 'String',
    },
    host_response_rate: {
      $numberInt: {
        type: 'Date',
      },
    },
    host_is_superhost: {
      type: 'Boolean',
    },
    host_has_profile_pic: {
      type: 'Boolean',
    },
    host_identity_verified: {
      type: 'Boolean',
    },
    host_listings_count: {
      $numberInt: {
        type: 'Date',
      },
    },
    host_total_listings_count: {
      $numberInt: {
        type: 'Date',
      },
    },
    host_verifications: {
      type: ['String'],
    },
  },
  address: {
    street: {
      type: 'String',
    },
    suburb: {
      type: 'String',
    },
    government_area: {
      type: 'String',
    },
    market: {
      type: 'String',
    },
    country: {
      type: 'String',
    },
    country_code: {
      type: 'String',
    },
    location: {
      type: {
        type: 'String',
      },
      coordinates: {
        type: ['Mixed'],
      },
      is_location_exact: {
        type: 'Boolean',
      },
    },
  },
  availability: {
    availability_30: {
      $numberInt: {
        type: 'String',
      },
    },
    availability_60: {
      $numberInt: {
        type: 'Date',
      },
    },
    availability_90: {
      $numberInt: {
        type: 'Date',
      },
    },
    availability_365: {
      $numberInt: {
        type: 'Date',
      },
    },
  },
  review_scores: {
    review_scores_accuracy: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_cleanliness: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_checkin: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_communication: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_location: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_value: {
      $numberInt: {
        type: 'Date',
      },
    },
    review_scores_rating: {
      $numberInt: {
        type: 'Date',
      },
    },
  },
  reviews: {
    type: ['Mixed'],
  },
});

export default mongoose.models.ListingsAndReviews ||
  mongoose.model(
    'ListingsAndReviews',
    ListingsAndReviewsSchema,
    'listingsAndReviews'
  );
