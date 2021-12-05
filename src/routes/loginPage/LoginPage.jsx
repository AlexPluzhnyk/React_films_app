import React from "react";
import { useSelector } from "react-redux";

import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { validationSchema } from "./utils";

import "./style.scss";

/*
  Login and password to enter
 {
    login: "admin@gmail.com",
    password: "123456789",
  },
  {
    login: "eva@gmail.com",
    password: "123456789",
  },
  {
    login: "ivan@gmail.com",
    password: "123456789",
  },
  {
    login: "lisa@gmail.com",
    password: "123456789",
  },

*/

const LoginPage = ({ history }) => {
  const { users } = useSelector(({ filmsReducer: { users } }) => ({ users }));

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const isAllowedToEntry = users.some(({ login, password }) => {
        return login === values.email && password === values.password;
      });

      if (isAllowedToEntry) {
        localStorage.setItem("current", JSON.stringify(values));
        history.push("/films");
      }
    },
  });

  return (
    <div className="form-wrapper">
      <form className="form-box" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          className="form-field"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          className="form-field"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
