import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function NestedForm(): JSX.Element {
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
      <h1>Nested Form Example</h1>
      <Formik
        initialValues={{
          social: {
            facebook: "ab",
            twitter: "",
          },
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}>
        <Form>
          <label className="mt-3" htmlFor="firstName">
            Felid 1
          </label>
          <Field
            style={{
              width: "100%",
              padding: "5px",
              border: "2px solid green",
              borderRadius: "10px",
            }}
            name="social.facebook"
          />

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
            name="social.twitter"
          />

          <button
            className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            type="submit">
            Submit
          </button>
        </Form>
      </Formik>

      <br />
      <br />

      <h1>Array</h1>
      <Formik
        initialValues={{
          friends: ["jared", "ian"],
        }}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}>
        <Form>
          <label className="mt-3" htmlFor="firstName">
            Felid 1
          </label>
          <Field
            style={{
              width: "100%",
              padding: "5px",
              border: "2px solid green",
              borderRadius: "10px",
            }}
            name="friends[0]"
          />
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
            name="friends[1]"
          />
          <button
            className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            type="submit">
            Submit
          </button>
        </Form>
      </Formik>

      <br />
      <br />

      <h1> Avoid Social Profiles</h1>
      <Formik
        initialValues={{
          "owner.fullname": "",
        }}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}>
        <Form>
          <label className="mt-3" htmlFor="firstName">
            Felid 1
          </label>
          <Field
            style={{
              width: "100%",
              padding: "5px",
              border: "2px solid green",
              borderRadius: "10px",
            }}
            name="['owner.fullname']"
          />
          <button
            className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default NestedForm;
