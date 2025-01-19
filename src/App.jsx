// App.jsx: Archivo principal que define la estructura de la aplicación React.
// Maneja las rutas principales, proporciona el contexto de usuario y define el layout general.


import { BrowserRouter, Route, Routes } from "react-router-dom";                                           
import Header from "./components/Header/Header";                   //Componente Header                        
import Footer from "./components/Footer/Footer";                   //Componente Footer                        
import Home from "./pages/Home";                                   //Pagina Home        
import Offers from "./pages/Offers";                               //Pagina ofertas            
import Login from "./pages/Login";                                 //Pagina Login          
import User from "./pages/User";                                   //Pagina Perfil de Usuario        
import NotFound from "./pages/NotFound";                           //Pagina 404                
import { UserProvider } from "./context/UserContext";              //Contexto Usuario                             


// Definición de las rutas de la aplicación.
// Cada ruta incluye un id único, el componente asociado y la URL correspondiente.
const routes = [
  { id: "0", element: Home, url: "/" },
  { id: "1", element: Login, url: "/login" },
  { id: "2", element: Offers, url: "/offers" },
  { id: "3", element: User, url: "/user" },
  { id: "100", element: NotFound, url: "*" },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <main className="m-0">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.url}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </main>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
