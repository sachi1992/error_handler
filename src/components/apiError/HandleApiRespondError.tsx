import { useEffect } from "react";

import { object, number, boolean, string, date } from "yup";
import { toast } from "react-toastify";

const HandleApiRespondError = (): JSX.Element => {
  useEffect(() => {}, []);

  const checkValid = async () => {
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
        email: "john.doeexample.com",
        // email: "john.doe@example.com",
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
        toast.error(error.message);
      });
  };

  const onClickButton = (e: any) => {
    e.preventDefault();
    checkValid();
  };

  const checkLogicValid = async () => {
    const schema = object({
      isBig: boolean(),
      count: number().when("isBig", (isBig, schema) => {
        return isBig ? schema.min(5) : schema.min(0);
      }),
    });

    // Simulate fetching user data and validate against user schema
    const fetchUser = async () => {
      // Simulated user data
      return { isBig: true, count: 4 };
    };

    // Parse and validate user data
    fetchUser()
      .then((user) => schema.validate(user))
      .then((validUser) => {
        console.log("🚀 ~ checkValid :", validUser);
      })
      .catch((error) => {
        console.error("User data validation failed:", error);
        toast.error(error.message);
      });
  };

  const onClickButton2 = (e: any) => {
    e.preventDefault();
    checkLogicValid();
  };

  return (
    <div>
      API Return Object Error
      <br />
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={onClickButton}>
        API Return Object
      </button>
      <div className="py-4">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={onClickButton2}>
          API Return Object Logical Validation
        </button>
      </div>
    </div>
  );
};

export default HandleApiRespondError;
