import axios from '@config/axios';

const get_all = async (id) => {
    const response = await axios.axiosget(`message/${id}`);
    return response;
};

const update = async (conversation_id, sender) => {
    const response = await axios.axiosbody.put(`messages/${conversation_id}/${sender}`, { conversation_id, sender });
    return response;
};

const post = async (conversation_id, sender, text, receiver) => {
    const response = await axios.axiosbody.post(`messages`, { conversation_id, sender, text, receiver });
    return response;
};

export { get_all, update, post };;
