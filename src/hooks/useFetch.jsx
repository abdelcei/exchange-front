import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

export default function useFetch(url, options = {}) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    console.log("FETCH");

    if (!url) return;
    const abortController = new AbortController();

    console.log(BASE_API_URL + url);

    const fetchData = async () => {
      const resquestOptions = { ...options, signal: abortController.signal };

      try {
        const response = await fetch(BASE_API_URL + url, resquestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setResult({ data, error: null, loading: false });
      } catch (error) {
        if (error.name !== "AbortError") {
          setResult({ data: null, error, loading: false });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, JSON.stringify(options)]);

  return result;
}
