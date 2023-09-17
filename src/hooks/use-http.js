import { useCallback, useState } from "react";
import { backend } from "../App";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      {
        endPoint,
        body,
        headers,
        stringify = false,
        method = "GET",
        credentials = "include",
      },
      applyData
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backend}/${endPoint}`, {
          method,
          headers: headers
            ? headers
            : {
                "Content-Type": "application/json",
              },
          credentials,
          body: body ? (stringify ? body : JSON.stringify(body)) : null,
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
