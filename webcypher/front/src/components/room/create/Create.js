import React from "react";
import { H1, H2, Container, RelativeParentContainer } from "@styles/style.js";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import roomService from "@services/room";
import { UploadIcon } from "@config/icons";
import Select from 'react-select';
import "./style.css";

const roomSchema = Yup.object().shape({
  name: Yup.string().required("Ce champs est requis"),
  tag: Yup.array().required("Ce champs est requis"),
  source: Yup.string().required("Ce champs est requis"),
});

function CreateForm() {
  const options = [
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "rap", label: "Rap" },
    { value: "classique", label: "Classique" },
    { value: "jazz", label: "Jazz" },
    { value: "metal", label: "Metal" },
    { value: "electro", label: "Electro" },
    { value: "reggae", label: "Reggae" },
    { value: "hip-hop", label: "Hip-Hop" },
    { value: "punk", label: "Punk" },
    { value: "soul", label: "Soul" },
    { value: "blues", label: "Blues" },
    { value: "funk", label: "Funk" },
    { value: "country", label: "Country" },
    { value: "folk", label: "Folk" },
    { value: "indie", label: "Indie" },
    { value: "reggaeton", label: "Reggaeton" },
    { value: "trap", label: "Trap" },
    { value: "techno", label: "Techno" },
    { value: "house", label: "House" },
    { value: "disco", label: "Disco" },
    { value: "rnb", label: "RnB" },
  ];

  return (
    <Formik initialValues={{ name: "", tag: [], source: "" }} validationSchema={roomSchema} validateOnBlur={false} validateOnChange={false}
      onSubmit={(values, { resetForm }) => {
        roomService.create(values.name, values.tag, values.source).then(() => {
        });
      }}
    >
      {({ setFieldValue, values, handleSubmit, handleBlur }) => (
        <Container>
          <div className="main-create-room">
            <H1>Création d'une room</H1>
            <H2>
              Veuillez rentrez ci-dessous le nom de votre Room ainsi que les
              tags et inserez une image de couverture
            </H2>

            <Form>
              <div className="form-container">
                <RelativeParentContainer>
                  <Field name="name" type="text" label="Entrez le nom de votre room" className="custom_field" component={TextField} fullWidth />
                </RelativeParentContainer>

                <RelativeParentContainer className="mt3">
                  <Select
                    id={"tag"}
                    type={"text"}
                    value={values.value}
                    onChange={option => setFieldValue("tag", option)}
                    options={options}
                    onBlur={handleBlur}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    openMenuOnFocus={true}

                    className="custom_field"
                    theme={(theme) => ({
                      ...theme,
                    })}
                  />
                </RelativeParentContainer>

                <RelativeParentContainer className="mt3">
                  <div className="file-input">
                    <input id="file-input" type="file" name="source" onChange={(event) => { setFieldValue("source", event.currentTarget.files[0]); }} />
                    <label className="file-input__label" htmlFor="file-input">
                      <UploadIcon />

                      <span>{values.source.name ? values.source.name : "Selectionner un fichier"}</span>
                    </label>
                  </div>
                </RelativeParentContainer>

                <Button className="submit-form-btn" type="submit" variant="contained" color="primary" fullWidth>
                  Créer
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      )}
    </Formik>
  );
}

export default CreateForm;
