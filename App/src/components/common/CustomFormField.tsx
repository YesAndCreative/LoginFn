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
