import { useState } from "react";

function useFileInput(initialValue = null) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: any) => {
    setValue(event.target.files[0]);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    handleChange,
    reset,
  };
}

export default useFileInput;
