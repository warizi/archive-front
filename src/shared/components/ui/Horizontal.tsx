import { ALIGN_MAP, JUSTIFY_MAP } from "@/shared/components/model/uiConstants";

interface HorizontalProps {
  justify?: keyof typeof JUSTIFY_MAP;
  align?: keyof typeof ALIGN_MAP;
  className?: string;
  children?: React.ReactNode;
}

function Horizontal({ justify, align, className = "", children, ...rest }: HorizontalProps & React.HTMLProps<HTMLDivElement>) {
  const justifyClass = justify ? JUSTIFY_MAP[justify] : "";
  const alignClass = align ? ALIGN_MAP[align] : "";

  return (
    <div className={`flex flex-row ${justifyClass} ${alignClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Horizontal;
