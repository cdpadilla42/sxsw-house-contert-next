import React, { useState } from 'react';
import { endpoint } from '../../config';
import debounce from 'lodash.debounce';
import { resetIdCounter, useCombobox } from 'downshift';
import { useQuery } from 'react-query';
import { queryObjToString } from '../../util/functions';
import { useDebounce } from '../../util/useDebounce';
import { DropDown, SearchStyles, DropDownItem } from '../../styles/DropDown';

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

  const { data, isLoading, error } = useQuery(
    ['neighborhoods-suggestions-search', debouncedQuery],
    getNeighborhoodsMethod
  );

  const neighborhoods = data?.success ? data.neighborhoods : [];

  resetIdCounter();
  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items: neighborhoods || [],
    onInputValueChange() {
      console.log('Input Changed');
      setQuery(inputValue);
    },
    itemToString: (item) => item?.name || '',
    onSelectedItemChange({ selectedItem }) {
      console.log('Selected!', selectedItem);
    },
  });

  console.log(neighborhoods);
  console.log(error);

  const findNeighborhoodsButChill = debounce(getNeighborhoodsMethod, 350);

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    findNeighborhoodsButChill();
  };

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search Neighborhoods',
            id: 'search',
            className: isLoading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          neighborhoods.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              {item.name}
            </DropDownItem>
          ))}
        {/* {isOpen && !items && !items.length && !isLoading && ( */}
        {isOpen && !neighborhoods && !isLoading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default SearchFilter;
