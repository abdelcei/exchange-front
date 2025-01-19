import { NavBarButton } from "../components/Header/Header";
import ExchangeRates from "../components/ExchangeRates/ExchangeRates";

const HOW_IT_WORKS = [
  {
    id: "0",
    title: "Paso 1",
    number: "1",
    description: "Consulta<br/>la tasa justa.",
    src: "/imgs/como-funciona-mira-la-tasa.webp",
    alt: "Como funciona, averigua las tasas en el agro",
  },
  {
    id: "1",
    title: "Paso 2",
    number: "2",
    description: "Explora o publica ofertas.",
    src: "/imgs/como-funciona-averigua-ofertas.webp",
    alt: "Como funciona, averigua las ofertas en el domino",
  },
  {
    id: "2",
    title: "Paso 3",
    number: "3",
    description: "Contacta directamente con los vendedores.",
    src: "/imgs/como-funciona-contacta.webp",
    alt: "Como funciona, echale una llamada",
  },
];

export default function Home() {
  return (
    <>
      <SectionHomeTwoElements />
      <SectionHowItWorks />
    </>
  );
}

export function SectionHomeTwoElements() {
  return (
    <div className="h-screen w-full bg-home-banner bg-cover bg-center">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-6 text-center lg:max-w-7xl lg:flex-row lg:justify-evenly lg:pl-14 lg:text-left xl:justify-between">
        <div className="flex w-11/12 flex-col items-center justify-center gap-4 text-white lg:items-start">
          <h1 className="w-full text-6xl font-extrabold uppercase tracking-normal md:text-[5.5rem] lg:w-4/5 lg:text-[6rem] xl:w-full xl:text-[6.5rem] xl:leading-[7.25rem]">
            A cuánto
            <br />
            está <span className="text-crimsonRose-500">hoy</span>?
          </h1>
          <h2 className="w-4/5 font-nokora text-lg font-medium md:w-4/6 md:text-xl lg:w-4/5 lg:text-left lg:text-2xl">
            Quieres comprar, vender, estás en el invento, pues aquí puedes ver
            oferticas y ver que vas a hacer.
          </h2>
          <NavBarButton
            className=""
            to={"/offers"}
            title={"Mira las ofertas"}
          />
        </div>
        <ExchangeRates />
      </div>
    </div>
  );
}

export function SectionHowItWorks() {
  return (
    <div className="min-h-screen w-full bg-white lg:pt-28">
      <div className="relative mx-auto flex min-h-[60vh] w-full flex-col items-center justify-start gap-6 bg-darkSlate-500 py-10 lg:max-w-[90vw] lg:rounded-3xl">
        <h2 className="text-center text-6xl font-bold uppercase text-white md:text-7xl lg:text-8xl">
          Como funciona
        </h2>
        <div className="top-1/3 flex w-full lg:max-w-6xl flex-col items-start justify-center gap-8 lg:absolute lg:flex-row">
          {HOW_IT_WORKS.map((step) => (
            <HowItWorksStep
              key={step.id}
              howItWorksStep={step}
              className="max-w-1/3 relative flex grow flex-col items-center justify-start gap-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksStep({ howItWorksStep }) {
  return (
    <div className="lg:max-w-1/3 relative flex w-full grow flex-col items-center justify-center gap-4 lg:justify-start">
      <h3
        className="lg:text-smH w-3/5 max-w-56 text-center text-2xl font-semibold text-white md:w-full lg:w-4/6"
        dangerouslySetInnerHTML={{ __html: howItWorksStep.description }}
      ></h3>
      <img
        className="h-60 w-4/5 rounded-2xl object-cover md:h-96 lg:h-92"
        src={howItWorksStep.src}
        alt={howItWorksStep.alt}
      />
    </div>
  );
}
