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
    <div key={option} className="flex items-center mb-1">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(option)}
        className="mr-2"
      />
      <span>{option}</span>
    </div>
  );
};

export default OptionComponent;
