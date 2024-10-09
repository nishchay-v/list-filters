import React, { useState, useMemo } from "react";
import OptionComponent from "./OptionComponent";
import { Filter } from "../types";

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

  return (
    <div>
      <div className="flex-col h-80 overflow-y-auto">
        {selectedOptionsArray.length > 0 && (
          <div className="p-2">
            <h3 className="font-bold mb-2">Selected</h3>
            {selectedOptionsArray.map((option) => (
              <OptionComponent
                key={option}
                option={option}
                isSelected={true}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        )}
        <div className="p-2">
          <h3 className="font-bold mb-2">All</h3>
          {options.map((option) => (
            <OptionComponent
              key={option}
              option={option}
              isSelected={selectedOptions.has(option)}
              onChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between m-2">
        <button
          className=" p-2  text-gray-500 hover:text-gray-800"
          onClick={handleClearFilter}
        >
          Clear
        </button>
        <button
          className=" p-2  text-gray-500 hover:text-gray-800"
          onClick={handleApplyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default NestedFilterMenu;
