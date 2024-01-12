import { useEffect, useState } from "react";

const useFetch = <T>(url: string, body: T) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status > 399 && res.status < 200) {
          throw new Error("could not fetch data");
        }
        return res.json();
      })

      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
