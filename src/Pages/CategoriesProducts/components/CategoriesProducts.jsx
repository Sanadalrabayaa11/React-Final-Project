import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useResource from "../../../hooks/useResource";
import pageImage from "./img/p-500.png";
import Loader from "../../Loader/components/Loader";
import { Bounce, toast } from "react-toastify";
function CategoriesProducts() {
  const { id } = useParams();
  const { products, loader } = useResource(
    `${import.meta.env.VITE_API}/products/category/${id}`
  );
  const [hasProducts, setHasProducts] = useState(true);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `https://ecommerce-node4.vercel.app/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      // console.log(data);
      if (data) {
        toast.success("Added successfully", {
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
    } catch (error) {
      // console.error('Error adding to cart:', error);
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

  useEffect(() => {
    // Check if products are available two
    setHasProducts(products && products.length > 0);
  }, [products]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        {hasProducts ? (
          products.map((product) => (
            <div
              className="product bg-info-subtle border border-info p-5 mb-2 border border-5 rounded w-75 h-75 mb-5"
              key={product._id}
            >
              <h2 className="text-capitalize text-center fs-1  mb-3 fw-bold text-black ">
                {product.name}
              </h2>
              <img
                className=" text-center mx-auto d-block mb-3 col-12 col-md-6 col-sm-3 "
                src={product.mainImage.secure_url}
                alt={product.name}
              />
              <p className="text-center fw-bold text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={20}
                  fill="currentColor"
                  className="bi bi-fast-forward-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.271 5.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445" />
                </svg>{" "}
                Price : {product.price}
              </p>
              <p className="text-center fw-bold text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={20}
                  fill="currentColor"
                  className="bi bi-fast-forward-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407" />
                </svg>
                Final Price : {product.finalPrice}
              </p>
              <button
                className="btn btn-outline-dark text-center mx-auto d-block"
                onClick={() => addToCart(product._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={25}
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          // Placeholder component rendered conditionally three
          <div>
            <h2 className="text-capitalize text-center fs-1 mb-3 fw-bold pb-2 text-info border-bottom border-info border-4">
              No products available
            </h2>
            <img
              className="text-center mx-auto d-block mb-3"
              style={{ maxWidth: "100%" }}
              src={pageImage}
              alt="No products available"
            />
            <p className="text-center fw-bold  ">
              There are no products available in this section. You can browse
              the rest of the possible sections.
            </p>
            <p className="text-center fw-bold ">
              {" "}
              We wish you an enjoyable visit to the site.
            </p>
            {/* Your placeholder content goes here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesProducts;
