import { useEffect, useState } from "react";
import {
  CForm,
  IValidationType,
  ErrorHandler,
  IInputConfig,
} from "../../errorHandler";

function CustomForm(): JSX.Element {
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
    loginUserName: "",
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
    // Add form submission logic here
    // If there's an error, show it as a toast message
    const errorMessage = "An error occurred during form submission.";
    // toast.error(errorMessage);
  };

  return (
    <ErrorHandler>
      <CForm
        inputConfig={inputConfig}
        onSubmit={handleSubmit}
        initialValueObject={userFormObject}
      />
    </ErrorHandler>
  );
}

export default CustomForm;
