type UseFormDataTransformerProps = {
  values: any;
  exceptKeys?: string[];
  appendData?: {
    [key: string]: any;
  };
};

/**
 * This hook is used to transform the form data to FormData
 * @param values - The form values
 * @param exceptKeys - The keys that will be ignored
 * @param appendData - The data that will be appended to FormData
 * @returns The FormData
 */
function useFormDataTransformer() {
  const transform = ({
    values,
    exceptKeys = [],
    appendData = {},
  }: UseFormDataTransformerProps): FormData => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (!exceptKeys.includes(key)) formData.append(key, values[key]);
    });

    // Append logo to formData
    Object.entries(appendData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          formData.append(`${key}[]`, "__EMPTY_ARRAY__");
        } else {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        }
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  };

  return {
    transform,
  };
}

export default useFormDataTransformer;
