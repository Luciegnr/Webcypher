const colors = [
    "#FFFFFF",
    "#CCCCCC",
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#0693E3",
    "#ABB8C3",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
    "#E0CDA9",
    "#E1CE9A",
    "#DEB887",
    "#7E5835",
    "#D2691E",
    "#AD4F09",
    "#955628",
    "#3F2204",
    "#2F1B0C",
    "#F9C9B6",
];
const skinColors = [
    "#F9C9B6", "#E5D2B7", "#AC6651"
]
const bgColorGr = [
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
    "linear-gradient(0deg, rgba(253,187,45,1) 0%, rgba(34,193,195,1) 100%)",
    "linear-gradient(0deg, rgba(253,187,45,1) 0%, rgba(45,52,54,1) 100%)",
    "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
    "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    "#FFFFFF",
    "#CCCCCC",
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#0693E3",
    "#ABB8C3",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
    "#92631E",
    "#B98842",
    "#D1B58D",
]


const shape = ["circle", "rounded", "square"];
const sex = ["man", "woman"];
const faceColor = skinColors;
const earSize = ["small", "big"];
const hairColor = colors;
const hairStyle = ["normal", "thick", "mohawk", "womanLong", "womanShort"];
const hatColor = colors;
const hatStyle = ["none", "beanie", "turban"];
const eyeStyle = ["circle", "oval", "smile"];
const glassesStyle = ["none", "round", "square"];
const noseStyle = ["short", "long", "round"];
const mouthStyle = ["laugh", "smile", "peace"];
const shirtStyle = ["hoody", "short", "polo"];
const shirtColor = colors;
const bgColor = bgColorGr;

const AvatarConfig = {
    colors,
    shape,
    sex,
    faceColor,
    earSize,
    hairColor,
    hatColor,
    hatStyle,
    hairStyle,
    eyeStyle,
    glassesStyle,
    noseStyle,
    mouthStyle,
    shirtColor,
    shirtStyle,
    bgColor
};
export default AvatarConfig