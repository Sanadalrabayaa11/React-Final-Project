import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (token) {
    return children;
  }
  return <Navigate to="/Login" replace />;
}

export default PRoutes;
