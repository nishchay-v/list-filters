import React, { useState, useMemo } from "react";
import OptionComponent from "./OptionComponent";
import { Filter } from "../types";

// Assume searchOptions is imported or defined elsewhere
import { searchOptions } from "../helpers";

interface NestedFilterMenuProps {
  onSave: (filter: Filter) => void;
  onClose: () => void;
  options: string[];
  selectedFilter: string;
  selectedValues: string[] | undefined;
}

const NestedFilterMenu: React.FC<NestedFilterMenuProps> = ({
  onSave,
  onClose,
  options,
  selectedFilter,
  selectedValues,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(selectedValues)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(option)
        ? newSelected.delete(option)
        : newSelected.add(option);
      return newSelected;
    });
  };

  const handleClearFilter = () => {
    setSelectedOptions(new Set());
    onSave({ key: selectedFilter, value: [] });
    onClose();
  };

  const handleApplyFilter = () => {
    onSave({ key: selectedFilter, value: selectedOptionsArray });
    onClose();
  };

  // Memoized array version of selectedOptions for rendering purposes
  const selectedOptionsArray = useMemo(
    () => Array.from(selectedOptions),
    [selectedOptions]
  );

  // Filtered options based on search query
  const filteredOptions = useMemo(
    () => searchOptions(options, searchQuery),
    [options, searchQuery]
  );

  return (
    <div>
      <div className="p-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex-col h-80 overflow-y-auto p-2">
        {selectedOptionsArray.length > 0 && (
          <div className="p-2">
            <h3 className="font-mono font-bold text-sm text-gray-400 mb-2">
              SELECTED
            </h3>
            <div className="p-1">
              {selectedOptionsArray.map((option) => (
                <OptionComponent
                  key={option}
                  option={option}
                  isSelected={true}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>
        )}
        <div className="p-2">
          <h3 className="font-mono font-bold text-sm text-gray-400 mb-2">
            ALL
          </h3>
          <div className="p-1">
            {filteredOptions.map((option) => (
              <OptionComponent
                key={option}
                option={option}
                isSelected={selectedOptions.has(option)}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between m-2 border-t-2 pt-2">
        <button
          className=" p-2  text-gray-500 hover:text-gray-800"
          onClick={handleClearFilter}
        >
          Clear
        </button>
        <button
          className=" py-2 px-4 bg-gray-800 text-white rounded-full hover:bg-gray-400"
          onClick={handleApplyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default NestedFilterMenu;
