import React, { useState, useEffect } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { CircleIcon, SquareIcon, PaletteIcon, CloseIcon, SquareRoundedIcon } from "@config/icons";
import { Ears, Eyes, Face, Glasses, Hair, Hat, Mouth, Nose, Shirt } from "@utils/avatar";
import { Tooltip, Button } from '@mui/material';
import ServiceAvatar from "@services/avatar";
import { Formik, Form } from "formik";
import Const from "@config/avatar";
import './style.scss'

const FormAvatar = (props) => {
    const [showShirtColor, setshowShirtColor] = useState(false)
    const [showHairColor, setshowHairColor] = useState(false)
    const [showHatColor, setshowHatColor] = useState(false)
    const [showBgColor, setshowBgColor] = useState(false)
    const [method, setMethod] = useState();

    const [config, setConfig] = useState(
        genConfig({
            hairColorRandom: false,
        })
    );  
    useEffect(() => {
        if (props.configAvatar) {
            setConfig(props.configAvatar)
            setMethod('put')
        } else {
            setConfig({
                ...config, shape: "circle",
            })
            setMethod("post")
        }
    }, []);
    function SwitchConfig(current, type) {
        const current_index = type.findIndex(
            (item) => item === current
        );
        const index = (current_index + 1) % type.length;
        return type[index]
    }

    function updateConfig(key, value) {
        const savedConfig = config;
        savedConfig[key] = value;
        setConfig({ ...savedConfig });
    }

    return (
        <div style={{ marginTop: "5%" }}>
            <Avatar className="avatar marginX" {...config} hairColorRandom />
            <div>
                <Formik
                    initialValues={{ ShirtStyle: config.shirtStyle, NoseStyle: config.noseStyle, MouthStyle: config.mouthStyle, HatStyle: config.hatStyle, GlassesStyle: config.glassesStyle, HairStyle: config.hairStyle, FaceColor: config.faceColor, EyesStyle: config.eyeStyle, EarStyle: config.earSize, BgColor: config.bgColor, HairColor: config.hairColor, HatColor: config.hatColor, Shape: config.shape, ShirtColor: config.shirtColor }}
                    enableReinitialize={true}
                    onSubmit={(values, { setSubmitting }) => {
                        switch (method) {
                            case "post":
                                ServiceAvatar.post(values.ShirtStyle, values.NoseStyle, values.MouthStyle, values.HatStyle, values.GlassesStyle, values.HairStyle, values.FaceColor, values.EyesStyle, values.EarStyle, values.BgColor, values.HairColor, values.HatColor, values.Shape, values.ShirtColor,).then((response) => {
                                    window.location.reload();
                                });
                                break;
                            case "put":
                                ServiceAvatar.update(values.ShirtStyle, values.NoseStyle, values.MouthStyle, values.HatStyle, values.GlassesStyle, values.HairStyle, values.FaceColor, values.EyesStyle, values.EarStyle, values.BgColor, values.HairColor, values.HatColor, values.Shape, values.ShirtColor,).then((response) => {
                                    window.location.reload();
                                });
                                break;
                            default:
                                break;
                        }
                    }}
                >{({ errors, touched }) => (

                    <Form>
                        <div className="editor_bar">
                            <div className="bulle">
                                <Tooltip title="Skin">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("faceColor", `${SwitchConfig(config.faceColor, Const.faceColor)}`)}>
                                            <Face color={config.faceColor} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle">
                                <Tooltip title="Ears">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("earSize", `${SwitchConfig(config.earSize, Const.earSize)}`)}>
                                            <Ears size={config.earSize} color={config.faceColor} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle">
                                <Tooltip title="Eyes">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("eyeStyle", `${SwitchConfig(config.eyeStyle, Const.eyeStyle)}`)}>
                                            <Eyes style={config.eyeStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle">
                                <Tooltip title="Nose">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("noseStyle", `${SwitchConfig(config.noseStyle, Const.noseStyle)}`)}>
                                            <Nose style={config.noseStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle">
                                <Tooltip title="Mouth">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("mouthStyle", `${SwitchConfig(config.mouthStyle, Const.mouthStyle)}`)}>
                                            <Mouth style={config.mouthStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle">
                                <Tooltip title="Glasses">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("glassesStyle", `${SwitchConfig(config.glassesStyle, Const.glassesStyle)}`)}>
                                            <Glasses color="#fff" style={config.glassesStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle_double">
                                <Tooltip title="Shirt">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("shirtStyle", `${SwitchConfig(config.shirtStyle, Const.shirtStyle)}`)}>
                                            <Shirt style={config.shirtStyle} color={config.shirtColor} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle-detail-color">
                                {showShirtColor === false ? (<PaletteIcon className="select_icon" onClick={() => setshowShirtColor(current => !current)} />) : (<CloseIcon onClick={() => setshowShirtColor(current => !current)} className="select_icon" />)}
                                {showShirtColor === true ? (
                                    <div className="" onClick={() => updateConfig("shirtColor", `${SwitchConfig(config.shirtColor, Const.shirtColor)}`)}>
                                        <CircleIcon className="round_color" style={{ color: config.shirtColor }} />
                                    </div>) : null}
                            </div>
                            <div className="bulle_double">
                                <Tooltip title="Hair">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("hairStyle", `${SwitchConfig(config.hairStyle, Const.hairStyle)}`)}>
                                            <Hair color={config.hairColor} style={config.hairStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle-detail-color">
                                {showHairColor === false ? (<PaletteIcon onClick={() => setshowHairColor(current => !current)} className="select_icon" />) : (<CloseIcon onClick={() => setshowHairColor(current => !current)} className="select_icon" />)}
                                {showHairColor === true ? (
                                    <div className="" onClick={() => updateConfig("hairColor", `${SwitchConfig(config.hairColor, Const.hairColor)}`)}>
                                        <CircleIcon className="round_color" style={{ color: config.hairColor }} />
                                    </div>) : null}
                            </div>
                            <div className="bulle_double">
                                <Tooltip title="Hat">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("hatStyle", `${SwitchConfig(config.hatStyle, Const.hatStyle)}`)}>
                                            <Hat color={config.hatColor} style={config.hatStyle} />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle-detail-color">
                                {showHatColor === false ? (<PaletteIcon onClick={() => setshowHatColor(current => !current)} className="select_icon" />) : (<CloseIcon onClick={() => setshowHatColor(current => !current)} className="select_icon" />)}
                                {showHatColor === true ? (
                                    <div className="" onClick={() => updateConfig("hatColor", `${SwitchConfig(config.hatColor, Const.hatColor)}`)}>
                                        <CircleIcon className="round_color" style={{ color: config.hatColor }} />
                                    </div>) : null}
                            </div>
                            <div className="bulle_double">
                                <Tooltip title="Shape">
                                    <div className="round">
                                        <div className="icon" onClick={() => updateConfig("shape", `${SwitchConfig(config.shape, Const.shape)}`)}>
                                            {(() => {
                                                if (config.shape === "rounded") {
                                                    return <SquareRoundedIcon style={{ color: config.bgColor }} />
                                                } else if (config.shape === "square") {
                                                    return <SquareIcon style={{ color: config.bgColor }} />
                                                } else {
                                                    return <CircleIcon style={{ color: config.bgColor }} />
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="bulle-detail-color">
                                {showBgColor === false ? (<PaletteIcon onClick={() => setshowBgColor(current => !current)} className="select_icon" />) : (<CloseIcon onClick={() => setshowBgColor(current => !current)} className="select_icon" />)}
                                {showBgColor === true ? (
                                    <div className="" onClick={() => updateConfig("bgColor", `${SwitchConfig(config.bgColor, Const.bgColor)}`)}>
                                        <CircleIcon className="round_color" style={{ color: config.bgColor }} />
                                    </div>) : null}
                            </div>
                        </div>
                        <div className="mt3">
                            <Button type="submit" className="button_avatar mt3">Mise à jour de l'avatar</Button>
                        </div>
                    </Form>)}
                </Formik>
            </div>

        </div >
    );
};

export default FormAvatar;
