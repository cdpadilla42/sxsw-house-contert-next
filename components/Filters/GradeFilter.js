import React from 'react';
import PropTypes from 'prop-types';

const GradeFilter = ({ grade, onFilterChange }) => {
  return (
    <select value={grade} data-filter="grade" onChange={onFilterChange}>
      <option value="" disabled hidden>
        Grade
      </option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="Z">Z</option>
    </select>
  );
};

GradeFilter.propTypes = {
  grade: PropTypes.string,
  onFilterChange: PropTypes.func,
};

GradeFilter.defaultProps = {
  grade: '',
  onFilterChange: () => {},
};

export default GradeFilter;
