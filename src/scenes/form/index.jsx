import { Box, Button, TextField,Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState(null);

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Box m="20px" onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(5, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
          {/* Text: "Create New Account" */}
        <div style={{ gridColumn: "span 2", textAlign: "start", marginTop: "30px" }}>
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
        </div>

          {/*EYES HERE ADJUSTING*/}
          <div style={{ gridColumn: "span 2", textAlign: "center" }}></div>
          {/* Drop Box in the upper right corner */}
            <div style={{ gridColumn: "span 1", textAlign: "right", marginTop: "20px" }}>
              <div
                style={{
                  border: "2px dashed #ddd",
                  borderRadius: "8px",
                  padding: "30px",
                  textAlign: "center",
                  width: "150px",
                  height: "150px",
                  boxSizing: "border-box",
                  margin: "auto",
                }}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Dropped Image"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <div>Drag & Drop or Click to Upload Image</div>
                )}
              </div>
            </div>
            {/* First Name Input */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />

            {/* Last Name Input */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
                          <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
              <InputLabel htmlFor="account">Account Type</InputLabel>
              <Select
                fullWidth
                native
                value={values.account}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{
                  name: 'account',
                  id: 'account',
                }}
                error={!!touched.account && !!errors.account}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Establishment">Establishment</option>
              </Select>
              {touched.account && errors.account && (
                <FormHelperText error>{errors.account}</FormHelperText>
              )}
            </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password1"
                error={!!touched.password1 && !!errors.password1}
                helperText={touched.password1 && errors.password1}
                sx={{ gridColumn: "span 2" }}
                
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Re-Enter Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="password2"
                error={!!touched.password2 && !!errors.password2}
                helperText={touched.password2 && errors.password2}
                sx={{ gridColumn: "span 2" }}
                
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  account: yup.string().required("required"),
  address: yup.string().required("required"),
  password1: yup.string().required("required"),
  password2: yup.string().oneOf([yup.ref('password1'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  account: "",
  address: "",
  password1: "",
  password2: "",
};

export default Form;
