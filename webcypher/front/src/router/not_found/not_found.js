import React from "react";
import animationData from '@assets/images/lottie.json'
import Lottie from 'react-lottie'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
const NotFoundPage = () => {

    return (
        <div>
            <Lottie options={defaultOptions}
                height={900}
                width={900}
            />
        </div>
    );
};

export default NotFoundPage;