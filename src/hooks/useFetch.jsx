// useFetch.jsx: Hook personalizado para realizar peticiones HTTP.
// Permite realizar peticiones GET o configurables a una URL específica y manejar su estado (loading, data, error).

import { useEffect, useState } from "react";

// Constante de configuración para la API.
// Usa una variable de entorno para definir la URL base de la API.
const { VITE_API_URL } = import.meta.env;
const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

// Hook personalizado: useFetch
// Parámetros:
// - url: Ruta relativa para realizar la petición (string).
// - options: Opciones adicionales para la configuración de la petición (objeto).
// Retorna:
// - result: Objeto con el estado de la peticion data, error y loading.
export default function useFetch(url, options = {}) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {

    if (!url) return;
    const abortController = new AbortController();

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
    // Dependencias: URL y opciones de la petición.
  }, [url, JSON.stringify(options)]);

  return result;
}
