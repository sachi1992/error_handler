import * as Yup from "yup";
import { IInputConfig } from "./IFormProp";

/**
 * Represents types of validation that can be applied to an input field.
 * @enum {string}
 */
export enum IValidationType {
  Required = "required",
  Org = "org",
  Email = "email",
  Phone = "phone",
  PhoneWithCode = "phoneWithCountryCode",
  Ort = "ort",
  ZipCode = "zipCode",
  CityCode = "cityCode",
  Url = "url",
  String = "string",
  Number = "number",
  Boolean = "boolean",
}

/**
 * IValidationConfig Interface
 *
 * Represents a configuration for input field validation.
 *
 * @interface
 * @property {string} [name] - The name of the input field.
 * @property {boolean} [label] - Whether the input field has a label.
 * @property {string} [validationMessage] - Custom validation message to display.
 * @property {IValidationType[]} validationType - Types of validation to apply.
 */
export type IValidationConfig = {
  name?: string;
  label?: boolean;
  validationMessage?: string;
  validationType: IValidationType[];
};

/**
 * Validates input value based on its type.
 * @param {string} value - The input value to validate
 * @returns {string} - The type of validation error, if any
 */
const validateInput = (value: string): string => {
  // Remove spaces from the value
  const stringWithSpaces = value;
  const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");

  // Regular expressions for validation
  const regexZipCode = /^\d{5}$/;
  const regexString = /[a-zA-Z]/;

  // Check if the value matches the patterns
  const numbers = stringWithoutSpaces.match(/\d+/g);
  const isFiveDigitNumber = numbers?.some((num) => regexZipCode.test(num));

  if (!(isFiveDigitNumber ?? false) as boolean) {
    return "zipCode";
  } else if (!regexString.test(value)) {
    return "ort";
  } else {
    return "";
  }
};

/**
 * Generates a Yup validation schema based on input configuration.
 * @param {(IInputConfig[] | IValidationConfig[])} inputConfig - The input configuration
 * @returns {Yup.ObjectSchema<object>} - The Yup validation schema
 */
export const CFormValidationFunction = (
  inputConfig: IInputConfig[] | IValidationConfig[]
): Yup.ObjectSchema<object> => {
  let validationSchemaObject: any = {};

  inputConfig.forEach((config: IInputConfig | IValidationConfig) => {
    let validationRules:
      | Yup.StringSchema<string | undefined>
      | Yup.NumberSchema<number | undefined>
      | Yup.BooleanSchema<boolean | undefined>
      | Yup.ObjectSchema<object | undefined> = Yup.string();

    if (Array.isArray(config?.validationType)) {
      config.validationType?.forEach((type) => {
        switch (type) {
          case IValidationType.Required:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.required(
                config.validationMessage ?? `${config?.label} is required`
              );
            }
            break;

          case IValidationType.Org:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.matches(
                /^(19|20)?(\d{6}|\d{8})[- ]?\d{4}$/,
                config.validationMessage ?? "Invalid organization number"
              );
            }
            break;

          case IValidationType.Email:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.email(
                config.validationMessage ?? "Invalid email address"
              );
            }
            break;

          case IValidationType.PhoneWithCode:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.matches(
                /^(?:(?:00\d{2}|0)\s?|\+)\d{3,4}(?:\s?\d){7}$/,
                config.validationMessage ??
                  "Invalid phone number with country code"
              );
            }
            break;

          case IValidationType.Phone:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.matches(
                /^\d{10}$/,
                config.validationMessage ?? "Invalid phone number"
              );
            }
            break;

          case IValidationType.ZipCode:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.matches(
                /^\d{5}$/,
                config.validationMessage ?? "Zip code must be a 5-digit number"
              );
            }
            break;

          case IValidationType.Ort:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.matches(
                /[a-zA-Z]/,
                config.validationMessage ?? "Invalid city format"
              );
            }
            break;

          case IValidationType.CityCode:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.test({
                test(value, ctx) {
                  const returnValue = validateInput(value ?? "");
                  if (returnValue === "zipCode") {
                    return ctx.createError({
                      message: "Zip code must be a 5-digit number",
                    });
                  }
                  if (returnValue === "ort") {
                    return ctx.createError({
                      message: "Invalid city format",
                    });
                  }

                  return true;
                },
              });
            }
            break;

          case IValidationType.Url:
            if (validationRules instanceof Yup.string) {
              validationRules = validationRules.url(
                config.validationMessage ?? "Invalid URL format"
              );
            }
            break;

          case IValidationType.String:
            validationRules = validationRules.typeError(
              config.validationMessage ?? "Value must be a string"
            );
            break;

          case IValidationType.Number:
            validationRules = Yup.number().typeError(
              config.validationMessage ?? "Value must be a number"
            );
            break;

          case IValidationType.Boolean:
            validationRules = Yup.boolean().typeError(
              config.validationMessage ?? "Value must be a boolean"
            );
            break;

          default:
            break;
        }
      });
    }
    if (config?.name) {
      validationSchemaObject[config.name] = validationRules;
    } else {
      validationSchemaObject = validationRules;
    }
  });

  // Create Yup object schema using the generated validation schema
  const validationSchema = Yup.object().shape(validationSchemaObject);

  return validationSchema;
};

export default CFormValidationFunction;
