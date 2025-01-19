import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CURRENCIES } from "../constants/currencies";
import useFetch from "../hooks/useFetch";
import OffersDisplay from "../components/OffersTable/OffersTable";

const { VITE_API_URL } = import.meta.env;

const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

export default function Offers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currencyFrom = useRef();
  const currencyTo = useRef();
  const amountValue = useRef();


  const { data: offers } = useFetch(`/offers?${searchParams.toString()}`);

  const actions = [
    {
      name: "Contactar",
      handler: (offer) => handleOfferView(offer.creator_id),
    },
  ];

  const handleOfferView = (offerCreatorId) => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const resquestOptions = { signal: abortController.signal };
      try {
        const response = await fetch(
          BASE_API_URL + "/user/" + offerCreatorId,
          resquestOptions,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return window.open(
          `https://t.me/${data.tg_handle}`,
          "_blank",
          "noopener,noreferrer",
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          // setResult({ data: null, error, loading: false });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  };
  
  const onChangedField = (field, value) => {

    const newParams = new URLSearchParams(searchParams);
    newParams.set(field, value);
    setSearchParams(newParams)
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (amountValue.current.value)
    onChangedField("amount", amountValue.current?.value);
  };
  
  return (
    <>
      <SectionOffersBanner></SectionOffersBanner>

      <div className="min-h-[50vh] w-full bg-darkSlate-500">
        <div className="mx-auto flex w-11/12 flex-col items-center justify-start">
          <form
            className="mx-auto my-6 grid min-h-10 w-full max-w-7xl grid-cols-2 items-start justify-start gap-4 text-white lg:grid-cols-8"
            onSubmit={handleFormSubmit}
          >
            <FormGridElement>
              <label className="font-medium" htmlFor="dropdownCFrom">
                Que tienes:
              </label>
              <select
                id="dropdownCFrom"
                className="w-full rounded-2xl border border-white bg-transparent p-2.5 text-white"
                ref={currencyFrom}
                defaultValue={searchParams.get("currencyFrom") || ""}
                onChange={() => {
                  onChangedField("currencyFrom", currencyFrom.current?.value);
                }}
              >
                <option className="text-black" value="">
                  Cualquiera
                </option>
                {CURRENCIES.map((currency) => (
                  <option
                    className="text-black"
                    key={currency.value}
                    value={currency.value}
                    disabled={
                      currencyTo.current
                        ? currencyTo.current?.value == currency.value
                        : false
                    }
                  >
                    {currency.label}
                  </option>
                ))}
              </select>
            </FormGridElement>
            <FormGridElement>
              <label className="font-medium" htmlFor="dropdownCFrom">
                Que quieres:
              </label>
              <select
                id="dropdownCTo"
                className="w-full rounded-2xl border border-white bg-transparent p-2.5 text-white"
                ref={currencyTo}
                defaultValue={searchParams.get("currencyTo") || ""}
                onChange={() => {
                  onChangedField("currencyTo", currencyTo.current?.value);
                }}
              >
                <option className="text-black" value="">
                  Cualquiera
                </option>
                {CURRENCIES.map((currency) => (
                  <option
                    className="rounded-2xl text-black"
                    key={currency.value}
                    value={currency.value}
                    disabled={
                      currencyFrom.current
                        ? currencyFrom.current?.value == currency.value
                        : false
                    }
                  >
                    {currency.label}
                  </option>
                ))}
              </select>
            </FormGridElement>
            <FormGridElement>
              <label className="font-medium" htmlFor="amountValue">
                Cuánto quieres cambiar:
              </label>
              <input
                id="amountValue"
                step={1}
                type="number"
                ref={amountValue}
                defaultValue={searchParams.get("amount") || ""}
                className="w-full rounded-2xl border border-white bg-transparent p-2.5 text-white"
                placeholder="Cantidad"
              />
            </FormGridElement>
            <button type="submit"
              className="col-span-1 w-full self-end justify-self-end rounded-full bg-emeraldGreen-500 px-6 py-3 text-[1rem] font-medium text-white hover:bg-emeraldGreen-700 active:bg-emeraldGreen-500 lg:col-span-2 lg:max-w-32"
            >Buscar</button>
          </form>
          {offers && <OffersDisplay offers={offers} actions={actions} />}
        </div>
      </div>
    </>
  );
}

// export function PopupOfferView({ offer }) {
//   return <></>;
// }

export function SectionOffersBanner() {
  return (
    <div className="bg-offers-banner relative -z-10 h-[35vh] min-h-72 w-full bg-cover bg-bottom">
      <div className="absolute inset-0 -z-20 h-full w-full bg-black/50"></div>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-end">
        <h1 className="mx-auto mb-4 w-full text-center text-6xl font-medium text-white md:w-11/12 md:text-left md:text-8xl lg:w-full">
          Ofertas
        </h1>
      </div>
    </div>
  );
}

export function FormGridElement({ children }) {
  return (
    <>
      <div className="col-span-1 flex flex-col items-start justify-start gap-2 lg:col-span-2">
        {children}
      </div>
    </>
  );
}
