import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterItem from "./FilterItem";
import { getNestedFilterOptions } from "../helpers";
import { filterOptions } from "../constants";
import { CatalogItem, Filter } from "../types";

interface FilterBarProps {
  catalogData: CatalogItem[];
  activeFilters: { key: string; value: string[] }[];
  setActiveFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  catalogData,
  activeFilters,
  setActiveFilters,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleAddFilter = (newFilter: Filter) => {
    setActiveFilters([...activeFilters, newFilter]);
    setDropdownVisible(false);
    setSelectedFilter(null);
  };

  const handleFilterClick = (filterKey: string) => {
    setSelectedFilter(filterKey);
    setDropdownVisible(true);
  };

  const filterOptionsByKey = filterOptions.reduce(
    (acc, option) => {
      acc[option.key] = getNestedFilterOptions(catalogData, option.key);
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  return (
    <div className="relative flex flex-col p-4 bg-white rounded-lg space-y-2">
      <div className="flex items-center space-x-2">
        {activeFilters.length > 0 && (
          <div className="flex space-x-2">
            {activeFilters.map((filter, index) => (
              <FilterItem
                key={index}
                filter={`${filter.key}: ${filter.value}`}
                onClick={() => handleFilterClick(filter.key)}
              />
            ))}
          </div>
        )}
        <button
          className="px-4 py-2 border border-gray-300 rounded-full hover:border-gray-500 hover:shadow-md"
          onClick={() => setDropdownVisible(true)}
        >
          + Add Filter
        </button>
      </div>
      {isDropdownVisible && (
        <FilterDropdown
          onSave={handleAddFilter}
          optionsByKey={filterOptionsByKey}
          selectedFilter={selectedFilter}
        />
      )}
    </div>
  );
};

export default FilterBar;
