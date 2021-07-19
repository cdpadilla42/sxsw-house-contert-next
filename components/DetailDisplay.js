import React from 'react';
import Pagination from './Pagination';

const DetailDisplay = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="detail-display">
        <Pagination page={1} total={100} />
        {data?.data.map((restaurant) => (
          <DetailCards restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

const DetailCards = ({ restaurant }) => {
  return (
    <div className="detail-card">
      <h3>{restaurant.name}</h3>
      <h4>{restaurant.cuisine}</h4>
      <p>{restaurant.address?.street}</p>
      <hr />
    </div>
  );
};

export default DetailDisplay;
