// ExchangeRates.jsx: Componente para mostrar las tasas de cambio.
// Este componente muestra una lista de pares de divisas con sus tasas de compra y venta en relación a la moneda nacional.

import { EXCHANGE_RATE_PAIRS } from "../../constants/exchangeRatePairs";
import { flags } from "../../constants/flags";
import useFetch from "../../hooks/useFetch";

// Encabezados de la tabla de tasas de cambio.
const HEADINGS = [
  { id: "0", title: "Moneda" },
  { id: "1", title: "Compra" },
  { id: "2", title: "Venta" },
];

// Componente principal: Muestra la lista de tasas de cambio.
export default function ExchangeRates() {
  // Realiza la petición para obtener las tasas de cambio.
  const exchangeRatesResponse = useFetch("/rates");

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-4/5 max-w-[85vw] flex-col gap-2 rounded-2xl bg-white/60 p-4 md:max-w-[60vw] lg:max-w-[40vw]">
        <div className="flex w-full flex-row items-center justify-evenly rounded-2xl bg-emeraldGreen-400 lg:justify-between">
          <div className="flex w-1/3 flex-row items-center justify-start rounded-2xl lg:min-w-32">
            <span className="mx-auto py-2 text-lg lg:py-4 lg:text-xl">
              Moneda
            </span>
          </div>
          <div className="flex w-1/4 flex-row items-center justify-center rounded-2xl lg:min-w-32">
            <span className="mx-auto py-2 text-lg lg:py-4 lg:text-xl">
              Compra
            </span>
          </div>
          <div className="flex w-1/4 flex-row items-center justify-center rounded-2xl lg:min-w-32">
            <span className="mx-auto py-2 text-lg lg:py-4 lg:text-xl">
              Venta
            </span>
          </div>
        </div>
        {exchangeRatesResponse &&
          EXCHANGE_RATE_PAIRS.map((ratePair) => (
            <CurrencyPair
              key={ratePair.title}
              exchangeRates={exchangeRatesResponse}
              ratePair={ratePair}
            />
          ))}
        <span className="text-center text-sm">
          Todos las tasas están en relación a la MN.
        </span>
      </div>
    </div>
  );
}

// Componente: Encabezados de la tabla de tasas de cambio.
// Props:
// - heading: Objeto que contiene el título del encabezado.
export function ExchangeRatesHeading({ heading }) {
  return (
    <div className="flex flex-row items-center justify-center rounded-2xl lg:w-1/4 lg:min-w-32">
      <span className="mx-auto py-2 text-lg lg:py-4 lg:text-xl">
        {heading.title}
      </span>
    </div>
  );
}

// Componente: Representa un par de divisas con sus tasas de compra y venta.
// Props:
// - exchangeRates: Datos de las tasas de cambio.
// - ratePair: Par de divisas.
export function CurrencyPair({ exchangeRates, ratePair }) {
  return (
    <div className="flex w-full flex-row gap-2">
      <div className="flex w-full flex-row items-center justify-evenly rounded-2xl bg-emeraldGreen-200">
        <div className="flex w-1/3 flex-row items-center justify-center gap-2 lg:min-w-32">
          <img
            src={flags[ratePair.title].src}
            className="w-9 rounded-lg py-4 lg:w-10"
          />
          <span className="text-[1.25rem]">{ratePair.name}</span>
        </div>
        <div className="flex w-1/4 flex-row items-center justify-center rounded-2xl lg:min-w-32">
          <CurrencyRate
            exchangeRates={exchangeRates}
            currencyFrom="MN"
            currencyTo={ratePair.title}
          />
        </div>
        <div className="flex w-1/4 flex-row items-center justify-center rounded-2xl lg:min-w-32">
          <CurrencyRate
            exchangeRates={exchangeRates}
            currencyFrom={ratePair.title}
            currencyTo="MN"
          />
        </div>
      </div>
    </div>
  );
}

// Componente: Muestra una tasa de cambio específica.
// Props:
// - exchangeRates: Datos de las tasas de cambio.
// - currencyFrom: Moneda de origen.
// - currencyTo: Moneda de destino.
export function CurrencyRate({ exchangeRates, currencyFrom, currencyTo }) {
  const { data: ratios, error, loading } = exchangeRates;

  if (error) {
    console.error("Fetch error:", error);
    return <div>Error: {error.message}</div>;
  }
  if (!ratios || !ratios[currencyFrom]) return <div>No data</div>;

  return (
    <>
      {loading ? (
        <span>Loading</span>
      ) : (
        ratios && (
          <span className="py-4 text-center text-xl lg:text-2xl">
            {ratios[currencyFrom][currencyTo]}
          </span>
        )
      )}
    </>
  );
}
