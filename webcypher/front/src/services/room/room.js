import axiosConf from '@config/axios';
// import axios from "axios";

const getAll = async () => {
    const response = await axiosConf.axiosget(`rooms`);
    return response;
};

const getOne = async (id) => {
    const response = await axiosConf.axiosget(`room/${id}`);
    return response;
};

const create = async (name, tag, source) => {
    const response = await axiosConf.axiosroom.post(`room`, { name: name, tag: JSON.stringify(tag), source: source });
    return response;
};

const remove = async (id) => {
    const response = await axiosConf.axiosform.delete(`room/${id}`, {});
    return response;
};

const Roomfunction = { getAll, getOne, create, remove };
export default Roomfunction;