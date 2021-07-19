import React from 'react';

const Pagination = ({ page, total }) => {
  return (
    <div>
      <button>👈</button>
      <span>
        Page {page} of {total}
      </span>
      <button>👉</button>
    </div>
  );
};

export default Pagination;
