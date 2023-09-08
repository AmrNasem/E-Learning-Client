import { useState } from "react";
import { backend } from "../App";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({ endPoint, body, method = "GET" }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backend}/${endPoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
