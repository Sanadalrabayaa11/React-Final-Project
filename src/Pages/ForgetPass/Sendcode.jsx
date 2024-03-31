import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const logSchema = object({
        email: string().email().required(),
      });

      await logSchema.validate({ email }, { abortEarly: false });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/auth/sendcode`,
        { email }
      );
      setMessage(data.message);
      toast.success("Reset code sent successfully!");
      navigate("/ForgetPassword");
    } catch (err) {
      setErrors(err.errors);
      //setMessage('Error sending reset password email. Please try again.');
      toast.error("Please provide a valid email address.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="border border-info ">
      <h1 className="text-capitalize text-center fs-1 mb-5 mt-5 fw-bold  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={60}
          height={60}
          fill="currentColor"
          className="bi bi-lock text-info"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
        </svg>
        Forgot Password
      </h1>

      {errors.length > 0
        ? errors.map((error, index) => (
            <div
              key={index}
              className="d-flex justify-content-center align-items-center"
            >
              <p className="border border-danger border-4 text-start rounded-4 text-capitalize fs-5 w-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={70}
                  height={35}
                  fill="currentColor"
                  className="bi bi-exclamation-triangle-fill text-warning"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                {error}
              </p>
            </div>
          ))
        : ""}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="text-center">
        <div className="row mb-3 ">
          <div className="col-12 mb-4">
            <label className="text-center fw-bold fs-3 me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={40}
                fill="currentColor"
                className="bi bi-envelope-at-fill text-info"
                viewBox="0 0 16 16"
              >
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
              </svg>
              email
            </label>
            <input
              className="bg-info border border-black border-3 w-auto"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-4">
            <button
              type="submit"
              className="btn btn-outline-info"
              disabled={loader}
            >
              {loader ? "Sending..." : "Send Reset Code"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgetPass;
