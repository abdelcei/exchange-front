// OffersTable.jsx: Componente para mostrar y acciones de las ofertas en formato de tabla o lista.
// Proporciona una vista responsive para escritorio y móvil, con acciones configurables para cada oferta.
import { useState } from "react";
import { NavBarButton } from "../Header/Header";

// Headers de la tabla de ofertas
const OFFER_TABLE_HEADERS = [
  { id: "0", title: "Monedas" },
  { id: "1", title: "Precio" },
  { id: "2", title: "Cantidad" },
  { id: "3", title: "Descripción" },
  { id: "4", title: "Acciones" },
];

// Componente principal: Muestra las ofertas en una tabla o lista según el tamaño de la pantalla.
// Props:
// - offers: Lista de ofertas a mostrar.
// - actions: Acciones configurables para cada oferta.
export default function OffersDisplay({ offers, actions }) {
  return (
    <div className="mb-16 min-h-[75vh] w-full max-w-7xl overflow-x-auto rounded-2xl bg-gray-100">
      <div className="flex flex-col items-start justify-start lg:hidden">
        {offers &&
          offers.map((offer) => (
            <Offer key={offer._id} offer={offer} actions={actions} />
          ))}
      </div>
      <table className="hidden w-full lg:table">
        <TableHead>
          {OFFER_TABLE_HEADERS &&
            OFFER_TABLE_HEADERS.map((tableHeader) => (
              <TableHeader key={tableHeader.id} title={tableHeader.title} />
            ))}
        </TableHead>
        <tbody>
          {offers &&
            offers.map((offer) => (
              <TableOffer key={offer._id} offer={offer} actions={actions} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

// Componente: Encabezado de la tabla.
export function TableHead({ children }) {
  return (
    <thead className="bg-darkSlate-100">
      <tr>{children}</tr>
    </thead>
  );
}

// Componente: Encabezado de una columna de la tabla.
// Props:
// - title: Título del encabezado.
export function TableHeader({ title, classname }) {
  return (
    <th
      className={
        classname ||
        "py-4 pl-6 text-left text-sm font-medium uppercase text-black"
      }
    >
      {title}
    </th>
  );
}

// Componente: Fila de la tabla que representa una oferta.
// Props:
// - offer: Datos de la oferta.
// - actions: Acciones configurables para la oferta.
export function TableOffer({ offer, actions }) {
  const [activeOffer, setActiveOffer] = useState(null);

  return (
    <tr
      onMouseEnter={() => setActiveOffer(offer.id)}
      onMouseLeave={() => setActiveOffer(null)}
      className={activeOffer === offer.id ? "bg-darkSlate-200 " : ""}
    >
      <TableOfferPair
        currencyFrom={offer.currency_from}
        currencyTo={offer.currency_to}
      />
      <TableOfferRate rate={offer.rate} />
      <TableOfferAmounts
        amountMin={offer.amount_min}
        amountMax={offer.amount_max}
        currencyFrom={offer.currency_from}
      />
      <TableOfferDescription description={offer.description} />
      <TableOfferAction actions={actions} offer={offer} />
    </tr>
  );
}

// Componente: Muestra las monedas del par de divisas.
export function TableOfferPair({ currencyFrom, currencyTo }) {
  return (
    <td className="py-4 pl-6 p-2 border-b border-darkSlate-200">
      <div className="mx-auto flex items-center gap-2 rounded-l-xl">
        <span className="font-medium">{currencyFrom}</span>
        <span className="text-gray-500">→</span>
        <span className="font-medium">{currencyTo}</span>
      </div>
    </td>
  );
}

// Componente: Muestra la tasa de cambio.
export function TableOfferRate({ rate }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <span className="inline-flex items-center rounded-full bg-darkSlate-100 px-2.5 py-0.5 text-sm font-medium text-darkSlate-800">
        {rate.toFixed(2)}
      </span>
    </td>
  );
}

// Componente: Muestra el rango de cantidades disponibles.
export function TableOfferAmounts({ amountMin, amountMax, currencyFrom }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <div className="flex items-center gap-1">
        <span>{amountMin.toLocaleString()}</span>
        <span className="text-gray-500">-</span>
        <span>{amountMax.toLocaleString()}</span>
        <span className="ml-1 text-gray-500">{currencyFrom}</span>
      </div>
    </td>
  );
}

// Componente: Muestra la descripción de la oferta.
export function TableOfferDescription({ description }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <p className="line-clamp-2">{description}</p>
    </td>
  );
}

// Componente: Muestra las acciones disponibles para la oferta.
// Props:
// - actions: Lista de acciones.
// - offer: Datos de la oferta.
export function TableOfferAction({ actions, offer }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <div className="flex flex-row items-center gap-2">
        {actions.map((action) => (
          <TableActionButton key={action.name} action={action} offer={offer}>
            {action.name}
          </TableActionButton>
        ))}
      </div>
    </td>
  );
}

// Componente: Botón para realizar una acción específica sobre una oferta.
// Props:
// - action: Acción/funcion.
// - offer: Datos de la oferta.
export function TableActionButton({ action, classname, color, offer }) {
  const finalColor = action.color || color || "gray";

  return (
    <NavBarButton
      onClick={() => action.handler(offer)}
      title={action.name}
      color={finalColor}
      className={classname}
    />
  );
}

// Componente: Vista móvil para una oferta.
export function Offer({ offer, actions }) {
  return (
    <div
      key={offer._id}
      className="flex w-full flex-col items-start justify-start gap-2 rounded-2xl border-b border-gray-500  p-2 pb-4 md:px-4"
    >
      <div className="items-bas flex w-full flex-row justify-between gap-0 md:flex-col md:gap-3">
        <div className="flex flex-row items-center justify-start gap-2 md:items-start">
          <OfferPair
            currencyFrom={offer.currency_from}
            currencyTo={offer.currency_to}
          />
          <OfferRate rate={offer.rate} />
        </div>
        <div className="flex flex-col justify-start">
          <span className="text-xs text-gray-400">Cantidad disponible:</span>
          <OfferAmounts
            amountMin={offer.amount_min}
            amountMax={offer.amount_max}
            currencyFrom={offer.currency_from}
          />
        </div>
      </div>
      <div>
        <span className="text-xs text-gray-400">Descripción:</span>
        <OfferDescription description={offer.description} />
      </div>
      <OfferAction actions={actions} offer={offer} />
    </div>
  );
}

// Componente: Representa el par de monedas para la vista móvil.
// Props:
// - currencyFrom: Moneda de origen.
// - currencyTo: Moneda de destino.
export function OfferPair({ currencyFrom, currencyTo }) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <span className="font-medium">{currencyFrom}</span>
      <span className="text-gray-500">→</span>
      <span className="font-medium">{currencyTo}</span>
    </div>
  );
}

// Componente: Representa la tasa de cambio en la vista móvil.
// Props:
// - rate: Valor de la tasa de cambio.
export function OfferRate({ rate }) {
  return (
    <span className="rounded-full bg-darkSlate-100 px-2.5 py-0.5 text-sm font-medium text-darkSlate-800">
      {rate.toFixed(2)}
    </span>
  );
}

// Componente: Representa el rango de cantidades disponibles en la vista móvil.
// Props:
// - amountMin: Cantidad mínima disponible.
// - amountMax: Cantidad máxima disponible.
// - currencyFrom: Moneda asociada a las cantidades.
export function OfferAmounts({ amountMin, amountMax, currencyFrom }) {
  return (
    <div className="text- flex items-center gap-1 text-sm font-medium">
      <span>{amountMin.toLocaleString()}</span>
      <span className="text-gray-500">-</span>
      <span>{amountMax.toLocaleString()}</span>
      <span>{currencyFrom}</span>
    </div>
  );
}

// Componente: Muestra la descripción de la oferta en la vista móvil.
// Props:
// - description: Texto descriptivo de la oferta.
export function OfferDescription({ description }) {
  return <p className="text-sm">{description}</p>;
}

// Componente: Acciones asociadas a una oferta en la vista móvil.
// Props:
// - actions: Lista de acciones.
// - offer: Datos de la oferta.
export function OfferAction({ actions, offer }) {
  return (
    <div className="flex flex-row items-center gap-2 self-end">
      {actions.map((action) => (
        <ActionButton key={action.name} action={action} offer={offer}>
          {action.name}
        </ActionButton>
      ))}
    </div>
  );
}

// Componente: Botón para ejecutar una acción en la vista móvil.
// Props:
// - action: Objeto de la acción (nombre, handler/función).
// - offer: Datos de la oferta a la que se aplicará la acción.
// - color: Color del botón (opcional).
export function ActionButton({ action, children, color, offer }) {
  const finalColor = action.color || color || "gray";

  const colorClasses = {
    green:
      "bg-emeraldGreen-500 hover:bg-emeraldGreen-700 active:bg-emeraldGreen-500",
    blue: "bg-darkSlate-500 hover:bg-darkSlate-700 active:bg-darkSlate-500",
    red: "bg-crimsonRose-500 hover:bg-crimsonRose-700 active:bg-crimsonRose-500",
    gray: "bg-gray-500 hover:bg-gray-700 active:bg-gray-500",
  };

  const finalClassName = ` text-white rounded-full px-4 py-2 text-sm font-medium ${
    colorClasses[finalColor]
  }`;

  if (!children) return null;

  return (
    <button onClick={() => action.handler(offer)} className={finalClassName}>
      {children}
    </button>
  );
}
