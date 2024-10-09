import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import NestedFilterMenu from "./NestedFilterMenu";
import { filterOptions } from "../constants";
import { Filter } from "../types";

interface FilterDropdownProps {
  onSave: (filter: Filter) => void;
  optionsByKey: { [key: string]: string[] };
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSave,
  optionsByKey,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
    <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className="flex items-center mb-2 border-b border-gray-300">
        {selectedFilter !== null && (
          <button className="p-2" onClick={() => setSelectedFilter(null)}>
            <FaArrowLeft />
          </button>
        )}
        <div className="flex-1">
          <h4 className="text-m font-semibold p-2">
            {selectedFilter === null
              ? "Add Filter"
              : filterOptions.find((option) => option.key === selectedFilter)
                  ?.name}
          </h4>
        </div>
      </div>
      {selectedFilter === null ? (
        <ul className="space-y-2 p-2">
          {filterOptions.map((option) => (
            <li key={option.name}>
              <button
                className="flex items-center space-x-2 p-2 w-full rounded hover:bg-gray-200"
                onClick={() => setSelectedFilter(option.key)}
              >
                <span>{option.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <NestedFilterMenu
          selectedFilter={selectedFilter}
          onSave={onSave}
          // onBack={() => setSelectedFilter(null)}
          options={optionsByKey[selectedFilter]}
        />
      )}
    </div>
  );
};

export default FilterDropdown;
