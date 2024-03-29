import { IValidationType } from "./ValidateCForm";

/**
 * Represents options for select dropdown inputs.
 *
 * @interface
 * @property {string} value - The value of the option.
 * @property {string} name - The display name of the option.
 */
export type IOptionSelect = {
  value: string;
  label: string;
};

/**
 * Represents the configuration of an input field in a form.
 *
 * @interface
 * @property {string} label - The label or prompt for the input field.
 * @property {string} name - The unique identifier or name of the input field.
 * @property {boolean} isValidate - Indicates whether validation is required for this input field.
 * @property {Array<IValidationType>} [validationType] - Types of validation to be applied to the input field (optional).
 * @property {string} [validationMessage] - Custom validation message to be displayed if validation fails (optional).
 * @property {"text" | "email" | "select" | "checkbox"} [inputType] - Type of input field (optional, defaults to "text").
 * @property {string} [placeholder] - Placeholder text to be displayed in the input field when it's empty (optional).
 * @property {Array<IOptionSelect>} [options] - Options for select dropdown inputs (optional, required if inputType is "select").
 */
export type IInputConfig = {
  label: string;
  name: string;
  isValidate: boolean;
  validationType?: IValidationType[];
  validationMessage?: string;
  inputType?: "text" | "email" | "select" | "checkbox";
  placeholder?: string;
  options?: IOptionSelect[];
};
