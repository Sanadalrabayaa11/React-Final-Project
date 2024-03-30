/* eslint-disable no-empty */
import  { useEffect, useState } from "react";
import axios from "axios";
import style from "./Cart.module.css";

import "./Cart.module.css";
import "./Cart.css"

import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loader from "../../Loader/components/Loader";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const controller = new AbortController();
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems(data.products);
      setLoader(false);
    } catch (error) {
      setLoader(true);
    }
  };

  useEffect(() => {
    getDataCart();
    return () => {};
  }, []);

  const handleIncrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.map((item) =>
        item.details._id === productId
          ? {
              ...item,
              quantity: data.cart.products.find(
                (p) => p.productId === productId
              ).quantity,
            }
          : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      const updatedCartItems = cartItems.map((item) => {
        if (item.details._id === productId) {
          const updatedQuantity = Math.max(
            1,
            data.cart.products.find((p) => p.productId === productId).quantity
          ); // Ensure quantity is at least 1
          return {
            ...item,
            quantity: updatedQuantity,
          };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.filter(
        (item) => item.details._id !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleIClera = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`${import.meta.env.VITE_API}/cart/clear`, null, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems([]);
    } catch (error) {
      setLoader(true);
    }
  };
  const itemCount = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);
  // eslint-disable-next-line no-unused-vars
  function handleCheckoutClick(cartItems) {
    toast.success('All my information is correct. Complete the purchase process', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  return (
    <section className={style.textCenter}>
    <div className="container py-5 h-100 ">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-12 ">
          <div className="card border border-info" style={{ borderRadius: "50px" }}>
            <div className="card-body p-5">
              <div className="row g-5">
                <div className="col-lg-9">
                  <div className="p-0">
                    <div className="d-flex flex-column flex-wrap">
                      <h1 className="fw-bold mb-5 text-black text-center">Shopping Cart<svg xmlns="http://www.w3.org/2000/svg" width={80} height={40} fill="currentColor" className="bi bi-basket text-info" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
</svg></h1>
                      <div className="mb-0 text-muted wit">
                        {loader ? (
                          <Loader/>
                        ) : (
                          <>
                            {cartItems.length === 0 ? (
                                 <div className="text-center text-danger fs-5 border-bottom border-danger text-capitalize fw-bold">
                                 <p>There are no items in the cart</p>
                                 <span>Go to browsing and then return to the shopping cart</span>
                                 </div>
                            ) : (
                              <div className="table-responsive ">
                              <table className="table table-bordered  table-hover border border-info border-5">
                                <thead >
                                  <tr className="text-center ">
                                    <th className="border border-info border-5">Image</th>
                                    <th className="border border-info border-5">Name</th>
                                    <th className="border border-info border-5">Price</th>
                                    <th className="border border-info border-5">Quantity</th>
                                    <th className="border border-info border-5">Total</th>
                                    <th className="border border-info border-5">Remove</th>
                                  </tr>
                                </thead>
                                <tbody >
                                  {cartItems.map((item) => (
                                    <tr key={item.details._id}>
                                      <td className="border border-info border-5">
                                        <img
                                          src={item.details.mainImage.secure_url}
                                          alt={item.details.name}
                                          style={{ maxWidth: "100px" }}
                                        />
                                      </td>
                                      <td className="border border-info border-5">${item.details.name}</td>
                                      <td className="border border-info border-5">${item.details.price}</td>
                                      <td className="border border-info border-5">
<button
  className="btn btn-sm btn-outline-info "
  onClick={() => handleDecrement(item.details._id)}
  disabled={item.quantity === 1} // Disable the button if quantity is 1
>
  -
</button>
{item.quantity}
<button
  className="btn btn-sm btn-outline-info "
  onClick={() => handleIncrement(item.details._id)}
>
  +
</button>
</td>

                                      <td className="border border-info border-5">
                                        ${item.details.price * item.quantity}
                                      </td>
                                      <td className="border border-info border-5 text-center">
                                        <button
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() =>
                                            handleRemoveItem(item.details._id)
                                          }
                                        >
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
</svg>

                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      <button
                                        onClick={handleIClera}
                                        className="btn btn-sm btn-outline-danger"
                                      > Delete Of All
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="currentColor"
                                          className="bi bi-trash"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M5.5 5.5A.5.5 0 1 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                      </button>
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 p-0">
                  <div className="p-5 bg-primary-subtle">
                    <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-4 fw-bold">
                      <span className="text-uppercase">items : {itemCount}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-5 fw-bold">
                      <span className="text-uppercase">Total price</span>
                      <span className="me-3 text-danger">${totalPrice}</span>
                    </div>
                    <span className="text-uppercase  fw-bold">Give code</span>
                    <div className="mt-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your code"
                      />
                    </div>
                    <hr className="my-4" />
                    
                   
                    {itemCount > 0 ? (
                      <Link
                        to="/Order"
                        state={{ cartItems }}
                        className="btn btn-lg btn-danger w-100"
                        onClick={() => handleCheckoutClick(cartItems)}
                      >
                        CheckOut
                      </Link>
                    ) : (
                      <button
                        className="btn btn-lg btn-danger w-100 disabled"
                        disabled
                      >
                        CheckOut
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
</section>

  
  );
}

export default Cart;