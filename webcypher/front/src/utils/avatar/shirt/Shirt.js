import chroma from "chroma-js";
import Hoody from "./Hoody";
import Short from "./Short";
import Polo from "./Polo";

const Shirt = (props) => {
    const { style, color } = props;
    const secondColor = chroma(color).brighten(1).hex();

    switch (style) {
        case "hoody":
            return <Hoody color={color} lightColor={secondColor} />;
        case "polo":
            return <Polo color={color} lightColor={secondColor} />;
        case "short":
        default:
            return <Short color={color} lightColor={secondColor} />;
    }
}
export default Shirt;