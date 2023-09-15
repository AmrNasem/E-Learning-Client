import { useCallback, useState } from "react";
import { backend } from "../App";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      { endPoint, body, method = "GET", credentials = "include" },
      applyData
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backend}/${endPoint}`, {
          method,
          headers: method
            ? {
                "Content-Type": "application/json",
              }
            : {},
          credentials,
          body: body ? JSON.stringify(body) : null,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        applyData(data.payload);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
