import React from "react";

interface FilterItemProps {
  filter: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter }) => {
  return (
    <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">
      {filter}
    </span>
  );
};

export default FilterItem;
