import { ButtonProps } from "@mui/material";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface CollapseButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  props?: ButtonProps;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  isOpen,
  onClick,
  ...props
}: CollapseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[53px] h-[53px] flex justify-center items-center transition-all duration-150 rounded-full hover:bg-bg dark:hover:bg-bgDark"
      {...props}
    >
      <MdKeyboardArrowDown
        className={`${
          !isOpen ? "rotate-180" : ""
        } w-[43px] h-[43px] transition-all duration-150 text-todoActive dark:text-todoActiveDark`}
      />
    </button>
  );
};

export default CollapseButton;
