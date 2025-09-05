import { FormItem } from "../form";

function HorizontalFormItem({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <FormItem className="flex flex-row items-center">
      {children}
    </FormItem>
  );
};

export default HorizontalFormItem;