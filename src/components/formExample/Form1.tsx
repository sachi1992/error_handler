import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CTextInput, CSelectInput } from "../inputs";

function Form1(): JSX.Element {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    color: Yup.string().required("Choose color"),
  });

  function validateUsername(value: string) {
    let error;
    if (value === "admin") {
      error = "Admin user";
    }
    return error;
  }

  return (
    <div>
      <h1>Form Example</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          color: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <label className="mt-3" htmlFor="firstName">
              Felid 1
            </label>
            <Field
              validate={validateUsername}
              style={{
                width: "100%",
                padding: "5px",
                border: "2px solid green",
                borderRadius: "10px",
              }}
              name="firstName"
            />
            {errors.firstName && touched.firstName ? (
              <div className="text-red-500">{errors.firstName}</div>
            ) : null}

            <label className="mt-3" htmlFor="firstName">
              Felid 2
            </label>
            <Field
              style={{
                width: "100%",
                padding: "5px",
                border: "2px solid green",
                borderRadius: "10px",
              }}
              name="lastName"
            />
            {errors.lastName && touched.lastName ? (
              <div className="text-red-500">{errors.lastName}</div>
            ) : null}

            <label className="mt-3" htmlFor="firstName">
              Felid 3
            </label>
            {/* <Field
              style={{
                width: "100%",
                padding: "5px",
                border: "2px solid green",
                borderRadius: "10px",
              }}
              name="email"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : null} */}

            <CTextInput
              name="email"
              placeholder="Enter your email"
              label="Email"
            />

            <CSelectInput
              name="color"
              label="Select a color"
              options={[
                { value: "red", label: "Red" },
                { value: "green", label: "Green" },
                { value: "blue", label: "Blue" },
              ]}
            />
            <button
              className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Form1;
