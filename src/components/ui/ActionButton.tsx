import React from "react";
import Loader from "./Loader";

interface ActionButtonProps {
  handleClick: () => void;
  isLoading?: boolean;
  label?: string;
  extraClass?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  handleClick,
  isLoading,
  label,
  extraClass,
}: ActionButtonProps) => {
  return (
    <button
      className={`px-2 py-1 rounded-md transition-colors duration-200 w-[140px] flex justify-center items-center
        hover:bg-bg ${extraClass}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader size={20} /> : label ?? ""}
    </button>
  );
};

export default ActionButton;
