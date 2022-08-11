import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import { signup } from "../../firebase/users";
export default function Signup() {
  //TODO: process
  let history = useHistory();
  let [error, setError] = useState("");
  let validate = (values) => {
    let erros = {};
    if (!values.name) {
      erros.email = "*Name is required";
    }
    if (!values.email) {
      erros.email = "*Email is required";
    }
    if (!values.password) {
      erros.password = "*Password is required";
    }
    if (!values.confrimPassword) {
      erros.password = "*Confrim Password is required";
    }
    if (values.password != values.confrimPassword) {
      erros.confrimPassword = "Passwords are not the same";
    }
    return erros;
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confrimPassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      signup(values)
        .then((data) => {
          history.push("/");
          window.location.reload();
        })
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
      <h3 className="createPlaylist___header">Sign up</h3>
      <form
        className="w-25 mt-5 createPlaylist__form"
        onSubmit={(e) => {
          e.preventDefault();
          return formik.handleSubmit();
        }}
      >
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control w-100"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
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
        <div className="mb-3">
          <label>Confrim Password</label>
          <input
            type="password"
            className="form-control w-100"
            name="confrimPassword"
            value={formik.values.confrimPassword}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className="customBtn secondaryCustomBtn mt-5">
          Sing up
        </button>
        <small className="createPlaylist__error">
          {formik.errors.name ||
            formik.errors.email ||
            formik.errors.password ||
            formik.errors.confrimPassword ||
            error}
        </small>
      </form>
    </div>
  );
}
