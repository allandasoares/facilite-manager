import { useRef } from "react";
import JoditEditor from "jodit-react";

export default function RichText({ id, formik }: any) {
  const editor = useRef(null);

  function handleChange(text: any) {
    formik.setFieldValue(id, text);
    setTimeout(() => {
      formik.setFieldTouched(id, true);
    }, 0);
  }

  const config = {
    readOnly: false,
    height: 300,
    placeholder: "Descrição do produto",
  };

  return (
    <JoditEditor
      ref={editor}
      value={formik.values[id]}
      config={config}
      onBlur={handleChange}
    />
  );
}
