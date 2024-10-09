import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import NestedFilterMenu from "./NestedFilterMenu";
import { filterOptions } from "../constants";
import { Filter } from "../types";

interface FilterDropdownProps {
  onSave: (filter: Filter) => void;
  optionsByKey: { [key: string]: string[] };
  selectedFilter: string | null;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSave,
  optionsByKey,
  selectedFilter,
}) => {
  const [internalSelectedFilter, setInternalSelectedFilter] = useState<
    string | null
  >(selectedFilter);

  return (
    <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className="flex items-center mb-2 border-b border-gray-300">
        {internalSelectedFilter !== null && (
          <button
            className="p-2"
            onClick={() => setInternalSelectedFilter(null)}
          >
            <IoIosArrowBack />
          </button>
        )}
        <div className="flex-1">
          <h4 className="text-m font-semibold p-2">
            {internalSelectedFilter === null
              ? "Add Filter"
              : filterOptions.find(
                  (option) => option.key === internalSelectedFilter
                )?.name}
          </h4>
        </div>
      </div>
      {internalSelectedFilter === null ? (
        <ul className="space-y-2 p-2">
          {filterOptions.map((option) => (
            <li key={option.name}>
              <button
                className="flex items-center space-x-2 p-2 w-full rounded hover:bg-gray-200"
                onClick={() => setInternalSelectedFilter(option.key)}
              >
                <span>{option.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <NestedFilterMenu
          selectedFilter={internalSelectedFilter}
          onSave={onSave}
          options={optionsByKey[internalSelectedFilter]}
        />
      )}
    </div>
  );
};

export default FilterDropdown;
