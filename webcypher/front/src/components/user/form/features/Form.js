import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import { Box, Button } from "@mui/material";
import { DeleteIcon } from "@config/icons";
import * as Yup from "yup";
import User from "@services/user";
import moment from "moment";
import { UpdateIcon } from "config/icons";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const updateSchema = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string(),
  firstname: Yup.string(),
  lastname: Yup.string(),
  email: Yup.string().email("Email is invalid"),
  birthday: Yup.string(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "to short")
    .max(10, "to long"),
  country: Yup.string(),
});

const Account = () => {
  const [account, setAccount] = useState([]);

  const retrieveAccount = () => {
    User.get().then((response) => {
      setAccount(response.data);
    });
  };

  useEffect(() => {
    retrieveAccount();
  }, []);

  return (
    <Box mt="3%" sx={{ "& .MuiTextField-root": { width: "100%" } }}>
      <Formik
        initialValues={{
          username: `${account.username}` || "",
          birthday: `${moment(account.birthday).format("YYYY-MM-DD")}` || "",
          firstname: `${account.firstname}` || "",
          lastname: `${account.lastname}` || "",
          country: `${account.country}` || "",
          phoneNumber: `${account.phoneNumber}` || "",
        }}
        enableReinitialize={true}
        validationSchema={updateSchema}
        onSubmit={(values, { setSubmitting }) => {
          User.update(
            values.username,
            values.birthday,
            values.firstname,
            values.lastname,
            values.country,
            values.phoneNumber
          ).then(
            () => {
              window.location.reload(false);
            },
            (error) => {
              setSubmitting(false);
            }
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row mb3 center2 ">
              <div className="form">
                <div name="username" id="username">
                  <label className="left" htmlFor="firstname">
                    Nom d'utilisateur
                  </label>
                  <Field
                    component={TextField}
                    className="custom_field"
                    name="username"
                    type="text"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="username"
                    placeholder="Enter your username"
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </div>
                <div className="right" name="firstname" id="firstname">
                  <label className="left" htmlFor="firstname">
                    Prénom
                  </label>
                  <Field
                    className="custom_field"
                    component={TextField}
                    name="firstname"
                    type="text"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="firstname"
                    placeholder="Enter firstname"
                    error={Boolean(touched.firstname && errors.firstname)}
                    helperText={touched.firstname && errors.firstname}
                  />
                </div>
                <div name="lastname" id="lastname">
                  <label className="left" htmlFor="lastname">
                    Nom
                  </label>
                  <Field
                    className="custom_field"
                    component={TextField}
                    name="lastname"
                    type="text"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="lastname"
                    placeholder="Enter lastname"
                    error={Boolean(touched.lastname && errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
                  />
                </div>
                <div className="right" name="birthday" id="birthday">
                  <label className="left" htmlFor="birthday">
                    Date de naissance
                  </label>
                  <Field
                    component={TextField}
                    className="custom_field"
                    name="birthday"
                    type="date"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="birthday"
                    placeholder="Enter birthday"
                    error={Boolean(touched.birthday && errors.birthday)}
                    helperText={touched.birthday && errors.birthday}
                  />
                </div>
                <div name="country" id="country">
                  <label className="left" htmlFor="country">
                    Pays
                  </label>
                  <Field
                    component={TextField}
                    className="custom_field"
                    name="country"
                    type="text"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="country"
                    placeholder="Enter country"
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  />
                </div>
                <div className="right" name="phoneNumber" id="phoneNumber">
                  <label className="left" htmlFor="phoneNumber">
                    Numéro de téléphone
                  </label>
                  <Field
                    component={TextField}
                    className="custom_field"
                    name="phoneNumber"
                    type="text"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div className="button_container marginX">
              <Button type="submit" className="button" startIcon={<UpdateIcon />}
              >
                Mise à jour du profil
              </Button>
            </div>{" "}
          </Form>
        )}
      </Formik>
      {/* <Button className="button" onClick={User.del(1)}>Delete Account   </Button> */}
      <Button
        className="button2"
        startIcon={<DeleteIcon />}
        onClick={() => User.del(2)}
      >
        Supprimer le compte
      </Button>
    </Box>
  );
};

export default Account;
