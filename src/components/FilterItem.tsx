import React from "react";

interface FilterItemProps {
  filter: string;
  onClick: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter, onClick }) => {
  return (
    <span
      className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full cursor-pointer"
      onClick={onClick}
    >
      {filter}
    </span>
  );
};

export default FilterItem;
