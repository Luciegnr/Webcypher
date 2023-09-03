import Long from "./Long";
import Short from "./Short";
import Round from "./Round";

const Nose = (props) => {
    const { style } = props;
    switch (style) {
        case "long": return <Long />;
        case "round": return <Round />;
        case "short":
        default:
            return <Short />;
    }
}
export default Nose;
