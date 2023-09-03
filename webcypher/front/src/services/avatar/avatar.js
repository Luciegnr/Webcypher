import axios from '@config/axios';

const post = async (ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor) => {
    const response = await axios.axiosbody.post(`avatar`, { ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor });
    return response;
};
const update = async (ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor) => {
    const response = await axios.axiosbody.put(`avatar`, { ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor });
    return response;
};

const get = async () => {
    const response = await axios.axiosget(`avatar`);
    return response;
};

const get_all = async () => {
    const response = await axios.axiosget(`avatars`);
    return response;
};

const avatarFunctions = { post, update, get, get_all };
export default avatarFunctions
