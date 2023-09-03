
import Round from "./Round";
import Square from "./Square";

const Glasses = (props) => {
    const { style } = props;
    switch (style) {
        case "round": return <Round />;
        case "square": return <Square />;
        case "none":
        default:
            return null;
    }
}
export default Glasses;