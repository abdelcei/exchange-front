// Footer.jsx: Componente para el footer.
// Contiene enlaces, información legal y el logotipo.

import { NavLink } from "react-router-dom";
import { NavBarLogo } from "../Header/Header";

// Contiene enlaces a las secciones más importantes de la aplicación.
const FooterLinks = [
  { id: "0", title: "Ofertas", to: "/offers" },
  { id: "1", title: "Tu Perfil", to: "/user" },
];

// Incluye enlaces a las políticas y términos legales de la aplicación.
const FooterLegal = [
  { id: "0", title: "Términos y condiciones", to: "/terminos_condiciones" },
  { id: "1", title: "Política de privacidad", to: "/politica_de_privacidad" },
  { id: "2", title: "Cookies", to: "/cookies" },
];

export default function Footer() {
  return (
    <div className="min-h-40 w-full bg-emeraldGreen-500">
      <div className="mx-auto grid h-full w-full grid-cols-2 gap-x-1 gap-y-4 md:gap-6 py-8 text-center md:grid-cols-3 lg:max-w-7xl">
        {/* <div className="flex w-2/3 flex-row justify-around gap-8"> */}
        <div className="flex flex-col items-center">
          <span className="font-semibold">Links</span>
          {FooterLinks.map((link) => (
            <NavLink key={link.id} className="text-sm" to={link.to}>
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">Legal</span>
          {FooterLegal.map((link) => (
            <NavLink key={link.id} className="text-sm" to={link.to}>
              {link.title}
            </NavLink>
          ))}
        </div>
        {/* </div> */}
        <div className="col-span-2 flex flex-col items-center justify-start md:col-span-1">
          <NavBarLogo color="red" />
          <span className="text-sm">© 2025 Precio Justo.</span>
          <span className="text-sm">
            Todos los Derechos Reservados.
          </span>
        </div>
      </div>
    </div>
  );
}
