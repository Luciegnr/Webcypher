import chroma from "chroma-js";
import Normal from "./Normal";
import Thick from "./Thick";
import Mohawk from "./Mohawk";
import WomanLong from "./WomanLong";
import WomanShort from "./WomanShort";

const Hair = (props) => {
    const { style, color } = props;
    const secondColor = chroma(color).brighten(1).hex();

    switch (style) {
        case "thick":
            return <Thick color={color} />;
        case "mohawk":
            return <Mohawk color={color} lightColor={secondColor} />;
        case "womanLong":
            return <WomanLong color={color} lightColor={secondColor} />;
        case "womanShort":
            return <WomanShort color={color} lightColor={secondColor} />;
        case "normal":
        default:
            return <Normal color={color} />;
    }
}
export default Hair;