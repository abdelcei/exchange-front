// UserContext.jsx: Contexto para manejar el estado de autenticación del usuario.
// Proporciona funciones para iniciar sesión, cerrar sesión y obtener el estado actual del usuario.
 
import { createContext, useEffect, useState } from "react";

// Creación del contexto de usuario.
export const UserContext = createContext();

// Componente proveedor del contexto.
// Props:
// - children: Componentes hijos que tendrán acceso al contexto.
export const UserProvider = ({ children }) => {

  // Inicializa con el valor almacenado en localStorage, si existe.
  const [user, setUser] = useState(localStorage.getItem("user"));

  // Efecto para sincronizar el estado del usuario con localStorage al montar el componente.
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  },[]);

  // Función para cerrar sesión.
  // Elimina al usuario del localStorage y actualiza el estado a null.
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Función para iniciar sesión.
  // Guarda los datos del usuario en localStorage y actualiza el estado.
  const login = (userData) => {
    localStorage.setItem("user", userData.id);
    setUser(userData.id);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
