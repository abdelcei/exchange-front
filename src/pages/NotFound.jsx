import { NavBarButton } from "../components/Header/Header";
import ExchangeRates from "../components/ExchangeRates/ExchangeRates";

export default function NotFound() {

  return (
    <div className="h-[calc(100vh-10rem)] w-full bg-home-banner bg-cover bg-center">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-6 text-center lg:max-w-7xl lg:flex-row lg:justify-evenly lg:pl-14 lg:text-left xl:justify-between">
        <div className="flex w-11/12 flex-col items-center justify-center gap-4 text-white lg:items-start">
          <h1 className="w-full text-6xl font-extrabold uppercase tracking-normal text-crimsonRose-500 md:text-[5.5rem] lg:w-4/5 lg:text-[6rem] xl:w-full xl:text-[6.5rem] xl:leading-[7.25rem]">
            Error 404
          </h1>
          <h2 className="w-4/5 font-nokora text-lg font-medium md:w-4/6 md:text-xl lg:w-4/5 lg:text-left lg:text-2xl">
            Lo sentimos, no sabemos a donde quieres ir pero aún asi mira a
            cuanto esta el cambio hoy.
          </h2>
          <NavBarButton
            className=""
            to={"/"}
            title={"Regresa a la página de Inicio"}
          >
            Regresa a la página de Inicio
          </NavBarButton>
                  </div>
        <ExchangeRates />
      </div>
    </div>
  );
}
