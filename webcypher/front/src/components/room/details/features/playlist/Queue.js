import React, { useState, useEffect } from "react";
import { LibraryMusicIcon, InsertLinkIcon, QueueMusicIcon, UploadIcon, DeleteIcon } from '@config/icons';
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import { Button, Snackbar, ButtonGroup } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AudioServices from "@services/audio";
import Mediatheque from './Mediatheque'
import { toast } from "react-toastify";
import ListMedia from "./ListMedia";
import * as Yup from "yup";
import './style.css'
import { Reorder } from "framer-motion"


const roomSchema = Yup.object().shape({
    name: Yup.string().required("Ce champs est requis"),
});

// NOTE : this component use props 
function Queue({ queue, current, party, emitPlayWish, playerState, socket, id, retrieveRooms }) {
    const [state, setState] = React.useState({ open: false, vertical: 'top', horizontal: 'center' });
    const [snackbarSection, setSnackbarSection] = useState("queue");
    const [fileorlink, setFileorlink] = useState("link");
    const { vertical, horizontal, open } = state;
    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleFileorlink = (newState) => {
        setFileorlink(newState);
    };

    // NOTE : this function is used to play a song from the queue
    const handleItemClick = (chosenItem) => {
        if (emitPlayWish) {
            if (party) {
                const newSource = party.items.filter((mediaItem) => {
                    return mediaItem._id === chosenItem._id;
                })[0];
                emitPlayWish(
                    newSource,
                    true,
                    playerState.playingItem ? playerState.playingItem.id : null,
                    true,
                    0
                );
            }
        }
    };

    // NOTE : this function is used to remove a song from the queue
    const handleRemoveAudio = (idRoom, idAudio) => {
        AudioServices.removeAudioInRoom(idRoom, idAudio).then((response) => {
            if (response.status === 201) {
                updateParty(response.data.room)
            }
        });
    }

    // NOTE : this function is used to update the queue for the other users of the party
    const updateParty = async (room) => {
        socket.emit("mediaItemUpdate", { room });
    }

    const handleSectionSnackbar = (newState) => {
        setSnackbarSection(newState);
    };

    const [items, setItems] = useState(queue)

    useEffect(() => {
        setItems(queue)
    }, [queue])

    const test = async (item) => {
        setItems(queue)
        await AudioServices.update(id, item).then((response) => {
            if (response.status === 200) {
                updateParty(response.data.room)
            }
        });
    }

    return (<div>
        <LibraryMusicIcon style={{ cursor: "pointer" }} onClick={handleClick({ vertical: 'top', horizontal: 'right' })} sx={{ color: "white" }} />
        <Snackbar className='modal-queue' anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal}>
            <div className="overview-queue">
                <div>
                    {socket ?
                        <div className="icon-option">
                            <InsertLinkIcon onClick={() => handleSectionSnackbar('add')} />
                            <LibraryMusicIcon onClick={() => handleSectionSnackbar('media')} />
                            <QueueMusicIcon onClick={() => handleSectionSnackbar('queue')} />
                        </div>
                        :
                        <QueueMusicIcon onClick={() => handleSectionSnackbar('queue')} />
                    }
                </div>
                {/* NOTE if the section to display is queue we list all the media of the playlist */}
                {snackbarSection === 'queue' && (
                    <div>
                        <div className="playlist-container">
                            <h3 >Liste de lecture : </h3>
                        </div>

                        {/* if socket draggable else only queue map */}
                        {socket ?
                            <>
                                <Reorder.Group axis="y" as="div" values={items} onReorder={test}>
                                    {items.map((item) => (
                                        <Reorder.Item as="div" key={item._id} value={item}>
                                            <ListMedia item={item} socket={socket} current={current} handleRemoveAudio={handleRemoveAudio} id={id} handleItemClick={handleItemClick} />
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            </>


                            : <div>
                                {queue.map(
                                    (item, index) => {
                                        return (
                                            <ListMedia socket={socket} current={current} handleRemoveAudio={handleRemoveAudio} id={id} handleItemClick={handleItemClick} key={index} item={item} index={index} />
                                        )
                                    })}
                            </div>
                        }
                    </div>
                )}
                {/* NOTE if the section is media we display all the media of the user's mediatheque that he can add to the playlist */}
                {snackbarSection === 'media' && (
                    <div>
                        <Mediatheque id={id} updateParty={updateParty} queue={queue} />
                    </div>
                )}
                {/* NOTE if the section is add we dispaly a form */}
                {snackbarSection === 'add' && (
                    <div>
                        {socket && (
                            <Formik initialValues={{ name: "", audio: "", link: "", }} validationSchema={roomSchema} validateOnBlur={false} validateOnChange={false}
                                onSubmit={(values, { resetForm }) => {
                                    if (fileorlink === "file") {
                                        AudioServices.post(values.name, values.audio, id).then((response) => {
                                            if (response.status === 201) {
                                                toast.success(`Votre audio a été ajouter à la queue avec succès`, {
                                                    position: "bottom-right",
                                                    autoClose: 4000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "dark",
                                                });

                                                updateParty(response.data.room)
                                                resetForm();
                                            }
                                        });
                                    } else {
                                        AudioServices.postLink(values.name, values.link, id).then((response) => {
                                            if (response.status === 201) {
                                                toast.success(`Votre audio a été ajouter à la queue avec succès`, {
                                                    position: "bottom-right",
                                                    autoClose: 4000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "dark",
                                                });

                                                updateParty(response.data.room)
                                                resetForm();
                                            }
                                        });
                                    }
                                }}
                            >
                                {({ setFieldValue, values }) => (
                                    <div className="add-form">
                                        <ToastContainer />
                                        <ButtonGroup className="add-button" aria-label="Disabled elevation buttons">
                                            <Button onClick={() => handleFileorlink("file")}>Fichier</Button>
                                            <Button onClick={() => handleFileorlink("link")} >Lien</Button>
                                        </ButtonGroup>
                                        <Form className="form">
                                            <Field name="name" type="text" label="Entrez le nom de votre audio" className=" custom_field" component={TextField} fullWidth />
                                            {fileorlink === "file" ? (
                                                <div className="file-input mt5">
                                                    <input id="file-input" type="file" name="audio" onChange={(event) => { setFieldValue("audio", event.currentTarget.files[0]); }} />
                                                    <label className="file-input__label" htmlFor="file-input">
                                                        <UploadIcon />
                                                        <span>{values.audio.name ? values.audio.name : "Selectionner un fichier"}</span>
                                                    </label>
                                                </div>
                                            ) : (
                                                <Field name="link" type="text" label="Entrez le lien de votre audio" className="marge custom_field" component={TextField} fullWidth />
                                            )}
                                            <Button className="submit-form-btn" type="submit" variant="contained" color="primary" fullWidth>
                                                Ajouter
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        )}
                    </div>
                )}
            </div>
        </Snackbar >
    </div >
    )
}

export default Queue;