import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Button } from "@mui/material";
import "./style.css";
import { H1, H2, Container, RelativeParentContainer } from "@styles/style.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "@services/user";

const TokenSchema = Yup.object().shape({
  email: Yup.string().required("L'email est requis"),
});

const ResendToken = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={TokenSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        User.resendToken(values.email);
        resetForm();
      }}
    >
      <Container>
        <div className="page-login">
        <H1>
          Afin de vous envoyer un nouveau lien
          </H1>
          <H2>
          Veuillez rentrer votre email
          </H2>
          <Container />
          <Form>
            <div className="form-container">
              <div className="login-form">
                <RelativeParentContainer>
                  <Field
                    name="email"
                    type="text"
                    label="Email"
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
                  startIcon={<ForwardToInboxIcon />}
                >
                  Renvoyer le lien
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </Formik>
  );
};

export default ResendToken;
