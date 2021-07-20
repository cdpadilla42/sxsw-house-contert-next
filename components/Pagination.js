import React from 'react';
import { PropTypes } from 'prop-types';

const Pagination = ({ page, maxPage, handlePageChange }) => {
  const atFirstPage = page === 1;
  const atLastPage = page === maxPage;

  const handleBackClick = () => {
    if (atFirstPage) return;
    handlePageChange(page - 1);
  };

  const handlePageForwardClick = () => {
    if (atLastPage) return;
    handlePageChange(page + 1);
  };

  return (
    <div>
      <button onClick={handleBackClick} disabled={atFirstPage}>
        👈
      </button>
      <span>
        Page {page} of {maxPage}
      </span>
      <button onClick={handlePageForwardClick} disabled={atLastPage}>
        👉
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  maxPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};

Pagination.defaultProps = {
  page: 1,
  maxPage: 1,
  handlePageChange: () => {},
};

export default Pagination;
