import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";

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
