const db = require("@model");
const Room = db.room;
var fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Audio = require("@model/audio.model.js");

const uploadPath = path.resolve('data/uploads');


const getFilePathFromId = (dbMediaItemId) => {
    return path.join(dbMediaItemId);
};

exports.createMedia = async (req, res) => {
    let custom_id = uuidv4();
    const audio = new Audio({
        id_user: req.user_id,
        name: req.body.name,
        path: uploadPath + "/" + req.file.filename,
        id: custom_id,
    })
    await audio.save();

    return res.status(201).json({
        message: "Votre audio a bien été ajouter à la médiathèque",
        audio: audio
    });
}

exports.createFile = async (req, res) => {
    const roomId = req.params.id;
    let custom_id = uuidv4();
    // console.log(req.file)
    await Room.findByIdAndUpdate(roomId, {
        $push: {
            items: {
                _id: custom_id,
                name: req.body.name,
                url: uploadPath + "/" + req.file.filename,
                type: req.file.mimetype,
                filename: req.file.filename,
            },
        },
    });
    const room = await Room.findById(roomId);
    if (!room) {
        return res.status(404).send();
    }

    const audio = new Audio({
        id_user: req.user_id,
        name: req.body.name,
        path: uploadPath + "/" + req.file.filename,
        id: custom_id,
    })
    await audio.save();
    return res.status(201).json({
        message: "Votre audio a bien été ajouter à la queue",
        room: room
    });
}

exports.createLink = async (req, res) => {
    const roomId = req.params.id;
    let custom_id = uuidv4();

    await Room.findByIdAndUpdate(roomId, {
        $push: {
            items: {
                _id: custom_id,
                name: req.body.name,
                url: req.body.link,
                type: "url",
                filename: req.body.name,
            },
        },
    });
    const room = await Room.findById(roomId);
    if (!room) {
        return res.status(404).send();
    }
    const audio = new Audio({
        id_user: req.user_id,
        name: req.body.name,
        path: req.body.link,
        id: custom_id,
    })
    await audio.save();
    return res.status(201).json({
        message: "Votre audio a bien été ajouter à la queue",
        room: room
    });
}

exports.getMediasRoom = async (req, res) => {
    const roomId = req.params.id;
    await Audio.find({ id_room: roomId }).then((data) => {
        if (!data) res.status(404).send({ message: "Not found" });
        else
            res.status(200).send({
                data
            });
    });
}

exports.getMediaRoom = async (req, res) => {
    const mediaItemId = req.params.id;
    const room_id = req.query.party;
    try {
        const room = await Room.findOne({ _id: room_id });
        if (!room) {
            return res.status(404).send();
        }
        const wantedItem = room.items.find(
            (itemId) => itemId._id === mediaItemId
        )
        if (!wantedItem) {
            return res.status(404).send();
        }
        const mediaItem = await Audio.findOne({ id: mediaItemId });
        if (!mediaItem) {
            return res.status(404).send();
        }
        return res.sendFile(getFilePathFromId(mediaItem.path));
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.modifyRoomMedia = async (req, res) => {
    const roomId = req.params.id;
    const items = req.params.items;
    const media = await Audio.findOne({ _id: items });
    const room = await Room.findById(roomId);

    if (!room) return res.status(404).send({ message: "No room found" })
    if (!media) return res.status(404).send({ message: "No media found" })

    await room.items.push({
        _id: media.id,
        name: media.name,
        url: media.path,
        filename: media.name,
    });
    await room.save();
    return res.status(201).json({
        room
    });
}

exports.modifyMediaRoom = async (req, res) => {
    const room_id = req.params.id;
    const new_media = req.body.metadata;

    const room = await Room.findById
        (room_id);
    if (!room) {
        return res.status(404).send();
    }
    room.items = new_media;
    await room.save();
    return res.status(200).json({ room });

}


exports.getMediaUser = async (req, res) => {
    const user_id = req.user_id;
    await Audio.find({ id_user: user_id }).then((data) => {
        if (!data) res.status(404).send({ message: "Not found" });
        else
            res.status(200).send({
                data,
            });
    });
}

exports.deleteAudio = async (req, res) => {
    const idAudio = req.params.id;
    try {
        const audio = await Audio.findByIdAndDelete(idAudio);
        if (!audio) {
            return res.status(404).send();
        }
        try {
            fs.unlinkSync(audio.path)
        } catch (err) {
            console.error(err)
        }
        return res.status(204).send({ succes: true });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", code: 400, data: [error] });
    }
};


exports.deleteAudioRoom = async (req, res) => {
    const audio_id = req.params.id;
    const room_id = req.params.idRoom;
    try {
        await Room.findByIdAndUpdate(room_id, {
            $pull: {
                items: {
                    _id: audio_id,
                },
            },
        });
        const room = await Room.findById(room_id);
        if (!room) {
            return res.status(404).send();
        }
        return res.status(201).json({ room });
    } catch (e) {
        res.status(400).json({ message: "Bad Request", code: 400, data: [e] });
    }
};
