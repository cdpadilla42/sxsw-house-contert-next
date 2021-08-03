import React, { useState } from 'react';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import styled from 'styled-components';
import { endpoint } from '../config';
import Map from '../components/Map';
import DetailDisplay from '../components/DetailDisplay';
import FiltersMenu from './Filters/FiltersMenu';
import { queryObjToString } from '../util/functions';

const Container = ({ neighborhoods }) => {
  const [filters, setFilters] = useState({});
  const [input, setInput] = useState('');
  const [skip, setSkip] = useState(0);
  const LIMIT = 10;
  const page = skip / LIMIT + 1;

  const pagination = { limit: LIMIT, skip };

  const getRestaurants = async ({ queryKey }) => {
    const [_, query] = queryKey;
    const blob = await fetch(
      `${endpoint}/restaurants${queryObjToString(query)}`
    );
    const data = await blob.json();
    return data;
  };

  const handlePageChange = (newPage) => {
    if (newPage === 0) return;
    if ((newPage - 1) * LIMIT >= data?.totalCount) return;

    setSkip((newPage - 1) * LIMIT);
  };

  const { data } = useQuery(
    ['restaurants', { ...filters, ...pagination }],
    getRestaurants,
    { keepPreviousData: true }
  );

  const maxPage = data?.totalCount ? Math.ceil(data.totalCount / LIMIT) : 1;

  const handleClick = (e) => {
    setFilters({ ...filters, borough: input });
  };

  const handleFilterChange = (
    e,
    changedFilterObj = { filterField: undefined, value: undefined }
  ) => {
    let filterField;
    let value;
    if (e) {
      filterField = e.currentTarget.dataset.filter;
      value = e.currentTarget.value;
    } else if (changedFilterObj) {
      filterField = changedFilterObj.filterField;
      value = changedFilterObj.value;
    }
    const newState = { ...filters };
    newState[filterField] = value;
    setFilters(newState);
    handlePageChange(1);
  };

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };
  return (
    <StyledContainer>
      <Map data={data} neighborhoods={neighborhoods} />
      <div className="right-side-bar">
        <FiltersMenu filters={filters} onFilterChange={handleFilterChange} />
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={handleClick}>Get Brooklyn Restaurants</button>
        <DetailDisplay
          data={data}
          handlePageChange={handlePageChange}
          page={page}
          maxPage={maxPage}
        />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  max-height: 65vh;
  max-width: 1052px;
  margin: 0 auto;

  .right-side-bar {
    width: 215px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  }
`;

export default Container;
