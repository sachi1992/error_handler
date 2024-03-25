import { CForm, ValidationType, ErrorHandler } from "../errorHandler";

function CustomForm(): JSX.Element {
  return (
    <ErrorHandler>
      <CForm
        inputConfig={[
          {
            label: "Check User",
            name: "isUser",
            isValidate: true,
            validationType: [ValidationType.Required],
            inputType: "checkbox",
          },
          {
            label: "Username",
            name: "loginUserName",
            isValidate: true,
            validationType: [ValidationType.Required, ValidationType.Url],
            inputType: "text",
          },
          {
            label: "URL",
            name: "url",
            isValidate: true,
            validationType: [ValidationType.Url],
            inputType: "text",
          },
          {
            label: " Organization Number",
            name: "organizationNumber",
            isValidate: true,
            validationType: [ValidationType.Required, ValidationType.Org],
            inputType: "text",
          },
          {
            label: " City",
            name: "city",
            isValidate: true,
            validationType: [ValidationType.Required, ValidationType.CityCode],
            inputType: "text",
          },
          {
            label: "Phone Number",
            name: "phoneNumber",
            isValidate: true,
            validationType: [ValidationType.Required, ValidationType.Phone],
            inputType: "text",
          },
          {
            label: " Email Address",
            name: "emailAddress",
            isValidate: true,
            validationType: [ValidationType.Required, ValidationType.Email],
            inputType: "email",
          },
          {
            label: "User Type",
            name: "userType",
            isValidate: true,
            validationType: [ValidationType.Required],
            inputType: "select",
            options: [
              { name: "Admin", value: "admin" },
              { name: "Client", value: "client" },
              { name: "User", value: "user" },
            ],
          },
        ]}
      />
    </ErrorHandler>
  );
}

export default CustomForm;
