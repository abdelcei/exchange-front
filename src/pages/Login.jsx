import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const { VITE_API_URL } = import.meta.env;
const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const user = useRef();
  const pass = useRef();

  const [credentials, setCredentials] = useState(null);
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    setResult({ ...result, loading: true });

    const { current: userInput } = user;
    const { current: passInput } = pass;

    try {
      if (containsAtSymbol(userInput.value)) {
        if (!isValidEmail(userInput.value)) {
          throw new Error(`Error! Email no valido`);
        }
      }
      setCredentials({ user: userInput.value, pass: passInput.value });
    } catch (error) {
      setResult({ data: null, error, loading: false });
    }
  };

  useEffect(() => {
    if (!credentials) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      const resquestOptions = {
        signal: abortController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      try {
        const response = await fetch(BASE_API_URL + "/login", resquestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setResult({ data, error: null, loading: false });

        if (data && data.id) {
          login(data);
          navigate(`/user`);
        }
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
  }, [credentials, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-darkSlate-200/20 md:gap-4">
      <h1 className="text-2xl font-semibold text-darkSlate-500">
        Iniciar sesión
      </h1>
      <form
        className="flex w-11/12 max-w-xl flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 shadow-lg"
        onSubmit={loginSubmit}
      >
        <div className="w-full">
          <label className="mb-2 block font-medium" htmlFor="user">
            Usuario:
          </label>
          <input
            className="w-full rounded-2xl border border-darkSlate-500 p-4 focus:border-darkSlate-700"
            type="text"
            name="user"
            placeholder="Nombre de usuario o e-mail"
            id="user"
            ref={user}
            required
          />
        </div>
        <div className="w-full">
          <label
            className="mb-2 block font-medium text-black"
            htmlFor="dropdownCFrom"
          >
            Contraseña
          </label>
          <input
            className="w-full rounded-2xl border border-darkSlate-500 p-4 focus:border-darkSlate-700"
            type="password"
            name="pass"
            placeholder="Contraseña"
            id="pass"
            ref={pass}
            required
          />
        </div>
        <button
          className="w-full rounded-full bg-emeraldGreen-500 px-6 py-4 text-[1rem] font-medium text-white hover:bg-emeraldGreen-700 active:bg-emeraldGreen-500"
          type="submit"
          disabled={result.loading}
        >
          {result.loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      {result.error && (
        <div className="text-red-500">{result.error.message}</div>
      )}
    </div>
  );
}

function containsAtSymbol(str) {
  return str.includes("@");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
