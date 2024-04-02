import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { FormikValues } from "formik/dist/types";

/**
 * Props for the custom text input component, extending FormikValues.
 *
 * These props define the behavior and appearance of the custom text input component. They include options
 * for setting autocomplete behavior, autofocus, color theme, default value, disabled state, full width,
 * helper text, HTML id attribute, input ref, label, multiline input, name, placeholder, required flag,
 * number of rows, maximum number of rows, select input, size, type of input field, value, and indication
 * of whether to render as a textarea.
 */
interface BaseICTextInputProps extends FormikValues {
  id?: string;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  type?: "text" | "number" | "password" | undefined;
  isTextArea?: boolean;
  rows?: number;
  rowsMax?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  color?: "primary" | "secondary";
  fullWidth?: boolean;
  autoComplete?: string;
  helperText?: React.ReactNode;
  inputRef?: React.Ref<any>;
}

/**
 * Custom text input component.
 *
 * This component renders a text input or textarea based on the `isTextArea` prop. It manages input focus
 * state and displays error messages if the input is touched and has an error.
 *
 * @param {BaseICTextInputProps} props - Props for the custom text input component.
 * @returns {JSX.Element} - Custom text input component.
 */
const CTextInput: React.FC<BaseICTextInputProps> = (props) => {
  const { errors, touched } = useFormikContext<FormikValues>();

  const isError = touched[props.name] && errors[props.name];
  console.log("🚀 ~ isError:", isError);

  const inputClass = `w-full p-2 border-2 rounded-lg outline-none 
  ${isError ? "border-red-400" : "border-green-400"} 
  ${isError ? "focus:border-red-300" : "focus:border-green-300"} 
  disabled:border-gray-300`;

  return (
    <div>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <br />
      {props.isTextArea ? (
        <Field as="textarea" className={inputClass} {...props} />
      ) : (
        <Field as="input" className={inputClass} {...props} />
      )}

      <ErrorMessage
        className="text-red-400"
        name={props.name}
        component="div"
      />
    </div>
  );
};

export default CTextInput;
