import React, { Fragment } from "react";

import EarSmall from "./Small";
import EarBig from "./Big";

const Ears = (props) => {
    const { color, size } = props;
    return (
        <Fragment>
            {size === "small" &&
                <EarSmall color={color} />
            }
            {size === "big" &&
                <EarBig color={color} />
            }
        </Fragment>

    );
}

export default Ears;