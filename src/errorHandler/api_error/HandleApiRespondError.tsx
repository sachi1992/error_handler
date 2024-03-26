import { useEffect } from "react";

import { useErrorBoundary } from "react-error-boundary";
import { object, number, boolean, string, date } from "yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const HandleApiRespondError = (): JSX.Element => {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    // sentry
    // setTimeout(() => {
    //   // const error = new CustomError("formValidation", "crash Example1 page");
    //   // showBoundary(error);
    //   throw new Error("crash Example1 page>>>>>");
    // }, 2);
    // checkValid();
    // apiRequest();
  }, []);

  const checkValid = async () => {
    const schema = object({
      isBig: boolean(),
      count: number().when("isBig", (isBig, schema) => {
        return isBig ? schema.min(5) : schema.min(0);
      }),
    });

    // Validate data against the schema
    schema
      .validate({ isBig: false, count: "6" })
      .then((ab) => {
        console.log("🚀 ~ useEffect ~ ab:", ab);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });

    // Define user schema
    const userSchema = object({
      name: string().required(),
      age: number().required().positive().integer(),
      email: string().email(),
      website: string().url().nullable(),
      createdOn: date().default(() => new Date()),
    });

    // Simulate fetching user data and validate against user schema
    const fetchUser = async () => {
      // Simulated user data
      return {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        website: "https://example.com",
        createdOn: new Date(),
      };
    };

    // Parse and validate user data
    fetchUser()
      .then((user) => userSchema.validate(user))
      .then((validUser) => {
        console.log("🚀 ~ checkValid ~ user:", validUser);
      })
      .catch((error) => {
        console.error("User data validation failed:", error);
      });
    // const getError = () => {
    //   setTimeout(() => {
    //     throw new Error("crash Example1 page>>>>>");
    //   }, 2);
    // };
  };

  const apiRequest = async () => {
    fetch("https://api.example.com/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful API response
        console.log(data);
      })
      .catch((error: any) => {
        // Handle API errors
        console.error("Error:", error.message);
        showBoundary(error);
        // Display error message to the user
        // alert("An error occurred while fetching data from the API.");
      });
  };

  const apiResponseSchema = Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  const apiResponse = {
    id: "",
    name: "John Doe",
    email: "john@example.com",
  };

  const validateAPIreturn = () => {
    apiResponseSchema
      .validate(apiResponse)
      .then((validatedResponse) => {
        // If validation succeeds, handle the validated response
        console.log("Validated Response:", validatedResponse);
      })
      .catch((validationError) => {
        // If validation fails, handle the validation error
        console.error("Validation Error:", validationError.message);
        // showBoundary(validationError);
        toast.error(validationError.message);
        // Handle error display or other error handling logic
      });
  };

  const onClickButton = (e: any) => {
    e.preventDefault();
    validateAPIreturn();
  };

  return (
    <div>
      API error
      <button onClick={onClickButton}>get Api error</button>
    </div>
  );
};

export default HandleApiRespondError;
