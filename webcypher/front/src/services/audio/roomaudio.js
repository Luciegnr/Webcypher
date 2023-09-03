import axios from '@config/axios';
import { URL } from "@services";


const post = async (name, audio, id) => {
    const response = await axios.axiosform.post(`room/${id}/audio`, { name, audio });
    return response;
};

const postLink = async (name, link, id) => {
    const response = await axios.axiosbody.post(`${URL}room/${id}/link-audio`, { name, link });
    return response;
};

const addMediaToRoom = async (id, items) => {
    const response = await axios.axiosform.put(`room/${id}/add-media/${items}`, {});
    return response;
};

const removeAudioInRoom = async (idRoom, id) => {
    const response = await axios.axiosform.delete(`room/${idRoom}/remove-media/${id}`, {});
    return response;
};
const update = async (id, metadata) => {
    const response = await axios.axiosbody.put(`room/${id}/update-media`, { metadata });
    return response;


};

const Audiofunction = { post, postLink, addMediaToRoom, removeAudioInRoom, update }
export default Audiofunction;