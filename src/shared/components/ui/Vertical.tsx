import { ALIGN_MAP, JUSTIFY_MAP } from "@/shared/components/model/uiConstants";

interface VerticalProps {
  justify?: keyof typeof JUSTIFY_MAP;
  align?: keyof typeof ALIGN_MAP;
  className?: string;
  children?: React.ReactNode;
}

function Vertical({ justify, align, className = "", children }: VerticalProps) {
  const justifyClass = justify ? JUSTIFY_MAP[justify] : "";
  const alignClass = align ? ALIGN_MAP[align] : "";

  return (
    <div className={`flex flex-col ${justifyClass} ${alignClass} ${className}`}>
      {children}
    </div>
  );
}

export default Vertical;
