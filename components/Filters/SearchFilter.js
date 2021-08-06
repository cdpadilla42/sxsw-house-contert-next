import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { endpoint } from '../../config';
import { resetIdCounter, useCombobox } from 'downshift';
import { useQuery } from 'react-query';
import { queryObjToString } from '../../util/functions';
import { useDebounce } from '../../util/useDebounce';
import { DropDown, SearchStyles, DropDownItem } from '../../styles/DropDown';

const SearchFilter = ({ onFilterChange }) => {
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

  const { data, isLoading } = useQuery(
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
    onInputValueChange: (newInput) => {
      console.log('Input Changed');
      console.log(newInput.inputValue);
      handleSearchClear(newInput.inputValue);
      setQuery(inputValue);
    },
    itemToString: (item) => item?.name || '',
    onSelectedItemChange({ selectedItem }) {
      onFilterChange(null, {
        filterField: 'neighborhoodID',
        value: selectedItem._id,
      });
    },
    stateReducer,
  });

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;
    // this prevents the menu from being closed when the user selects an item with 'Enter' or mouse
    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.ItemClick:
        return {
          ...changes, // default Downshift new state changes on item selection.
        };
      default:
        return changes; // otherwise business as usual.
    }
  }

  const handleSearchClear = (value) => {
    if (value === '') {
      onFilterChange(null, {
        filterField: 'neighborhoodID',
        value: '',
      });
    }
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
              {...getItemProps({ item, index })}
              key={item._id}
              highlighted={index === highlightedIndex}
              onMouseEnter={(e) => console.log(index)}
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

SearchFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

SearchFilter.defaultProps = {
  onFilterChange: () => {},
};

export default SearchFilter;
