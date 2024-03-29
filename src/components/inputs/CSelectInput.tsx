import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { FormikValues } from "formik/dist/types";
import { IOptionSelect } from "../../errorHandler";

/**
 * Props for the custom select input component, extending FormikValues.
 *
 * These props define the behavior and appearance of the custom select input component. They include options
 * for setting the HTML id attribute, input name, label, placeholder, default value, current value, disabled state,
 * autofocus, color theme, full width, autocomplete behavior, helper text, input ref, and options for the select.
 */
interface BaseICSelectInputProps extends FormikValues {
  id?: string;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  autoFocus?: boolean;
  color?: "primary" | "secondary";
  fullWidth?: boolean;
  autoComplete?: string;
  helperText?: React.ReactNode;
  inputRef?: React.Ref<any>;
  options: IOptionSelect[];
}

/**
 * Custom select input component.
 *
 * This component renders a select input field with options provided by the 'options' prop. It manages form state
 * using Formik context to handle errors and display error messages appropriately. The CSS class for styling is
 * dynamically constructed based on the error state of the input field.
 *
 * @param {BaseICSelectInputProps} props - Props for the custom select input component.
 * @returns {JSX.Element} - Custom select input component.
 */
const CSelectInput: React.FC<BaseICSelectInputProps> = (props) => {
  const { errors, touched } = useFormikContext<FormikValues>();

  const isError = touched[props.name] && errors[props.name];

  const inputClass = `w-full p-2 border-2 rounded-lg outline-none 
  ${isError ? "border-red-400" : "border-green-400"} 
  ${isError ? "focus:border-red-300" : "focus:border-green-300"} 
  disabled:border-gray-300`;

  return (
    <div>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <br />

      <Field as="select" className={inputClass} {...props}>
        <option key="select" value="">
          Select an option
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        className="text-red-400"
        name={props.name}
        component="div"
      />
    </div>
  );
};

export default CSelectInput;
