import { useState } from "react";
import { NavBarButton } from "../Header/Header";

const OFFER_TABLE_HEADERS = [
  { id: "0", title: "Monedas" },
  { id: "1", title: "Precio" },
  { id: "2", title: "Cantidad" },
  { id: "3", title: "Descripción" },
  { id: "4", title: "Acciones" },
];

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

export function TableHead({ children }) {
  return (
    <thead className="bg-darkSlate-100">
      <tr>{children}</tr>
    </thead>
  );
}

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

export function TableOfferRate({ rate }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <span className="inline-flex items-center rounded-full bg-darkSlate-100 px-2.5 py-0.5 text-sm font-medium text-darkSlate-800">
        {rate.toFixed(2)}
      </span>
    </td>
  );
}

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

export function TableOfferDescription({ description }) {
  return (
    <td className="border-b border-darkSlate-200 p-2 py-4 pl-6">
      <p className="line-clamp-2">{description}</p>
    </td>
  );
}

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

export function OfferPair({ currencyFrom, currencyTo }) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <span className="font-medium">{currencyFrom}</span>
      <span className="text-gray-500">→</span>
      <span className="font-medium">{currencyTo}</span>
    </div>
  );
}
export function OfferRate({ rate }) {
  return (
    <span className="rounded-full bg-darkSlate-100 px-2.5 py-0.5 text-sm font-medium text-darkSlate-800">
      {rate.toFixed(2)}
    </span>
  );
}
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
export function OfferDescription({ description }) {
  return <p className="text-sm">{description}</p>;
}
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
