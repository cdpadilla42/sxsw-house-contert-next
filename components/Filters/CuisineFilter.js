import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { endpoint } from '../../config';

const GradeFilter = ({ cuisine, onFilterChange }) => {
  const getCuisines = async () => {
    const blob = await fetch(`${endpoint}/cuisines`);
    const data = await blob.json();

    return data;
  };

  const { data } = useQuery('cuisines-query', getCuisines, {
    keepPreviousData: true,
  });

  const renderOptions = () => {
    if (!data || !data.cuisines || data.cuisines.length === 0) return '';
    // TODO Filter out the nullish cuisines
    const filteredCuisines = data.cuisines.filter();
    return data.cuisines.map((cuisine) => (
      <option value={cuisine} key={cuisine}>
        {cuisine}
      </option>
    ));
  };
  return (
    <select value={cuisine} data-filter="cuisine" onChange={onFilterChange}>
      <option value="" disabled hidden>
        Cuisine
      </option>
      {renderOptions()}
    </select>
  );
};

GradeFilter.propTypes = {
  cuisine: PropTypes.string,
  onFilterChange: PropTypes.func,
};

GradeFilter.defaultProps = {
  cuisine: '',
  onFilterChange: () => {},
};

export default GradeFilter;
