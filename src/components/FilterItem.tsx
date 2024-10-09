import React from "react";
import { Filter } from "../types";
import { FILTER_LABELS } from "../constants";

interface FilterItemProps {
  filter: Filter;
  onClick: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter, onClick }) => {
  return (
    <span
      className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <strong>{FILTER_LABELS[filter.key]}</strong> is{" "}
      {filter.value.length > 1
        ? `${filter.value[0]} +${filter.value.length - 1}`
        : filter.value[0]}
    </span>
  );
};

export default FilterItem;
