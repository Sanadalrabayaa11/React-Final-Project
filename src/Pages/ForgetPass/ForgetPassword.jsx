import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = object({
      email: string().email().required(),
      password: string().required().min(5).max(20),
      code: string().required().min(4).max(4),
    });

    try {
      await logSchema.validate(user, { abortEarly: false });
      setErrors([errors.errors]);
      return true; // Validation succeeded
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
        err.errors.map((err) => {
          return toast.error(err, {
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
      } else {
        // Handle other validation errors, if any
        console.error("Validation error:", err);
      }
      setLoader(false);
      return false; // Validation failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API}/auth/forgotPassword`,
          { ...user }
        );

        if (data.message == "success") {
          toast.success("Success Notification !");
          navigate("/Login");
        }
      } catch (err) {
        setLoader(false);
        setErrors(err.errors);
        toast.error("Error sending reset password email. Please try again.");
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="border border-info">
        <h1 className="text-capitalize text-center fs-1 mb-5 mt-5 fw-bold  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            fill="currentColor"
            className="bi bi-person text-info"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
          Account recovery
        </h1>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="row mb-3 ">
            <div className="col-12 mb-4">
              <label className="text-center fw-bold fs-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  fill="currentColor"
                  className="bi bi-envelope-at-fill text-info me-3"
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
                value={user.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-4 ">
              <label className="text-center fw-bold fs-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  fill="currentColor"
                  className="bi bi-file-earmark-lock2 text-info me-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0M7 7v1h2V7a1 1 0 0 0-2 0" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                </svg>
                password
              </label>
              <input
                className="bg-info border border-black border-3 w-auto"
                type="password"
                value={user.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-4">
              <label className="text-center fw-bold fs-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  fill="currentColor"
                  className="bi bi-lock text-info me-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                </svg>
                Code
              </label>
              <input
                className="bg-info border border-black border-3 w-auto"
                type="text"
                value={user.code}
                name="code"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-4">
              <button
                type="submit"
                className="btn btn-outline-info"
                disabled={loader}
              >
                {!loader ? "Submit" : "Please wait..."}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
