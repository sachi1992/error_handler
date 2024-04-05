import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";

// Configure Axios to retry failed requests
axiosRetry(axios, { retries: 3 }); // Retry 3 times before giving up

const ApiRetry: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      //   Example of making a request with retry
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchData2 = async () => {
    try {
      axios.get("http://example.com/test").then((result) => {
        console.log(result.data); // 'ok'
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData2();
    fetchData();
  }, []); // Run only once on component mount

  // Exponential back-off retry delay between requests
  axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

  // Custom retry delay
  axiosRetry(axios, {
    retryDelay: (retryCount: number) => {
      return retryCount * 1000;
    },
  });

  // Works with custom axios instances
  const client = axios.create({ baseURL: "http://example.com" });
  axiosRetry(client, { retries: 3 });

  // Example of making a request with a custom axios instance and retry
  client.get("/test").then((result) => {
    console.log(result.data); // 'ok'
  });

  // Allows request-specific configuration
  client
    .get("/test", {
      "axios-retry": {
        retries: 0,
      },
    })
    .catch((error) => {
      // The first request fails
      console.error(error);
    });

  return (
    <div>
      {error ? (
        <FallbackComponent />
      ) : data ? (
        <DisplayDataComponent data={data} />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

const FallbackComponent: React.FC = () => {
  return (
    <div>
      <p>Something went wrong. Please try again later.</p>
      {/* You can provide a button to retry the API call */}
      {/* <button onClick={retry}>Retry</button> */}
    </div>
  );
};

const DisplayDataComponent: React.FC<{ data: any }> = ({ data }) => {
  return <div>{/* Display data */}</div>;
};

const LoadingComponent: React.FC = () => {
  return <p>Loading...</p>;
};

export default ApiRetry;
