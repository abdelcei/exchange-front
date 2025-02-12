// User.jsx: Página de perfil del usuario, donde puede gestionar sus ofertas y ver información personal.

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { NavBarButton } from "../components/Header/Header";
import { OfferPopup } from "../components/OfferPopup/OfferPopup";
import { UserContext } from "../context/UserContext";
import OffersDisplay from "../components/OffersTable/OffersTable";

// Varible entorno de acceso a la API.
const { VITE_API_URL } = import.meta.env;
const BASE_API_URL = VITE_API_URL || "http://localhost:3000";

// Componente principal: Página del perfil del usuario.
// Contexto global del usuario logueado.
// Estado local para manejar el popup de ofertas y las ofertas del usuario.
// Hook para redirección.
export default function User() {
  const { user } = useContext(UserContext);
  
  const [popupOffer, setPopupOffer] = useState(null);
  const [userOffersState, setUserOffersState] = useState(null);

  const navigate = useNavigate();

  // Redirige al usuario al login si no está autenticado.
  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, navigate]);

  // Peticiones para obtener datos del usuario.
  const {
    data: userInfo,
  } = useFetch("/user/" + user);

  // Peticiones para obtener datos de las ofertas del usuario.
  const {
    data: userOffers,
  } = useFetch(`/${user}/offers`);

  // Actualiza el estado de las ofertas cuando se obtienen los datos.
  useEffect(() => {
    if (userOffers) {
      setUserOffersState(userOffers);
    }
  }, [userOffers]);

  // Maneja la visibilidad del popup de edición/creación de ofertas.
  const handlePopupOffer = (offer = {}) => {
    setPopupOffer(offer);
  };

  // Maneja la eliminación de una oferta específica.
  const handleOfferDelete = async (offer) => {
    const { _id: id } = offer;

    const abortController = new AbortController();

    const resquestOptions = {
      signal: abortController.signal,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };

    try {
      const response = await fetch(BASE_API_URL + "/offer", resquestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setUserOffersState(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error)
      }
    } 
    

    return ( 
      () => abortController.abort()
    )
    
  };

  // Definición de las acciones disponibles para las ofertas.
  const actions = [
    {
      name: "Editar",
      color: "gray",
      handler: (offer) => handlePopupOffer(offer),
    },
    { name: "Eliminar", color: "red", handler: handleOfferDelete },
  ];

  return (
    <>
      <SectionBannerTop>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-end px-2">
          {userInfo && (
            <>
              <p className="mx-auto mb-4 w-full text-left text-6xl font-bold text-darkSlate-500 md:w-11/12 md:text-left md:text-7xl lg:w-full">
                Hola,
                <br className="md:hidden" />
                <span className="font-normal">
                  {` ${userInfo.name} ${userInfo.last_name} `}
                </span>
                <span className="hidden text-2xl font-light italic leading-none text-darkSlate-100 md:text-6xl lg:inline">
                  @{userInfo.username}
                </span>
              </p>
            </>
          )}
        </div>
      </SectionBannerTop>
      <div className="min-h-[70vh] w-full bg-darkSlate-500">
        <div className="mx-auto flex w-11/12 flex-col items-center justify-start gap-4">
          <div className="flex w-full max-w-7xl flex-row items-center justify-between pt-10">
            <h2 className="text-2xl font-semibold text-white">Tus ofertas</h2>
            <NavBarButton
              title="Publicar oferta"
              onClick={() => handlePopupOffer()}
            />
          </div>
          {userOffersState && (
            <OffersDisplay offers={userOffersState} actions={actions} />
          )}
        </div>
      </div>
      {popupOffer && (
        <OfferPopup
          offer={popupOffer}
          onClose={() => handlePopupOffer(null)}
          setUserOffersState={setUserOffersState}
        />
      )}
    </>
  );
}

// Componente: Sección superior del banner con estilo personalizable.
// Props:
// - children: Elementos a renderizar dentro del banner.
// - color: Color de fondo del banner (por defecto blanco).
// - backgroundImg: Imagen de fondo del banner.

export function SectionBannerTop({ children, color = "white" , backgroundImg }) {

    const finalClassName = `h-[30vh] md:min-h-72 w-full bg-${backgroundImg ? backgroundImg : color}`

  return (
    <div className={finalClassName}>{children}</div>
  );
}
