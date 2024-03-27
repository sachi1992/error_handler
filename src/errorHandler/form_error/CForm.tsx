import { Formik, Form, Field, ErrorMessage } from "formik";

import { ErrorHandler } from "../boundary_error";
import {
  CFormValidationFunction,
  IInputConfig,
  IOptionSelect,
} from "./ValidateCForm";

type CFormProps = {
  isImportSubmit?: boolean;
  inputConfig: IInputConfig[];
  initialValueObject: object | {} | undefined;
  submitButtonName?: string;
  onSubmit: (values: any) => void;
};

const CForm = ({
  isImportSubmit = false,
  inputConfig = [],
  initialValueObject,
  submitButtonName = "Submit",
  onSubmit,
}: CFormProps): JSX.Element => {
  const validationSchema = CFormValidationFunction(inputConfig);

  return (
    <ErrorHandler>
      <Formik
        initialValues={initialValueObject || {}}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (onSubmit != null) {
            onSubmit(values);
          } else {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            {inputConfig.map((config: IInputConfig) => (
              <div className="my-3" key={config.name}>
                <label htmlFor={config.name}>{config.label}</label>
                {config.inputType === "select" ? (
                  <Field
                    as="select"
                    name={config.name}
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "2px solid green",
                      borderRadius: "10px",
                    }}>
                    <option value="">{`Select ${config.label}`}</option>
                    {config.options?.map((option: IOptionSelect) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field
                    type={config.inputType ?? "text"}
                    name={config.name}
                    placeholder={config.placeholder ?? ""}
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "2px solid green",
                      borderRadius: "10px",
                    }}
                  />
                )}

                <ErrorMessage
                  name={config.name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}

            {!isImportSubmit && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                {submitButtonName}
              </button>
            )}
          </Form>
        )}
      </Formik>
    </ErrorHandler>
  );
};

export default CForm;
