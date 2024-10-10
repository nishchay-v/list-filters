import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import NestedFilterMenu from "./NestedFilterMenu";
import { FILTER_LABELS, FILTER_OPTIONS } from "../constants";
import { Filter } from "../types";
import { getFilterIcon } from "../helpers";

interface FilterDropdownProps {
  onSave: (filter: Filter) => void;
  optionsByKey: { [key: string]: string[] };
  selectedFilter: string | null;
  onClose: () => void;
  activeFilters: Filter[];
  allowBack: boolean;
  anchorRect: DOMRect;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSave,
  optionsByKey,
  selectedFilter,
  onClose,
  activeFilters,
  allowBack,
  anchorRect,
}) => {
  const [internalSelectedFilter, setInternalSelectedFilter] = useState<
    string | null
  >(selectedFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValues = activeFilters.find(
    (filter) => filter.key === selectedFilter
  )?.value;

  const activeFilterSet = new Set(activeFilters.map(({ key }) => key));

  const inactiveFilters = FILTER_OPTIONS.filter(
    ({ key }) => !activeFilterSet.has(key)
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shouldRenderBackButton = allowBack && internalSelectedFilter !== null;

  const renderHeader = () => (
    <div className="flex items-center mb-2 border-b border-gray-300">
      {shouldRenderBackButton && (
        <button className="p-2" onClick={() => setInternalSelectedFilter(null)}>
          <IoIosArrowBack />
        </button>
      )}
      <div className="flex-1">
        <h4 className="text-m font-semibold p-2">
          {internalSelectedFilter === null
            ? "Add Filter"
            : FILTER_LABELS[internalSelectedFilter]}
        </h4>
      </div>
    </div>
  );

  const renderFilterOptions = () => (
    <ul className="space-y-2 p-2">
      {inactiveFilters.map((option) => {
        const IconComponent = getFilterIcon(option.key);
        return (
          <li key={option.name}>
            <button
              className="flex items-center space-x-2 p-2 w-full rounded hover:bg-gray-200"
              onClick={() => setInternalSelectedFilter(option.key)}
            >
              <IconComponent />
              <span>{option.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
      style={{
        left: `${anchorRect.left}px`,
        minWidth: `${anchorRect.width}px`,
      }}
    >
      {renderHeader()}
      {internalSelectedFilter === null ? (
        renderFilterOptions()
      ) : (
        <NestedFilterMenu
          selectedFilter={internalSelectedFilter}
          onSave={onSave}
          options={optionsByKey[internalSelectedFilter]}
          selectedValues={selectedValues}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default FilterDropdown;
