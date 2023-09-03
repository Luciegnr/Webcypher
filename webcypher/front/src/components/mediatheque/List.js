import React, { useState, useEffect } from "react";
import MediathequeServices from "@services/mediatheque";
import { Box, Button } from "@mui/material";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import { ToastContainer } from "react-toastify";
import { H1, H1bis, H2, Containers, RelativeParentContainer } from "@styles/style.js";
import { Formik, Field, Form } from "formik";
import { DeleteIcon, UploadIcon } from "@config/icons";
import moment from 'moment';
import "./style.css";
import { toast } from "react-toastify";

const audioSchema = Yup.object().shape({
  name: Yup.string().required("Ce champs est requis"),
});

function ListScreen() {
  const [audios, setAudios] = useState([]);

  const retrieveMedias = () => {
    MediathequeServices.get_all().then((response) => {
      setAudios(response.data.data);
    });
  };

  const removeMedia = (id) => {
    MediathequeServices.del(id).then(() => {
      toast.success(`Votre audio a été supprimer avec succès`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      retrieveMedias();
    });
  };
  useEffect(() => {
    retrieveMedias();
  }, []);

  return (
    <div style={{ marginTop: "50px", }}>
      <H1>Médiathèque</H1>
      <Box className="main-box">

        {audios.length ? (
          <div className="list-media">
            <ul style={{ textAlignLast: "center" }}>
              <H2>Liste des audios </H2>
              {
                audios.map((Audio) => (
                  <li key={Audio._id}>
                    Name : {Audio.name} <br></br>
                    Date d'ajout : {moment(Audio.createdAt).format('DD-MM-YYYY')}
                    <Button startIcon={<DeleteIcon />} onClick={() => removeMedia(Audio._id)}>
                    </Button>
                  </li>
                ))
              }
            </ul> </div>) : (
          ""
        )}


        <Formik initialValues={{ name: "", audio: "" }} validationSchema={audioSchema} validateOnBlur={false} validateOnChange={false}
          onSubmit={(values, { resetForm }) => {
            MediathequeServices.post(values.name, values.audio).then(() => {
              toast.success(`Votre audio a été ajouter avec succès à votre médiathèque`, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              resetForm();
              retrieveMedias();
            })
          }}>
          {({ setFieldValue, values }) => (
            <Containers>
              <div className="form-part">
                <H1bis>Ajout d'audios</H1bis>
                <H2> Veuillez ajouter un fichier mp3 ou mp4 </H2>
                <ToastContainer />
                <Form>
                  <div className="container">
                    <div className="field-container">
                      <RelativeParentContainer>
                        <Field name="name" type="text" label="Entrez le nom de votre audio" className="custom_field" component={TextField} fullWidth />
                      </RelativeParentContainer>
                      <RelativeParentContainer className="mt3">
                        <div className="file-input mt4">
                          <input id="file-input" type="file" name="audio" onChange={(event) => { setFieldValue("audio", event.currentTarget.files[0]); }} />
                          <label className="file-input__label" htmlFor="file-input">
                            <UploadIcon />
                            <span>{values.audio.name ? values.audio.name : "Selectionner un fichier"}</span>
                          </label>
                        </div>
                      </RelativeParentContainer>
                      <Button className="submit-form-btn" type="submit" variant="contained" fullWidth >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Containers>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default ListScreen;
