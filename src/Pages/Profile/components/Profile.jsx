/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Loader/components/Loader";
import style from"./Profile.module.css"

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [currentSection, setCurrentSection] = useState("basic");
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile(); 
  }, [currentSection]);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const profileResponse = await axios.get(
        `${import.meta.env.VITE_API}/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setUserProfile(profileResponse.data.user);
      setLoader(false);
    } catch (error) {
      setError("Failed to fetch profile data");
      setLoader(false);
    }
  };

  const handleIorder = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const orderResponse = await axios.get(
        `${import.meta.env.VITE_API}/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setOrders(orderResponse.data.orders);
      setCurrentSection("orders");
    } catch (error) {
      setError("Failed to fetch order data");
    }
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="border border-primary border-5">
   
      <div className="d-flex "> 
        <div className="collapse d-block sidebar collapse bg-secondary bg-opacity-25 col-la-4 col-sm-3 col-xs-2  ">
          <div className="position-sticky d-block  ">
            <div className="list-group list-group-flush mx-3 mt-4 border border-info  ">
              <SidebarItem
                text="Personal Information"
                onClick={() => handleSectionChange("basic")}
                active={currentSection === "basic"}
              />
              <SidebarItem
                text="Email & PassWord"
                onClick={() => handleSectionChange("email-password")}
                active={currentSection === "email-password"}
              />
              <SidebarItem
                text="Orders"
                onClick={handleIorder}
                active={currentSection === "orders"}
              />
            </div>
          </div>
        </div>
  
        <div className="col-9 col-la-8 col-md-5 col-sm-4 ">
          {loader && <Loader />}
          {error && <p>{error}</p>}
          {currentSection === "basic" && !loader && !error && (
            <PersonalInformation user={userProfile} />
          )}
          {currentSection === "email-password" && !loader && !error && (
            <EmailPassword user={userProfile} />
          )}
        </div>
      </div>
  
      {/* Conditional rendering of Orders component */}
      {currentSection === "orders" && !loader && !error && (
        <div className="col-12 mt-3">
          <Orders orders={orders} />
        </div>
      )}
    </div>
   
  );
  
  
  
}

function SidebarItem({ text, onClick, active }) {
  return (
    <a
      href="#"
      className={`list-group-item list-group-item-action py-2 ripple ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      <span>{text}</span>
    </a>
  );
}

function PersonalInformation({ user }) {
  return (
    <div className={`${style.profilePage}`}>
    <div className="col-6 col-xl-8 col-lg-4 col-md-3 col-sm-12 px-3">
      {/* Adjust column sizes for different screen sizes */}
      <h2 className="mb-4 text-center  ">Personal information</h2>
      {user.image && user.image.secure_url ? (
        <>
          <p className="fs-5 mb-3"> <span className="fw-bold">Name: </span>{user.userName}</p>
          <span className="fw-bold me-3">Photo:</span>
          {/* Add responsive classes to adjust image size */}
          <img className=" mt-3 mb-5 border border-danger border-3  " src={user.image.secure_url} alt="Profile" />
        </>
      ) : (
        <p className="text-danger fw-bold text-center">No image available</p>
      )}
    </div>
    </div>
  );
}

function EmailPassword({ user }) {
  return (
    <div className="col-9 col-md-12 col-lg-9 col-sm-12 px-2 text-center"> {/* Adjust column sizes for different screen sizes */}
      <h2 className="mb-4">Email & Password</h2>
      <p className=" mb-3"><span className="fw-bold">Email:</span> {user.email}</p>
      <p className="fs-5 mb-3"><span className="fw-bold">Change Password Time:</span> {user.changePasswordTime}</p>
      <Link to="/sendcode" className="btn btn-outline-primary mb-5">
        Change Password
      </Link>
    </div>
  );
}

function Orders({ orders }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered border-info">
        <thead>
          <tr className="text-center">
            <th>Name Order</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Number of Products</th>
            <th>Coupon Name</th>
            <th>Status</th>
            <th>Final Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr className="text-center" key={index}>
              <td>{`Order ${index + 1}`}</td>
              <td>{order.address}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.products.length}</td>
              <td>{order.couponName}</td>
              <td>{order.status}</td>
              <td>{`${order.finalPrice}$`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}








export default Profile;
