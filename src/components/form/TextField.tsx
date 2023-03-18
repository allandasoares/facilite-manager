import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const TextField = ({
  id,
  label,
  type = "text",
  isRequired = true,
  formik,
  ...props
}: any) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      isInvalid={formik.touched[id] && formik.errors[id]}
    >
      <FormLabel>{label}</FormLabel>
      <Input type={type} {...formik.getFieldProps(id)} {...props} />
      <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
