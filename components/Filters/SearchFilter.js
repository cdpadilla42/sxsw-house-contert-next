import React, { useState } from 'react';
import { endpoint } from '../../config';
import debounce from 'lodash.debounce';
import { useQuery } from 'react-query';
import { queryObjToString } from '../../util/functions';
import { useDebounce } from '../../util/useDebounce';

const SearchFilter = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 1000);

  const getNeighborhoodsMethod = async (queryArgObj) => {
    if (!queryArgObj) return;
    const { queryKey } = queryArgObj;
    console.log('Getting neighborhoods', queryKey);
    const [_, query] = queryKey;
    const url = `${endpoint}/neighborhoods${queryObjToString({
      search: query,
    })}`;
    const blob = await fetch(url);
    const data = await blob.json();
    return data;
  };

  const {
    refetch: findNeighborhoods,
    data,
    isFetching,
    error,
  } = useQuery(
    ['neighborhoods-suggestions-search', debouncedQuery],
    getNeighborhoodsMethod
  );

  console.log(data);
  console.log(error);
  console.log(isFetching);

  const findNeighborhoodsButChill = debounce(getNeighborhoodsMethod, 350);

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    findNeighborhoodsButChill();
  };

  return (
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Neighborhoods"
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchFilter;
