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
      <span className="mr-2">{option}</span>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(option)}
      />
    </div>
  );
};

export default OptionComponent;
