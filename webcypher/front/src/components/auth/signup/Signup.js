import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { signup } from "@services";
import "./style.css";
import { H1, H2, Container, RelativeParentContainer } from "@styles/style.js";
import { HowToRegIcon } from "@config/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Le nom d'utilisateur est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
  email: Yup.string().email("L'Email est invalide").required("L'Email est requis"),
  firstname: Yup.string().required("Le Prénom est requis"),
  lastname: Yup.string().required("Le nom est requis"),
  birthday: Yup.string().required("La date de naissance est requise"),
  country: Yup.string().required("Le pays est requis"),
  phoneNumber: Yup.string()
    .required("Le numéro de téléphone est requis")
    .matches(phoneRegExp, "Le numéro de téléphone est invalide")
    .min(10, "Numéro de téléphone trop court")
    .max(10, "Numéro de téléphone trop long"),
});

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        country: "",
        phoneNumber: "",
        birthday: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, resetForm) => {
        signup(
          values.username,
          values.firstname,
          values.lastname,
          values.email,
          values.country,
          values.phoneNumber,
          values.birthday,
          values.password,
        ).then(() => {
          resetForm();
        })
        resetForm();
      }}
    >
      <Container>
        <div className="page-signup">
          <H1>Devenez membre Web Cypher</H1>
          <H2>
            Inscrivez-vous dès maintenant pour profiter de nos fonctionnalités
          </H2>
          <ToastContainer />
          <div className="form-container">
            <Form className="signup-form">
              <RelativeParentContainer>
                <Field
                  name="username"
                  type="text"
                  placeholder="Entrer votre nom d'utilisateur"
                  label="Nom d'utilisateur"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>

              <RelativeParentContainer>
                <Field
                  name="firstname"
                  type="text"
                  label="Prénom"
                  placeholder="Entrer votre prénom"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>

              <RelativeParentContainer>
                <Field
                  name="lastname"
                  type="text"
                  label="Nom"
                  placeholder="Entrer votre nom"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>
              <RelativeParentContainer>
                <Field
                  name="email"
                  type="text"
                  label="Email"
                  placeholder="Entrer votre email"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>
              <RelativeParentContainer>
                <Field
                  name="country"
                  type="text"
                  label="Pays"
                  placeholder="Entrer votre pays"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>

              <RelativeParentContainer>
                <Field
                  name="phoneNumber"
                  type="text"
                  label="Numéro de téléphone"
                  placeholder="Entrer votre numéro de téléphone"
                  className="custom_field"
                  InputLabelProps={{ shrink: true }}
                  component={TextField}
                  fullWidth
                />
              </RelativeParentContainer>
              <Field
                name="birthday"
                label="Date de naissance"
                InputLabelProps={{ shrink: true }}
                type="date"
                className="custom_field"
                component={TextField}
                fullWidth
              />

              <RelativeParentContainer>
                <Field
                  name="password"
                  type="password"
                  label="Mot de passe"
                  placeholder="Entrer votre mot de passe"
                  className="custom_field"
                  component={TextField}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </RelativeParentContainer>

              <Button
                className="submit-form-btn"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<HowToRegIcon />}
              >
                Inscription
              </Button>
              <span className="center">
                Déja inscrit ?<a href="/connexion"> Connecte-toi !</a>
              </span>
            </Form>
          </div>
        </div>
      </Container>
    </Formik>
  );
};

export default SignupForm;
