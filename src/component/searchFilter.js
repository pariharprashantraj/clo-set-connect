import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { setSearchText, toggleFilterOption } from "../store/filterSlice";
import {
  SearchContainer,
  Input,
  FilterOptionsContainer,
  FilterLabel,
  FilterCheckbox,
  PricingOptions,
  InputWrapper,
  SearchIcon,
} from "./styles/searchFilter.styles.js";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { searchText, filterOptions } = useSelector((state) => state.filter);
  const [inputValue, setInputValue] = useState(searchText);
  const debouncedUpdate = useRef(
    debounce((value) => {
      dispatch(setSearchText(value));
    }, 500)
  ).current;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedUpdate(value);
  };

  const handleCheckboxChange = (option) => {
    dispatch(toggleFilterOption(option));
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return (
    <SearchContainer>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Find the items you're looking for"
          value={inputValue}
          onChange={handleInputChange}
        />
        <SearchIcon />
      </InputWrapper>

      <PricingOptions>
        Pricing Options
        <FilterOptionsContainer>
          {["paid", "free", "viewOnly"].map((option) => (
            <FilterLabel key={option}>
              <FilterCheckbox
                type="checkbox"
                checked={filterOptions[option]}
                onChange={() => handleCheckboxChange(option)}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </FilterLabel>
          ))}
        </FilterOptionsContainer>
      </PricingOptions>
    </SearchContainer>
  );
};

export default SearchFilter;
