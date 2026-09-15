import type { FC } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  className?: string;
}

const ShinyText: FC<ShinyTextProps> = ({ text, disabled = false, className = "" }) => {
  return <span className={`${disabled ? "" : "shiny-text"} ${className}`.trim()}>{text}</span>;
};

export default ShinyText;
