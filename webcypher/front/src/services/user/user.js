import axios from '@config/axios';
import { logout } from "@utils/access_token";

const get = async () => {
  const { data } = await axios.axiosget(`user`);
  return data;
};

const getID = async (id) => {
  const { response } = await axios.axiosget(`user/${id}`);
  return response;
};

const update = async (username, birthday, firstname, lastname, country, phoneNumber) => {
  const response = await axios.axiosbody.put(`user`, { username, birthday, firstname, lastname, country, phoneNumber });
  return response;
};

const resendToken = async (email) => {
  const response = await axios.axiostoken.post(`sendtoken`, { email });
  return response;
};

const postToken = async (token) => {
  const response = await axios.axiosbody.post(`user/${token}`, {});
  return response;
};

const del = async (id) => {
  const response = await axios.axiosform.delete(`DeleteUser/${id}`, {}).then(async (response) => {
    logout();
  })
  return response;
};

const get_all = async () => {
  const response = await axios.axiosget(`users`);
  return response;
};

const Userfunction = { get_all, get, update, del, postToken, resendToken, getID };
export default Userfunction
