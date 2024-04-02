import Navbar from "../assets/Navbar/components/Navbar";
import Footer from "../assets/Footer/components/Footer";
import { Outlet } from "react-router-dom";
import "./Root.css";

function Root() {
  return (
    <div className="ms-5 me-5">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
