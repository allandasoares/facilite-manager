import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import MaskedInput from "react-text-mask";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  formik: any;
  mask?: (string | RegExp)[];
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = "text",
  isRequired = true,
  formik,
  mask,
  ...props
}) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      isInvalid={formik.touched[id] && Boolean(formik.errors[id])}
    >
      <FormLabel>{label}</FormLabel>
      {mask ? (
        <MaskedInput
          mask={mask}
          type={type}
          value={formik.values[id]}
          render={(ref, maskedProps) => {
            const { value, ...fieldProps } = formik.getFieldProps(id);
            return (
              <Input ref={ref} {...fieldProps} {...maskedProps} {...props} />
            );
          }}
          onChange={(event) => {
            const unmaskedValue = event.target.value.replace(/[^0-9]/g, "");
            formik.setFieldValue(id, unmaskedValue);
            setTimeout(() => {
              formik.setFieldTouched(id, true);
            }, 0);
          }}
          guide={true}
        />
      ) : (
        <Input type={type} {...formik.getFieldProps(id)} {...props} />
      )}
      <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
