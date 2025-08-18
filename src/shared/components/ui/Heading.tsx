import type { JSX } from "react";
import { HEADING_LEVEL_MAP } from "@/shared/components/model/uiConstants";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
}
function Heading({ level = 1, className, children }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClass = HEADING_LEVEL_MAP[level];
  
  return (
    <Tag className={`${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
}

export default Heading;