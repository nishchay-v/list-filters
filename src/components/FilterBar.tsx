import React, { useState, useRef } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterItem from "./FilterItem";
import { getNestedFilterOptions } from "../helpers";
import { CatalogItem, Filter } from "../types";
import { FILTER_OPTIONS } from "../constants";

interface FilterBarProps {
  catalogData: CatalogItem[];
  activeFilters: Filter[];
  setActiveFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

interface DropdownState {
  visible: boolean;
  allowBack: boolean;
  anchorRect: DOMRect | null;
}

const FilterBar: React.FC<FilterBarProps> = ({
  catalogData,
  activeFilters,
  setActiveFilters,
}) => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    visible: false,
    allowBack: false,
    anchorRect: null,
  });
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const handleAddFilter = (newFilter: Filter) => {
    const existingFilterIndex = activeFilters.findIndex(
      (filter) => filter.key === newFilter.key
    );
    if (existingFilterIndex === -1) {
      setActiveFilters((prevActiveFilter) => [
        ...prevActiveFilter,
        ...(newFilter.value.length > 0 ? [newFilter] : []),
      ]);
      return;
    }
    if (newFilter.value.length === 0) {
      setActiveFilters((prevActiveFilter) =>
        prevActiveFilter.filter((filter) => filter.key !== newFilter.key)
      );
      return;
    }

    setActiveFilters((prevActiveFilter) =>
      prevActiveFilter.map((filter) =>
        filter.key === newFilter.key ? newFilter : filter
      )
    );
    handleDropdownClose();
  };

  const handleFilterClick = (filterKey: string, event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const filterBarRect = filterBarRef.current?.getBoundingClientRect();
    if (filterBarRect) {
      setDropdownState({
        visible: true,
        allowBack: false,
        anchorRect: new DOMRect(
          rect.left - filterBarRect.left,
          rect.bottom - filterBarRect.top,
          rect.width,
          rect.height
        ),
      });
    }
    setSelectedFilter(filterKey);
  };

  const handleAddFilterButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const filterBarRect = filterBarRef.current?.getBoundingClientRect();
    if (filterBarRect) {
      setDropdownState({
        visible: true,
        allowBack: true,
        anchorRect: new DOMRect(
          rect.left - filterBarRect.left,
          rect.bottom - filterBarRect.top,
          rect.width,
          rect.height
        ),
      });
    }
  };

  const handleDropdownClose = () => {
    setDropdownState({ visible: false, allowBack: false, anchorRect: null });
    setSelectedFilter(null);
  };

  const filterOptionsByKey = FILTER_OPTIONS.reduce(
    (acc, option) => {
      acc[option.key] = getNestedFilterOptions(catalogData, option.key);
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  return (
    <div className="relative flex flex-col p-4 bg-white rounded-lg space-y-2" ref={filterBarRef}>
      <div className="flex items-center space-x-2 overflow-x-auto">
        {activeFilters.length > 0 && (
          <div className="flex space-x-2">
            {activeFilters.map((filter, index) => (
              <FilterItem
                key={index}
                filter={filter}
                onClick={event => handleFilterClick(filter.key, event)}
                onClear={() => handleAddFilter({ key: filter.key, value: [] })}
              />
            ))}
          </div>
        )}
        {activeFilters.length < FILTER_OPTIONS.length && (
          <button
            className="px-4 py-2 border border-gray-300 rounded-full hover:border-gray-800 hover:shadow-md hover:border-2 text-nowrap"
            onClick={handleAddFilterButtonClick}
          >
            + Add Filter
          </button>
        )}
      </div>
      {dropdownState.visible && dropdownState.anchorRect && (
        <FilterDropdown
          onSave={handleAddFilter}
          optionsByKey={filterOptionsByKey}
          selectedFilter={selectedFilter}
          onClose={handleDropdownClose}
          activeFilters={activeFilters}
          allowBack={dropdownState.allowBack}
          anchorRect={dropdownState.anchorRect}
        />
      )}
    </div>
  );
};

export default FilterBar;