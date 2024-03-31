import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );
  const [userName, setUserName] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Add state for cart count

  const getData = () => {
    const decoded = jwtDecode(userToken);
    setUserName(decoded.userName);
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartCount(data.count);
    } catch (error) {
      // console.error("Error fetching cart count:", error);
       toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    
    }
  };

  const updateCartCount = (count) => {
    setCartCount((prevCount) => prevCount + count);
  };

  useEffect(() => {
    userToken
      ? localStorage.setItem("userToken", userToken)
      : localStorage.removeItem("userToken");

    if (userToken) {
      getData();
      fetchCartCount();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserToken,
        setUserName,
        cartCount,
        updateCartCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
