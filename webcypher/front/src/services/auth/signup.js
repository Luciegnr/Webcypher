import axios from '@config/axios';

const signup = async (username, firstname, lastname, email, country, phoneNumber, birthday, password) => {
    const response = await axios.axiosauth.post(`signup`, { username, firstname, lastname, country, phoneNumber, birthday, email, password });
    return response;
};

export { signup };
