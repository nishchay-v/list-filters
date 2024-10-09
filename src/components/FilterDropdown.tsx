import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import NestedFilterMenu from "./NestedFilterMenu";
import { FILTER_LABELS, FILTER_OPTIONS } from "../constants";
import { Filter } from "../types";

interface FilterDropdownProps {
  onSave: (filter: Filter) => void;
  optionsByKey: { [key: string]: string[] };
  selectedFilter: string | null;
  onClose: () => void;
  selectedValues: string[] | undefined;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSave,
  optionsByKey,
  selectedFilter,
  onClose,
  selectedValues,
}) => {
  const [internalSelectedFilter, setInternalSelectedFilter] = useState<
    string | null
  >(selectedFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
    >
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
              : FILTER_LABELS[internalSelectedFilter]}
          </h4>
        </div>
      </div>
      {internalSelectedFilter === null ? (
        <ul className="space-y-2 p-2">
          {FILTER_OPTIONS.map((option) => (
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
          selectedValues={selectedValues}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default FilterDropdown;
