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
              <div key={config.name}>
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
              <button type="submit" disabled={isSubmitting}>
                {submitButtonName}
              </button>
            )}
          </Form>
        )}
      </Formik>

      {/* <Formik
        initialValues={{
          loginUserName: '',
          organizationNumber: '',
          address: '',
          city: '',
          phoneNumber: '',
          did: '',
          emailAddress: '',
          userType: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="loginUserName">Username</label>
              <Field
                type="text"
                name="loginUserName"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="loginUserName"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="organizationNumber">Organization Number</label>
              <Field
                type="text"
                name="organizationNumber"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="organizationNumber"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field
                type="text"
                name="address"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <Field
                type="text"
                name="city"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field
                type="text"
                name="phoneNumber"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="did">DID</label>
              <Field
                type="text"
                name="did"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="did"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <Field
                type="email"
                name="emailAddress"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              />
              <ErrorMessage
                name="emailAddress"
                component="div"
                className="text-danger-dark"
              />
            </div>
            <div>
              <label htmlFor="userType">User Type</label>
              <Field
                as="select"
                name="userType"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid green',
                  borderRadius: '10px'
                }}
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage
                name="userType"
                component="div"
                className="text-danger-dark" // Make sure this class has appropriate styles
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik> */}
    </ErrorHandler>
  );
};

export default CForm;
