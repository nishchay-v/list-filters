import React, { useState, useMemo } from "react";
import OptionComponent from "./OptionComponent";
import { Filter } from "../types";

interface NestedFilterMenuProps {
  onSave: (filter: Filter) => void;
  options: string[];
  selectedFilter: string; // Assuming this is passed as a prop
}

const NestedFilterMenu: React.FC<NestedFilterMenuProps> = ({
  onSave,
  options,
  selectedFilter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
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

  // Memoized array version of selectedOptions for rendering purposes
  const selectedOptionsArray = useMemo(
    () => Array.from(selectedOptions),
    [selectedOptions]
  );

  return (
    <div>
      <div className="flex-col h-80 overflow-y-auto">
        <div className="p-2">
          {selectedOptionsArray.length > 0 && (
            <>
              <h3 className="font-bold mb-2">Selected</h3>
              {selectedOptionsArray.map((option) => (
                <OptionComponent
                  key={option}
                  option={option}
                  isSelected={true}
                  onChange={handleCheckboxChange}
                />
              ))}
            </>
          )}
        </div>
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
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() =>
          onSave({ key: selectedFilter, value: selectedOptionsArray })
        }
      >
        Save
      </button>
    </div>
  );
};

export default NestedFilterMenu;
