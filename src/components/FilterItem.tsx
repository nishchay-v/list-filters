import React from "react";
import { Filter } from "../types";
import { FILTER_LABELS } from "../constants";

interface FilterItemProps {
    filter: Filter;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;   
    onClear: () => void;
  
  }

const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  onClick,
  onClear,
}) => {
  return (
    <span
      className="px-4 py-2 border-2 bg-gray-200 rounded-full hover:border-gray-800 hover:shadow-md cursor-pointer text-nowrap"
      onClick={onClick}
    >
      <strong>{FILTER_LABELS[filter.key]}</strong> is{" "}
      {filter.value.length > 1
        ? `${filter.value[0]} +${filter.value.length - 1}`
        : filter.value[0]}
      <span
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        className="ml-2 hover:text-gray-500"
      >
        X
      </span>
    </span>
  );
};

export default FilterItem;
