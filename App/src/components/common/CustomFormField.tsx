import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICustomFormField } from "@/types/signup/auth";

const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
  description,
  renderCustomField,
}: ICustomFormField) => {
  if (renderCustomField) {
    return (
      <>
        {renderCustomField({ control, name, label, placeholder, description })}
      </>
    );
  }

  // 기본 FormField 렌더링 (깔끔하게 유지)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
