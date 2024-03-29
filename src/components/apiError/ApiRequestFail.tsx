//  need to add common form elements file
import { useErrorBoundary } from "react-error-boundary";

const ApiRequestFail = (): JSX.Element => {
  const { showBoundary } = useErrorBoundary();

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
        // Display error message to the user
        console.error("Error:", error.message);
        showBoundary(error);
      });
  };

  const onClickButton = (e: any) => {
    e.preventDefault();
    apiRequest();
  };

  return (
    <div className="py-4">
      API request error
      <br />
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={onClickButton}>
        Click to generate
      </button>
    </div>
  );
};

export default ApiRequestFail;
