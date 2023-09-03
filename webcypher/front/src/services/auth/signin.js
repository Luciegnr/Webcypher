import axios from "axios";
import { setAccessToken } from '@utils/access_token';
import { URL } from "@services";
import { toast } from 'react-toastify';

const signin = (username, password) => {
    return axios.post(`${URL}signin`, { username, password }).then((response) => {
        setAccessToken(response.data.token);
        window.location.href = "/parametre-compte";
    }
    ).catch((error) => {
        toast.warn(`${error.response.data.data}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    });
};

export { signin };