import  { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { UserContext } from "../../../context/User";
import "./Order.css";

function Order() {
  const { state } = useLocation();
  const cartItems = state.cartItems;
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  const [order, setOrder] = useState({
    Coupon: "",
    Address: "",
    PhoneNumber: "",
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = object({
      Coupon: string(),
      Address: string().required(),
      PhoneNumber: string().required().min(5).max(20),
    });

    try {
      await logSchema.validate(order, { abortEarly: false });
      setErrors([errors]);
      return true; // Validation succeeded
    } catch (err) {
      setErrors(err.errors);
      setLoader(false);
      err.errors.forEach((error) => {
        toast.error(error, {
          position: "bottom-center",
          autoClose: 5018,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
      return false; // Validation failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    setLoader(true);
    if (await validateData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/order`,
          {
            couponName: order.Coupon,
            address: order.Address,
            phone: order.PhoneNumber,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setOrder({
          Coupon: "",
          Address: "",
          PhoneNumber: "",
        });
        setUserToken(data.token);
        toast.success("Order successful!");
        navigate("/Profile");
      } catch (err) {
        setLoader(false);
        setErrors(err.errors);
        toast.error(err.errors);
      } finally {
        setLoader(false);
      }
    }
  };
//
const handelCan = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("userToken");

  setLoader(true);
  try {
    const { data } = await axios.patch(`${import.meta.env.VITE_API}/order/cancel`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    setOrder("");
    setUserToken(data.token);
    toast.success("Order canceled successfully!");
    navigate("/Profile");
  } catch (err) {
    setLoader(false);
    toast.error("Failed to cancel order!");
  } finally {
    setLoader(false);
  }
};



 return (
  <div className="d-flex flex-wrap mt-3">
    <div className="order-table-container">
      <table className="table border border-info">
        <thead>
          <tr>
            <th className="border border-info">Image</th>
            <th className="border border-info">Product</th>
            <th className="border border-info">Quantity</th>
            <th className="border border-info">Price</th>
          </tr>
        </thead>
        <tbody >
          {cartItems.map((item) => (
            <tr key={item.details._id}>
                <td className="border border-info">
                <img
                  src={item.details.mainImage.secure_url}
                  alt={item.name}
                  style={{ maxWidth: "100px", height: "auto" }}
                  className="img-fluid"
                />
              </td>
              <td className="border border-info">{item.details.name}</td>
              <td className="border border-info text-center">{item.quantity}</td>
              <td className="border border-info text-center">
${item.quantity * item.details.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={25} fill="currentColor" className="bi bi-cash text-success" viewBox="0 0 16 16">
  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
</svg>    Total price: <span className="text-success">$</span> {totalPrice}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div className="order-form-container  ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="coupon" className="form-label  fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-tag" viewBox="0 0 16 16">
  <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
  <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
</svg> Coupon:</label>
          <input
            type="text"
            name="Coupon"
            value={order.Coupon}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
</svg> Address:</label>
          <input
            type="text"
            name="Address"
            value={order.Address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
</svg> Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            value={order.PhoneNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-dark me-2">
            {!loader ? "Order" : "Please wait..."}
          </button>
          <button
            type="button"
            onClick={handelCan}
            className="btn btn-danger"
          >
            {!loader ? "Cancel" : "Please wait..."}
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default Order;
