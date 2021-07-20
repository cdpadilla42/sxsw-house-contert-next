import React from 'react';
import { PropTypes } from 'prop-types';
import Pagination from './Pagination';

const DetailDisplay = ({ data, handlePageChange, page, maxPage }) => {
  console.log(data);

  return (
    <>
      <div className="detail-display">
        <Pagination
          page={1}
          maxPage={maxPage}
          handlePageChange={handlePageChange}
          page={page}
          maxPage={maxPage}
        />
        {data.data?.map((restaurant) => (
          <DetailCards restaurant={restaurant} key={restaurant._id} />
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

DetailDisplay.propTypes = {
  data: PropTypes.object,
  handlePageChange: PropTypes.func,
  page: PropTypes.number,
};

DetailDisplay.defaultProps = {
  data: {},
  handlePageChange: () => {},
  page: 1,
};

export default DetailDisplay;
