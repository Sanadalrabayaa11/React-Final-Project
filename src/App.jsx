import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./context/User";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Root from "./Routes/Root";
import Loader from "./Pages/Loader/components/Loader";
import Home from "./Pages/Home/components/Home";
import CategoriesProducts from "./Pages/CategoriesProducts/components/CategoriesProducts";
import Products from "./Pages/Products/components/Products";
import ProductDetails from "./Pages/ProductDetails/components/ProductDetails";
import Register from "./Pages/Register/components/Register";
import Login from "./Pages/Login/components/Login";
import Sendcode from "./Pages/ForgetPass/Sendcode";
import ForgetPassword from "./Pages/ForgetPass/ForgetPassword";
import Cart from "./Pages/Cart/components/Cart";
import Order from "./Pages/Order/components/Order";
import Profile from "./Pages/Profile/components/Profile";
import Review from "./Pages/Review/components/Review";
import NotFound from "./Pages/NotFound/components/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/sendcode",
        element: <Sendcode />,
      },
      {
        path: "/ForgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/categories/:id",
        element: (
          <ProtectedRoutes>
            <CategoriesProducts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/Categories/:id/ProductDetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Order",
        element: (
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/categories/:id/productDetails/:id/review",
        element: (
          <ProtectedRoutes>
            <Review />
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <UserContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserContextProvider>
      )}
    </>
  );
}

export default App;
