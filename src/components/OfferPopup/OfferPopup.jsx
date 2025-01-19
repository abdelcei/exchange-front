// OfferPopup.jsx: Componente para crear o editar ofertas de intercambio de divisas.
// Formulario para ingresar los detalles de la oferta.
import { useContext, useRef, useState } from "react";
import { CURRENCIES } from "../../constants/currencies";
import { NavBarButton } from "../Header/Header";
import { UserContext } from "../../context/UserContext";

// Variable de entorno de acceso a la API.
const { VITE_API_URL } = import.meta.env;
const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

//Componente principal del Header
// Estado global del usuario autenticado.
// Props
// offer Oferta en cuestion
// setUserOffersState Estado de las ofertas
// onClose Funcion visibilidad al componente
//
export function OfferPopup(props) {
  const { user: userLogged} = useContext(UserContext);
  const { offer, setUserOffersState, onClose } = props;
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: false,
  });

  // Determina si se está editando una oferta existente o creando una nueva.
  const isUpdating = Boolean(Object.keys(offer).length);

  const initialValues = offer
    ? {
        currencyFrom: offer.currency_from,
        currencyTo: offer.currency_to,
        amountMin: offer.amount_min,
        amountMax: offer.amount_max,
        rate: offer.rate,
        description: offer.description,
      }
    : {
        currencyFrom: "",
        currencyTo: "",
        amountMin: "",
        amountMax: "",
        rate: "",
        description: "",
      };

  const currencyFrom = useRef();
  const currencyTo = useRef();
  const amountMin = useRef();
  const amountMax = useRef();
  const rate = useRef();
  const description = useRef();

  // Maneja la creación o edición de la oferta.
  const handleOfferCreate = async (e) => {
    e.preventDefault();

    const { current: currencyFromInput } = currencyFrom;
    const { current: currencyToInput } = currencyTo;
    const { current: amountMinInput } = amountMin;
    const { current: amountMaxInput } = amountMax;
    const { current: rateInput } = rate;
    const { current: descriptionInput } = description;


    const offerNew = {
      id: offer._id,
      creator_id: userLogged,
      currency_from: currencyFromInput.value,
      currency_to: currencyToInput.value,
      amount_min: amountMinInput.value,
      amount_max: amountMaxInput.value,
      rate: rateInput.value,
      description: descriptionInput.value,
    };

    setResult({ ...result, loading: true });

    const abortController = new AbortController();

    const resquestOptions = {
      signal: abortController.signal,
      method: isUpdating ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerNew),
    };

    try {
      const response = await fetch(BASE_API_URL + "/offer", resquestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setResult({ data, error: null, loading: false });

      if (data) {
        setUserOffersState(data);
      }

      onClose();

    } catch (error) {
      if (error.name !== "AbortError") {
        setResult({ data: null, error, loading: false });
      }
    } finally {
      () => abortController.abort();
    }

      
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-darkSlate-200/70">
      <div className="flex w-11/12 max-w-2xl flex-col items-center justify-center gap-2 md:gap-4">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className="text-2xl font-semibold text-darkSlate-500">
            {isUpdating ? "Editar" : "Publicar"} oferta
          </h3>
          <NavBarButton title="Cerrar" color="gray" onClick={onClose}>
            Cerrar
          </NavBarButton>
        </div>
        <form
          className="grid w-full grid-cols-1 gap-2 rounded-2xl bg-white p-4 shadow-lg sm:grid-cols-2 md:gap-4"
          onSubmit={handleOfferCreate}
        >
          <div className="col-span-1 flex flex-col items-start justify-start gap-2">
            <label className="font-medium" htmlFor="dropdownCFrom">
              Que tiene:
            </label>
            <select
              id="dropdownCF"
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              ref={currencyFrom}
              required
              defaultValue={isUpdating ? initialValues.currencyFrom : ""}
            >
              <option value="">Moneda que tiene</option>
              {CURRENCIES.map((currency) => (
                <option
                  key={currency.value}
                  value={currency.value}
                  disabled={
                    currencyTo.current
                      ? currencyTo.current.value == currency.value
                      : false
                  }
                >
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="mb-2 block font-medium" htmlFor="dropdownCFrom">
              Que quiere:
            </label>
            <select
              id="dropdownCT"
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              ref={currencyTo}
              required
              defaultValue={isUpdating ? initialValues.currencyTo : ""}
            >
              <option value="">Moneda que quiere</option>
              {CURRENCIES.map((currency) => (
                <option
                  key={currency.value}
                  value={currency.value}
                  disabled={
                    currencyTo.current
                      ? currencyFrom.current.value == currency.value
                      : false
                  }
                >
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="mb-2 block font-medium">Cantidad Min:</label>
            <input
              type="number"
              step="any"
              ref={amountMin}
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              required
              defaultValue={isUpdating ? initialValues.amountMin : ""}
            />
          </div>
          <div className="col-span-1">
            <label className="mb-2 block font-medium">Cantidad Máx:</label>
            <input
              type="number"
              step="any"
              ref={amountMax}
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              required
              defaultValue={isUpdating ? initialValues.amountMax : ""}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="mb-2 block font-medium">Precio:</label>
            <input
              type="number"
              step="any"
              ref={rate}
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              required
              defaultValue={isUpdating ? initialValues.rate : ""}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="mb-2 block font-medium">Descripción:</label>
            <textarea
              ref={description}
              rows="4"
              className="w-full rounded-2xl border border-darkSlate-500 p-2.5 focus:border-darkSlate-200"
              required
              defaultValue={isUpdating ? initialValues.description : ""}
            />
          </div>
          <button
            type="submit"
            className="sm:col-span-2 w-full rounded-full justify-self-center bg-emeraldGreen-500 px-6 py-3 text-[1rem] font-medium text-white hover:bg-emeraldGreen-700 active:bg-emeraldGreen-500"
          >
            {isUpdating ? "Editar" : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
}