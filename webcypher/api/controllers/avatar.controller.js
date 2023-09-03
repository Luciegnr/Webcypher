const db = require("@model");
const Avatar = db.avatar;
const User = db.user;

exports.create = async (req, res) => {
    const userId = req.user_id;
    const { ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const alreadyExist = await Avatar.findOne({ id_user: userId });
        if (alreadyExist) {
            return res.status(400).json({ message: "Avatar already exist" });
        } else {

            const avatar = new Avatar({
                ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor,
                id_user: userId,
            });

            await avatar.save();
            await user.avatar.push(avatar)
            await user.save()

            return res.status(201).json({
                message: "OK",
                data: {
                    avatar,
                },
            });
        }
    } catch (error) {
        res.status(400).json({ message: "Bad Request", code: 400, data: error });
    }

};

exports.getAll = async (req, res) => {
    await Avatar.find().then((data) => {
        if (!data) res.status(404).send({ message: "Not found" });
        else
            res.status(200).send({
                data: data,
            });
    });
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    await Avatar.findOne({ id_user: id }).then((data) => {
        if (!data) res.status(404).send({ message: "Not found" });
        else
            res.status(200).send({
                data: data,
            });
    }).catch((err) => {
        res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
    });
};

exports.getCurrent = async (req, res) => {
    const id = req.user_id;
    await Avatar.findOne({ id_user: id }).then((data) => {
        if (!data) res.status(404).send({ message: "Not found" });
        else
            res.status(200).send({
                hatColor: data.HatColor,
                hairColor: data.HairColor,
                shirtColor: data.ShirtColor,
                bgColor: data.BgColor,
                earStyle: data.EarStyle,
                eyesStyle: data.EyesStyle,
                faceColor: data.FaceColor,
                hairStyle: data.HairStyle,
                glassesStyle: data.GlassesStyle,
                hatStyle: data.HatStyle,
                mouthStyle: data.MouthStyle,
                noseStyle: data.NoseStyle,
                shirtStyle: data.ShirtStyle,
                shape: data.Shape,
            });
    })
        .catch((err) => {
            res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
        });
};


exports.delete = async (req, res) => {
    try {
        const id = req.user_id
        await Avatar.findByIdAndDelete({ id_user: id }).then(async (data) => {
            if (!data) {
                res.status(404).send({ succes: false });
            }
        })
        return res.status(204).send();
    } catch (e) {
        res.status(400).json({ message: "Bad Request", code: 400, data: [e] });
    }
};

exports.update = async (req, res) => {
    const id = req.user_id
    const { ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor } = req.body;
    try {
        await Avatar.findOneAndUpdate({ id_user: id }, {
            ShirtStyle, NoseStyle, MouthStyle, HatStyle, GlassesStyle, HairStyle, FaceColor, EyesStyle, EarStyle, BgColor, HairColor, HatColor, Shape, ShirtColor
        }).then((data) => {
            if (!data) {
                res.status(404).send({ message: "Not found" });
            } else res.status(200).send({ message: "OK" });
        }).catch((err) => {
            res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
        });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", code: 400, data: [error] });
    }
};

