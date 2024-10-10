import React from "react";

interface OptionComponentProps {
  option: string;
  isSelected: boolean;
  onChange: (option: string) => void;
}

const OptionComponent: React.FC<OptionComponentProps> = ({
  option,
  isSelected,
  onChange,
}) => {
  return (
    <div key={option} className="flex items-center mb-1 p-1 justify-between">
      <span
        className={isSelected ? "text-gray-800 font-semibold" : "text-gray-600"}
      >
        {option}
      </span>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(option)}
        // TODO: checkbox styles
        className=""
      />
    </div>
  );
};

export default OptionComponent;
