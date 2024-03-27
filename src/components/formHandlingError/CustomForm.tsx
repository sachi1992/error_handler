import { useEffect, useState } from "react";
import {
  IValidationType,
  ErrorHandler,
  IInputConfig,
  CustomError,
} from "../../errorHandler";
import { useErrorBoundary } from "react-error-boundary";
import CForm from "./CForm";

function CustomForm(): JSX.Element {
  const { showBoundary } = useErrorBoundary();

  const inputConfig: IInputConfig[] = [
    {
      label: "Username",
      name: "loginUserName",
      isValidate: true,
      validationType: [IValidationType.Required],
      inputType: "text",
    },
    {
      label: "Organization Number",
      name: "organizationNumber",
      isValidate: true,
      validationType: [IValidationType.Required, IValidationType.Org],
      inputType: "text",
    },
    {
      label: "City",
      name: "city",
      isValidate: true,
      validationType: [IValidationType.Required, IValidationType.CityCode],
      inputType: "text",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      isValidate: true,
      validationType: [IValidationType.Required, IValidationType.Phone],
      inputType: "text",
    },
    {
      label: "Email Address",
      name: "emailAddress",
      isValidate: true,
      validationType: [IValidationType.Required, IValidationType.Email],
      inputType: "email",
    },
    {
      label: "User Type",
      name: "userType",
      isValidate: true,
      validationType: [IValidationType.Required],
      inputType: "select",
      options: [
        { name: "Admin", value: "admin" },
        { name: "Client", value: "client" },
        { name: "User", value: "user" },
      ],
    },
  ];

  const [userFormObject, setUserFormObject] = useState({
    loginUserName: "amanda",
    organizationNumber: "",
    address: "",
    city: "",
    phoneNumber: "",
    did: "",
    emailAddress: "",
    userType: "",
  });

  useEffect(() => {
    setUserFormObject(userFormObject);
  }, [userFormObject]);

  // Handle form submit
  const handleSubmit = () => {
    const errorMessage = "An error occurred during form submission.";
    const error = new CustomError("formValidation", errorMessage);
    showBoundary(error);
    // throw new Error(errorMessage);
  };

  return (
    <>
      <div className="text-sky-400 text-lg font-semibold">
        Show Form Validation Error
      </div>
      <ErrorHandler>
        <CForm
          inputConfig={inputConfig}
          onSubmit={handleSubmit}
          initialValueObject={userFormObject}
        />
      </ErrorHandler>
    </>
  );
}

export default CustomForm;
