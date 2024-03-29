import * as Yup from "yup";
import { toast } from "react-toastify";

const ObjectValidationFail = (): JSX.Element => {
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
    <div className="py-4">
      API error return object without correct values
      <br />
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={onClickButton}>
        Generate API Error Toast
      </button>
    </div>
  );
};

export default ObjectValidationFail;
