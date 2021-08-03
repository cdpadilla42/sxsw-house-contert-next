import React from 'react';
import PropTypes from 'prop-types';
import GradeFilter from './GradeFilter';
import CuisineFilter from './CuisineFilter';
import SearchFilter from './SearchFilter';

const FiltersMenu = ({ filters, onFilterChange }) => {
  const { borough, grade, cuisine } = filters;
  return (
    <div>
      <GradeFilter grade={grade} onFilterChange={onFilterChange} />
      <CuisineFilter cuisine={cuisine} onFilterChange={onFilterChange} />
      <SearchFilter />
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
