import axios from '@config/axios';


const get_all = async () => {
    const response = await axios.axiosget(`room/audioUser`);
    return response;
};

const post = async (name, audio) => {
    const response = await axios.axiosform.post(`media`, { name, audio });
    console.log(response)
    return response;
};

const del = async (id) => {
    const response = await axios.axiosform.delete(`audio/${id}`, {});
    return response;
};

const Mediathequefunction = { get_all, post, del };
export default Mediathequefunction;
