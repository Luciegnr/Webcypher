import React, { useState, useEffect } from "react";
import { Typography } from '@material-ui/core'
import { Box, Avatar } from '@mui/material';
import AvatarModel from "react-nice-avatar";
import Modal from '@components/user/modal/Modal';
import ServiceAvatar from "@services/avatar";
import { PersonIcon } from "@config/icons";
import FormAccount from './features/Form';
import './style.scss';


const Account = () => {
    const [config, setConfig] = useState();
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [avatar, setAvatar] = useState([]);

    const retrieveAvatar = () => {
        ServiceAvatar.get().then((response) => {
            setAvatar(response.data);
            if (response.data) {
                console.log(response.data.hairStyle)
                setConfig({
                    ...config, hairColor: response.data.hairColor, hairStyle: response.data.hairStyle, hatColor: response.data.hatColor, hatStyle: response.data.hatStyle, mouthStyle: response.data.mouthStyle, noseStyle: response.data.noseStyle, shirtStyle: response.data.shirtStyle, shirtColor: response.data.shirtColor, glassesStyle: response.data.glassesStyle, faceColor: response.data.faceColor, eyeStyle: response.data.eyesStyle, earSize: response.data.earSize, bgColor: response.data.bgColor, shape: response.data.shape,
                })
            }
        });
    };
    useEffect(() => {
        retrieveAvatar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleModal = () => {
        setModalIsOpen(!isModalOpen);
    };
    return (
        <div>
            <div className="banner" />
            <Box ml="6%" mr="3%" mb="6%">
                {isModalOpen && <Modal data={config} onRequestClose={toggleModal} />}
                {!isModalOpen && Object.keys(avatar).length > 0 && <div onClick={toggleModal} className=" avatar_container marginX">
                    <AvatarModel className="avatar" style={{cursor: "pointer"}} {...config} hairColorRandom />
                </div>}
                {!isModalOpen && avatar.length === 0 &&
                    <div onClick={toggleModal} className="avatar_container marginX center2">
                        <Avatar sx={{ bgcolor: "#211625", width: 140, height: 140 }}>
                            <PersonIcon sx={{ fontSize: 100 }} />
                        </Avatar>
                    </div>
                }
                <Typography variant="h4">Informations de l'utilisateur</Typography>
                <hr />
                <Box mt="3%" sx={{ '& .MuiTextField-root': { width: "100%" }, }}>
                    <FormAccount />
                </Box>
            </Box>
        </div>
    );
}

export default Account;

