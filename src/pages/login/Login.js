import React, { useState } from "react";
import { useFormik } from "formik";
import { login } from "../../firebase/users";
import { useHistory } from "react-router-dom";
export default function Login() {
  let [error, setError] = useState("");
  let history = useHistory();
  let validate = (values) => {
    let erros = {};
    if (!values.email) {
      erros.email = "*Email is required";
    }
    if (!values.password) {
      erros.password = "*Password is required";
    }
    return erros;
  };
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      login(values.email, values.password)
        .then((data) => history.push("/"))
        .catch((err) => {
          if (err.code == "auth/wrong-password") setError("Wrong Password");
          else if (err.code == "auth/wrong-email") setError("Wrong Email");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
    },
  });
  return (
    <div className="d-flex flex-column align-items-center createPlaylist">
      <img src={require("./../../assest/bat-mid.png")} className=" my-5" />
      <h3 className="createPlaylist___header">Login</h3>
      <form
        className="w-25 mt-5 createPlaylist__form"
        onSubmit={(e) => {
          e.preventDefault();
          return formik.handleSubmit();
        }}
      >
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control w-100"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control w-100"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className="customBtn secondaryCustomBtn mt-5">
          Login
        </button>
        <small className="createPlaylist__error">
          {formik.errors.email || formik.errors.password || error}
        </small>
      </form>
    </div>
  );
}
