import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Pagination from './Pagination';

const DetailDisplay = ({ data, handlePageChange, page, maxPage }) => {
  console.log(data);

  const renderDetailCards = () => {
    console.log(data.data);
    if (!data?.data?.length) {
      return <p>Sorry, there's no food with those filter!</p>;
    }
    return data.data.map((restaurant) => (
      <DetailCards restaurant={restaurant} key={restaurant._id} />
    ));
  };

  return (
    <StyledDetailDisplay className="detail-display">
      <Pagination
        page={1}
        maxPage={maxPage}
        handlePageChange={handlePageChange}
        page={page}
        maxPage={maxPage}
      />
      <div className="cards">{renderDetailCards()}</div>
    </StyledDetailDisplay>
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

const StyledDetailDisplay = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  .cards {
    overflow-y: scroll;
    border: 1px solid grey;
    border-radius: 15px;
  }
`;

export default DetailDisplay;
