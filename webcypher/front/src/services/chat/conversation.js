import axios from '@config/axios';


const get_user_avatar = async (user_id) => {
    const response = await axios.axiosget(`avatar/${user_id}`);
    return response;
}

const conversation_get_all = async () => {
    const response = await axios.axiosget(`conversation`);
    return response;
};

const conversation_get_id = async (id) => {
    const response = await axios.axiosget(`conversation/${id}`);
    return response;
};

const checkConversation = async (user_two) => {
    const response = await axios.axiosget(`conversation-check/${user_two}`);
    return response;
};

const conversation_post = async (id) => {
    const data = await axios.axiosbody.post(`conversation/${id}`, {});
    return data;
};

export { conversation_get_all, conversation_get_id, conversation_post, checkConversation, get_user_avatar };
