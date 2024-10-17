import { ReactNode } from "react";
import { Collapse, Box } from "@mui/material";

interface CollapsePortalProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
}

/**
 * Компонент, отображающий портал, который открывается/закрывается
 * в зависимости от пропса isOpen.
 *
 * @param {CollapsePortalProps} props
 * @prop {React.ReactNode} children - Компоненты, которые отображаются
 *   внутри портала
 * @prop {string} [className] - CSS-класс, который будет добавлен
 *   к обертке
 */
const CollapsePortal = ({
  children,
  className,
  isOpen,
}: CollapsePortalProps) => {
  return (
    <Box className={className}>
      <Collapse in={isOpen}>
        <Box className="mt-2">{children}</Box>
      </Collapse>
    </Box>
  );
};

export default CollapsePortal;
