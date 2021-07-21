import React from 'react';
import PropTypes from 'prop-types';
import GradeFilter from './GradeFilter';

const FiltersMenu = ({ filters, onFilterChange }) => {
  const { borough, grade } = filters;
  return (
    <div>
      <GradeFilter grade={grade} onFilterChange={onFilterChange} />
    </div>
  );
};

FiltersMenu.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
};

FiltersMenu.defaultProps = {
  filters: {},
  onFilterChange: () => {},
};

export default FiltersMenu;
