import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20).required(),
      image: string().required(),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      //console.log("validation error", error.errors);
      setErrors(error.errors);
      setLoader(false);
      return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formData
        );
        if (data.message == "success") {
          toast.success("account created successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          navigate("/Login");
        }
      } catch (error) {
        if (error.response.status === 409) {
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
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="container mt-5 mb-5 mt-5 d-flex justify-content-center align-items-center ">
      <div className="row border border-info p-1 w-auto border-4    ">
        <h1 className="text-capitalize text-center fs-1 mb-5 mt-5 fw-bold  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={50}
            fill="currentColor"
            className="bi bi-person-fill-lock text-info"
            viewBox="0 0 16 16"
          >
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
          </svg>
          signup
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

        <form onSubmit={handelSubmit} className="text-center ">
          <div className="row mb-3 ">
            <div className="col-md-12 mb-4 col-sm-6 col-12">
              <label className="text-center fw-bold fs-3 me-3  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={80}
                  height={40}
                  fill="currentColor"
                  className="bi bi-people-fill text-info"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
                Name
              </label>
              <input
                className="bg-info border border-black border-3 w-auto"
                type="text"
                placeholder="username"
                value={user.userName}
                name="userName"
                onChange={handelChange}
              />
            </div>
            <div className="col-md-12 mb-4 col-sm-6 col-12">
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
                value={user.email}
                name="email"
                onChange={handelChange}
              />
            </div>
            <div className="col-md-12 mb-4 col-sm-6 col-12 ">
              <label className="text-center fw-bold fs-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={80}
                  height={40}
                  fill="currentColor"
                  className="bi bi-file-earmark-lock2 text-info"
                  viewBox="0 0 16 16"
                >
                  <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0M7 7v1h2V7a1 1 0 0 0-2 0" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                </svg>
                pass-
              </label>
              <input
                className="bg-info border border-black border-3 w-auto"
                type="password"
                value={user.password}
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="col-md-12 mb-4 col-sm-6 col-12">
              <label className="text-center fw-bold fs-3 me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={80}
                  height={40}
                  fill="currentColor"
                  className="bi bi-file-image text-info"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
                </svg>
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handelImageChange}
                className="bg-info border border-black border-3 w-auto"
              />
            </div>
            <div className="col-md-12 mb-4  ">
              <button
                type="submit"
                className="btn btn-outline-info "
                disabled={loader ? "disabled" : null}
              >
                {!loader ? "signup" : "wait..."}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
