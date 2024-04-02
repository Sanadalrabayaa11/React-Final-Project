import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../Loader/components/Loader";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;
  let [price, setPrice] = useState("");
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");
  const getProducts = async (currentPage) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=${productsPerPage}`,
        {}
      );
      // console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsSorted = async (page, sort) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?page=${page}&sort=${sort}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsByPrice = async (page, price) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?page=${page}&price=${price}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      //console.log(error);
      setLoader(false);
    }
  };
  const getProductsByMin = async (page, min, max) => {
    if (min == "" && max != "") {
      min = 0;
    } else if (max == "" && min != "") {
      max = 200;
    }
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${page}&price[gte]=${min}&price[lte]=${max}`
      );
      //console.log(data);
      setProducts(data);
      setLoader(false);
    } catch (error) {
      // console.log(error);
      setLoader(false);
    }
  };
  const ResetInputs = () => {
    setPrice("");
    setMax("");
    setMin("");
    getProducts(1);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    getProducts(currentPage + 1); // Fetch products for the next page
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    getProducts(currentPage - 1); // Fetch products for the previous page
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    getProducts(pageNumber); // Fetch products for the selected page
  };

  const avgRate = (product) => {
    let sum = 0;
    product.reviews.map((review) => (sum += review.rating));
    return Math.round(sum / product.reviews.length);
  };

  const getStars = (avgRate) => {
    let stars = [];
    for (let i = 0; i < avgRate; i++) {
      stars.push(<FaStar key={`star-${i}`} color="yellow" />); // Unique key prop for each star
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`star-${stars.length}`} />); // Unique key prop for each star
    }
    return stars;
  };

  useEffect(() => {
    getProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container my-3 ">
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            defaultValue="Sort Options"
            className="form-select mb-3 focus-ring focus-ring-info bg-dark-subtle"
            onChange={(e) => getProductsSorted(currentPage, e.target.value, e)}
          >
            <option disabled>Sort Options</option>
            <option value="price">Price</option>
            <option value="-price">Price Descending</option>
            <option value="discount">Discount</option>
            <option value="-discount">Discount Descending</option>
            <option value="name">Name</option>
            <option value="-name">Name Descending</option>
          </select>
        </div>
        <div className="col-md-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getProductsByPrice(currentPage, price);
            }}
            className="mb-3 d-flex"
          >
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2"
            />
            <button type="submit" className="btn btn-info ">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getProductsByMin(currentPage, min, max);
            }}
            className="mb-3 d-flex"
          >
            <input
              type="text"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2"
              placeholder="Min"
            />
            <input
              type="text"
              value={max}
              onChange={(e) => {
                setMax(e.target.value);
              }}
              className="form-control mb-2 me-2 focus-ring focus-ring-info border border-2"
              placeholder="Max"
            />
            <button type="submit" className="btn btn-info me-2">
              Get
            </button>
            <button className="btn btn-danger" onClick={ResetInputs}>
              Reset
            </button>
          </form>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {products?.products &&
          products.products.map((product, index) => (
            <div key={`${index}-${product._id}`} className="col mb-3">
              <div className="card h-100">
                <img
                  src={product.mainImage.secure_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ maxHeight: "250px" }}
                />
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5
                    className="card-title"
                    style={{ fontSize: "1.5rem", textAlign: "center" }}
                  >
                    {product.name}
                  </h5>
                  <p className="card-text text-center">
                    Price: ${product.price}
                  </p>
                  <p className="card-text text-center">
                    Discount: {product.discount}
                  </p>
                  <p className="card-text text-center">
                    Rating: {getStars(avgRate(product))}
                  </p>
                  <Link
                    to={`/Categories/${product._id}/ProductDetails/${product._id}`}
                    className="btn btn-info mt-3 mx-auto"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[1, 2, 3].map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link "
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === 3 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={nextPage}
              disabled={products.length < productsPerPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Products;
