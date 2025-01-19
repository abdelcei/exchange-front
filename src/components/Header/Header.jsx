// Header.jsx: Componente para el Header.

import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// Enlaces principales de navegación.
const navBarLinks = [{ id: 0, title: "Ofertas", to: "/offers" }];

//Componente principal del Header
// Hook de Navegación.
// Hook que obtiene la ubicación actual.
// Estado del menu
// Estado del usuario desde el contexto global.
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const { user, logout } = useContext(UserContext);

  // Maneja el cierre de sesión del usuario.
  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`${openMenu ? 'bg-emerald-500' : 'bg-white/10'} fixed left-0 top-0 z-10 h-14 w-full bg-white/10 py-2 backdrop-blur-sm`}
    >
      <div
        className={`${openMenu ? "hidden" : ""} absolute bottom-0 left-0 h-5 w-full translate-y-full transform bg-gradient-to-t from-transparent to-white/10`}
      ></div>
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-3 font-semibold">
        <NavBarLogo color={`${openMenu ? "white" : "green"}`} />
        <nav className="hidden flex-row items-center justify-center gap-4 sm:flex">
          <ul className="flex flex-row items-center justify-between gap-4">
            {navBarLinks &&
              navBarLinks.map((navBarLink) => (
                <NavBarLink
                  key={navBarLink.id}
                  title={navBarLink.title}
                  to={navBarLink.to}
                >
                  {navBarLink.title}
                </NavBarLink>
              ))}
          </ul>
          {user ? (
            location.pathname == "/user" ? (
              <NavBarButton
                color="gray"
                title="Cerrar sesión"
                onClick={handleLogout}
              >
                Cerrar sesión
              </NavBarButton>
            ) : (
              <NavBarButton color="green" title="Perfil" to={`/user`}>
                Perfil
              </NavBarButton>
            )
          ) : (
            <NavBarButton color="green" title="Iniciar sesión" to="/login">
              Iniciar sesión
            </NavBarButton>
          )}
        </nav>
        <NavBarButton
          className={`md:hidden`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <img className="h-4" src="/icons/Cross.svg" />
          ) : (
            <img className="h-4" src="/icons/Menu.svg" />
          )}
        </NavBarButton>
      </div>
      {openMenu && (
        <div className="flex w-full flex-col items-end justify-start gap-2 bg-emerald-500">
          <ul className="flex w-full flex-col items-end justify-start py-4">
            {navBarLinks &&
              navBarLinks.map((navBarLink) => (
                <NavBarMobileLink
                  key={navBarLink.id}
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    navigate(navBarLink.to);
                  }}
                >
                  {navBarLink.title}
                </NavBarMobileLink>
              ))}
            {user ? (
              location.pathname == "/user" ? (
                <NavBarMobileLink
                  onClick={() => {
                    handleLogout();
                    setOpenMenu(!openMenu);
                    navigate("/");
                  }}
                >
                  Cerrar sesión
                </NavBarMobileLink>
              ) : (
                <NavBarMobileLink
                  color="green"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    navigate(`/user`);
                  }}
                >
                  Perfil
                </NavBarMobileLink>
              )
            ) : (
              <NavBarMobileLink
                onClick={() => {
                  setOpenMenu(!openMenu);
                  navigate(`/login`);
                }}
              >
                Iniciar sesión
              </NavBarMobileLink>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

// Componente: Logotipo de la aplicación.
// Props:
// - className: Clase personalizada.
// - color: Color del texto del logotipo.
export const NavBarLogo = ({ className, color }) => {
  const colorClasses = {
    green:
      "text-emeraldGreen-500 hover:text-emeraldGreen-700 active:text-emeraldGreen-500",
    blue: "text-darkSlate-500 hover:text-darkSlate-700 active:text-darkSlate-500",
    red: "text-crimsonRose-500 hover:text-crimsonRose-700 active:text-crimsonRose-500",
    gray: "text-gray-500 hover:text-gray-700 active:text-gray-500",
    white: "text-gray-50 hover:text-gray-700 active:text-gray-500",
  };

  const finalClassName =
    className ||
    `italic font-black text-2xl ${colorClasses[color] || colorClasses.green}`;

  return (
    <NavLink className={finalClassName} to="/">
      PRECIO JUSTO
    </NavLink>
  );
};

// Componente: Enlace de la barra de navegación.
const NavBarLink = ({ title, to, className, children }) => {
  if (!title && !children) return null;

  if (!to) return null;

  return (
    <li>
      <NavLink
        className={
          className ||
          "rounded-full border-2 border-transparent px-6 py-3 text-darkSlate-500 text-white hover:border-darkSlate-500 active:border-darkSlate-800 active:bg-darkSlate-800"
        }
        to={`${to}`}
      >
        {children}
      </NavLink>
    </li>
  );
};

// Componente: Botón reutilizable para navegación o acciones.
// Props:
// - title: Texto del botón.
// - to: Ruta de navegación.
// - onClick: Acción personalizada al hacer clic.
// - color: Estilo de color.
export const NavBarButton = ({ title, to, className, onClick, color, children,}) => {
  const navigate = useNavigate();

  const colorClasses = {
    green:
      "bg-emeraldGreen-500 hover:bg-emeraldGreen-700 active:bg-emeraldGreen-500",
    blue: "bg-darkSlate-500 hover:bg-darkSlate-700 active:bg-darkSlate-500",
    red: "bg-crimsonRose-500 hover:bg-crimsonRose-700 active:bg-crimsonRose-500",
    gray: "bg-gray-500 hover:bg-gray-700 active:bg-gray-500",
  };

  if (!title && !children) return null;

  if (!to && !onClick) return null;

  const handleClick =
    onClick ||
    (() => {
      navigate(to);
    });

  const finalClassName =
    className +
    ` text-white rounded-full px-6 py-3 text-[1rem] font-medium ${
      colorClasses[color] || colorClasses.green
    }`;

  return (
    <button className={finalClassName} onClick={handleClick}>
      {children || title}
    </button>
  );
};

// Componente: Enlace móvil de la barra de navegación movil.
const NavBarMobileLink = ({ title, children, onClick }) => {
  if (!title && !children) return null;

  return (
    <li className="py-3">
      <button
        onClick={onClick}
        className={"pr-6 text-xl font-medium text-white"}
      >
        {children}
      </button>
    </li>
  );
};
