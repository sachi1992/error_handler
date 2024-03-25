import * as Yup from "yup";

export enum ValidationType {
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

export type IOptionSelect = {
  value: string;
  name: string;
};

export type IInputConfig = {
  label: string;
  name: string;
  isValidate: boolean;
  validationType?: ValidationType | ValidationType[];
  validationMessage?: string;
  inputType?: "text" | "email" | "select" | "checkbox";
  placeholder?: string;
  options?: IOptionSelect[];
};

export type IValidationConfig = {
  name: string;
  isValidate: boolean;
  validationType?: ValidationType | ValidationType[];
  validationMessage?: string;
  inputType?: "text" | "email" | "select" | "checkbox";
  placeholder?: string;
  options?: IOptionSelect[];
};

const validateInput = (value: string): string => {
  const stringWithSpaces = value;
  const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");

  const regexZipCode = /^\d{5}$/;
  const regexString = /[a-zA-Z]/;

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

export const CFormValidationFunction = (
  inputConfig: IInputConfig[]
): Yup.ObjectSchema<object> => {
  const validationSchemaObject: any = {};

  inputConfig.forEach((config: IInputConfig) => {
    if (config.isValidate && config.validationType !== undefined) {
      // let validationRules: Yup.StringSchema<string | undefined> = Yup.string()

      let validationRules:
        | Yup.StringSchema<string | undefined>
        | Yup.NumberSchema<number | undefined>
        | Yup.BooleanSchema<boolean | undefined>
        | Yup.ObjectSchema<object | undefined> = Yup.string();

      if (Array.isArray(config?.validationType)) {
        config.validationType?.forEach((type) => {
          switch (type) {
            case ValidationType.Required:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.required(
                  config.validationMessage ?? `${config.label} is required`
                );
              }
              break;

            case ValidationType.Org:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.matches(
                  /^(19|20)?(\d{6}|\d{8})[- ]?\d{4}$/,
                  config.validationMessage ?? "Invalid organization number"
                );
              }
              break;

            case ValidationType.Email:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.email(
                  config.validationMessage ?? "Invalid email address"
                );
              }
              break;

            case ValidationType.PhoneWithCode:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.matches(
                  /^(?:(?:00\d{2}|0)\s?|\+)\d{3,4}(?:\s?\d){7}$/,
                  config.validationMessage ??
                    "Invalid phone number with country code"
                );
              }
              break;

            case ValidationType.Phone:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.matches(
                  /^\d{10}$/,
                  config.validationMessage ?? "Invalid phone number"
                );
              }
              break;

            case ValidationType.ZipCode:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.matches(
                  /^\d{5}$/,
                  config.validationMessage ??
                    "Zip code must be a 5-digit number"
                );
              }
              break;

            case ValidationType.Ort:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.matches(
                  /[a-zA-Z]/,
                  config.validationMessage ?? "Invalid city format"
                );
              }
              break;

            case ValidationType.CityCode:
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

            case ValidationType.Url:
              if (validationRules instanceof Yup.string) {
                validationRules = validationRules.url(
                  config.validationMessage ?? "Invalid URL format"
                );
              }
              break;

            case ValidationType.String:
              validationRules = validationRules.typeError(
                config.validationMessage ?? "Value must be a string"
              );
              break;

            case ValidationType.Number:
              validationRules = Yup.number().typeError(
                config.validationMessage ?? "Value must be a number"
              );
              break;

            case ValidationType.Boolean:
              validationRules = Yup.boolean().typeError(
                config.validationMessage ?? "Value must be a boolean"
              );
              break;

            default:
              break;
          }
        });
      }
      // else {
      //   switch (config.validationType) {
      //     case ValidationType.Required:
      //       validationRules = validationRules.required(
      //         config.validationMessage ?? `${config.label} is required`
      //       )
      //       break

      //     case ValidationType.Org:
      //       validationRules = validationRules.matches(
      //         /^(19|20)?(\d{6}|\d{8})[- ]?\d{4}$/,
      //         config.validationMessage ?? 'Invalid organization number'
      //       )
      //       break

      //     case ValidationType.Email:
      //       validationRules = validationRules.email(
      //         config.validationMessage ?? 'Invalid email address'
      //       )
      //       break

      //     case ValidationType.Phone:
      //       validationRules = validationRules.matches(
      //         /^(?:(?:00\d{2}|0)\s?|\+)\d{3,4}(?:\s?\d){7}$/,
      //         config.validationMessage ?? 'Invalid phone number'
      //       )
      //       break

      //     case ValidationType.ZipCode:
      //       if (validationRules instanceof Yup.string) {
      //         validationRules = validationRules.matches(
      //           /^\d{5}$/,
      //           config.validationMessage ?? 'Zip code must be a 5-digit number'
      //         )
      //       }
      //       break

      //     case ValidationType.Ort:
      //       validationRules = validationRules.matches(
      //         /[a-zA-Z]/,
      //         config.validationMessage ?? 'Invalid city format'
      //       )
      //       break

      //     case ValidationType.String:
      //       validationRules = validationRules.typeError(
      //         config.validationMessage ?? 'Value must be a string'
      //       )
      //       break

      //     case ValidationType.Number:
      //       validationRules = Yup.number().typeError(
      //         config.validationMessage ?? 'Value must be a number'
      //       )
      //       break

      //     case ValidationType.Boolean:
      //       validationRules = Yup.boolean().typeError(
      //         config.validationMessage ?? 'Value must be a boolean'
      //       )
      //       break

      //     default:
      //       break
      //   }
      // }

      validationSchemaObject[config.name] = validationRules;
    }
  });

  const validationSchema = Yup.object().shape(validationSchemaObject);

  return validationSchema;
};

export default {
  CFormValidationFunction,
};

// import * as Yup from 'yup'

// export type IInputConfig = {
//   label: string
//   name: string
//   isValidate: boolean
//   validationType?:
//     | 'required'
//     | 'ort'
//     | 'phone'
//     | 'email'
//     | 'string'
//     | 'number'
//     | 'org'
//   validationMessage?: string
//   inputType?: 'text' | 'email' | 'select'
//   placeholder?: string
//   options?: string[] | object[]
// }

// export const CFormValidationFunction = (
//   inputConfig: IInputConfig[]
// ): object => {
//   const validationSchemaObject: any = {}
//   inputConfig.forEach((config: IInputConfig) => {
//     if (config.name.trim() !== '' && config.isValidate) {
//       switch (config.validationType) {
//         case 'required':
//           validationSchemaObject[config.name] = Yup.string().required(
//             config.validationMessage ?? `${config.label} is required`
//           )
//           break
//         case 'email':
//           validationSchemaObject[config.name] = Yup.string().email(
//             config.validationMessage ?? 'Invalid email address'
//           )
//           break
//         case 'phone':
//           validationSchemaObject[config.name] = Yup.string().matches(
//             /^(?:(?:00\d{2}|0)\s?|\+)\d{3,4}(?:\s?\d){7}$/,
//             config.validationMessage ?? 'Invalid phone number'
//           )
//           break
//         default:
//           validationSchemaObject[config.name] = Yup.string()
//           break
//       }
//     }
//   })

//   const validationSchema = Yup.object().shape(validationSchemaObject)

//   return validationSchema
// }

// export default {
//   CFormValidationFunction
// }
