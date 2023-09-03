import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { LockOpenIcon } from "@config/icons";
import { Button } from "@mui/material";
import { signin } from "@services";
import "./style.css";
import { H1, H2, Container, RelativeParentContainer } from "@styles/style.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import User from "@services/user";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Le nom d'utilisateur est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

const SigninForm = () => {
  let { token } = useParams();

  useEffect(() => {
    if (token) {
      User.postToken(token)
    }
  }, [token]);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, { resetForm }) => {
        signin(values.username, values.password);
        resetForm();
      }}>
      <Container>
        <div className="page-login">
          <H1>Connexion membre </H1>
          <H2>
            Connectez-vous au plus vite pour retrouver l'intégralité des fonctionnalités
            en tant que membre Web Cypher.
          </H2>
          <ToastContainer />
          <Form>
            <div className="form-container">
              <div className="login-form">
                <RelativeParentContainer>
                  <Field
                    name="username"
                    type="text"
                    label="Nom d'utilisateur"
                    className="custom_field"
                    component={TextField}
                    fullWidth
                  />
                </RelativeParentContainer>

                <RelativeParentContainer className="mt3">
                  <Field
                    name="password"
                    type="password"
                    label="Mot de passe"
                    className="custom_field"
                    component={TextField}
                    fullWidth
                  />
                </RelativeParentContainer>

                <Button
                  className="submit-form-btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<LockOpenIcon />}
                >
                  Connexion
                </Button>
                <span className="center">
                  Pas encore de compte ?
                  <a href="/inscription"> Inscrivez-vous !</a>
                  <br></br>
                  Vous n'avez pas validé votre email ?
                  <a href="/token"> Cliquez ici</a>
                </span>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </Formik>
  );
};

export default SigninForm;
