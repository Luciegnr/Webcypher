import React, { useState, useEffect, useContext, useRef } from "react";
import ServiceAvatar from "@services/avatar";
import Avatar from '@mui/material/Avatar';
import { SocketContext } from '@context/socket.context.js';
import { get_all, post } from '@services/chat'

import AvatarModel from "react-nice-avatar";
import { PersonIcon } from "@config/icons";
import SendMessageForm from './SendMessageForm';
import User from "@services/user";
import './style.css'

const MessageContainer = ({ userInConv, setSendMessage, receivedMessage, chat, currentUser, getChats }) => {
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userAvatar, setUserAvatar] = useState([]);
    const messagesColumnRef = useRef(null);
    const messageRef = useRef();



    const socket = useContext(SocketContext);


    const retrieveAccount = () => {
        User.get().then((response) => {
            setUser(response.data);
        });
    };

    const getUserAvatar = () => {
        ServiceAvatar.get().then((response) => {
            if (response.data) {
                console.log(response.data.hairStyle)
                setUserAvatar(response.data)
                console.log(response.data)
            }
        });
    }
    useEffect(() => {
        retrieveAccount();
        getUserAvatar();
    }, []);

    const convertTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    useEffect(() => {
        const userId = chat?.users?.find((user) => user.id !== currentUser._id);
        const getUserData = async () => {
            try {

            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await get_all(chat._id);
                console.log(chat)
                setMessages(data);
                socket.emit('update-seen-message', { conversation_id: chat._id, receiver_id: currentUser._id })
                getChats()
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) fetchMessages();
    }, [chat]);




    const handleSend = async (e) => {
        const receiver = chat.users.find((user) => user.id !== currentUser._id);
        let receiver_id = receiver.id;
        const message = {
            sender: currentUser._id,
            text: newMessage,
            conversation_id: chat._id,
            receiver: receiver_id
        }

        try {
            const { data } = await post(message);
            console.log(data)
            setSendMessage({ data })
            setMessages([...messages, data]);
            setNewMessage("");
        } catch {
            console.log("error")
        }
    }
    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.conversation_id === chat._id) {
            setMessages([...messages, receivedMessage]);
            console.log("Message Arrived: ", receivedMessage)
            socket.emit('update-seen-message', { conversation_id: chat._id, receiver_id: currentUser._id })
            getChats()
        }

    }, [receivedMessage])

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messages]);

    return (
        <section>
            <main>
                <div className="msg-column" ref={messagesColumnRef}>
                    {messages.map((m, index) =>
                        <div className={`msg ${m.sender === user._id ? "right" : "left"}-msg`} key={index}>
                            {
                                m.sender === user._id ?
                                    userAvatar != null && userAvatar.length !== 0 ?
                                        <AvatarModel style={{ width: '3rem', height: '3rem', textAlign: 'left', marginLeft: '1vw' }} className="avatar" bgColor={userAvatar.bgColor} hairStyle={userAvatar.hairStyle} hatColor={userAvatar.hatColor} hatStyle={userAvatar.hatStyle} mouthStyle={userAvatar.mouthStyle} noseStyle={userAvatar.noseStyle} shirtStyle={userAvatar.shirtStyle} shirtColor={userAvatar.shirtColor} glassesStyle={userAvatar.glassesStyle} faceColor={userAvatar.faceColor} eyeStyle={userAvatar.eyesStyle} earSize={userAvatar.earstyle} hairColor={userAvatar.hairColor} />
                                        :
                                        <Avatar style={{ width: '3rem', height: '3rem', textAlign: 'left', marginLeft: '1vw' }}>
                                            <PersonIcon sx={{ fontSize: 40 }} />
                                        </Avatar>
                                    :

                                    userInConv[0].id !== user._id ?
                                        userInConv[0].avatar != null ?
                                            <AvatarModel style={{ width: '3rem', height: '3rem', textAlign: 'left', marginRight: '1vw' }} className="avatar" bgColor={userInConv[0].avatar.BgColor} hairStyle={userInConv[0].avatar.HairStyle} hatColor={userInConv[0].avatar.HatColor} hatStyle={userInConv[0].avatar.HatStyle} mouthStyle={userInConv[0].avatar.MouthStyle} noseStyle={userInConv[0].avatar.NoseStyle} shirtStyle={userInConv[0].avatar.ShirtStyle} shirtColor={userInConv[0].avatar.ShirtColor} glassesStyle={userInConv[0].avatar.GlassesStyle} faceColor={userInConv[0].avatar.FaceColor} eyeStyle={userInConv[0].avatar.EyesStyle} earSize={userInConv[0].avatar.EarSize} hairColor={userInConv[0].avatar.HairColor} />
                                            :
                                            <Avatar style={{ width: '3rem', height: '3rem', textAlign: 'left', marginRight: '1vw' }}>
                                                <PersonIcon sx={{ fontSize: 40 }} />
                                            </Avatar>
                                        :
                                        userInConv[1].avatar != null ?
                                            <AvatarModel style={{ width: '3rem', height: '3rem', textAlign: 'left', marginRight: '1vw' }} className="avatar" bgColor={userInConv[1].avatar.BgColor} hairStyle={userInConv[1].avatar.HairStyle} hatColor={userInConv[1].avatar.HatColor} hatStyle={userInConv[1].avatar.HatStyle} mouthStyle={userInConv[1].avatar.MouthStyle} noseStyle={userInConv[1].avatar.NoseStyle} shirtStyle={userInConv[1].avatar.ShirtStyle} shirtColor={userInConv[1].avatar.ShirtColor} glassesStyle={userInConv[1].avatar.GlassesStyle} faceColor={userInConv[1].avatar.FaceColor} eyeStyle={userInConv[1].avatar.EyesStyle} earSize={userInConv[1].avatar.EarSize} hairColor={userInConv[1].avatar.HairColor} />
                                            :
                                            <Avatar style={{ width: '3rem', height: '3rem', textAlign: 'left', marginRight: '1vw' }}>
                                                <PersonIcon sx={{ fontSize: 40 }} />
                                            </Avatar>
                            }
                            <div className="msg-bubble" style={{ marginRight: '10px', marginLeft: '10px' }}>
                                <div className="msg-info">
                                    <div className="msg-info-name" style={{ marginRight: '10px' }}> {m.sender === userInConv[0].id ? userInConv[0].username : m.sender === userInConv[1].id ? userInConv[1].username : ""}</div>

                                    <div className="msg-info-time"> {convertTime(m.createdAt)}</div>
                                </div>
                                <div>
                                    <div>
                                        <div>{m.text}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <SendMessageForm handleSend={handleSend} setNewMessage={setNewMessage} newMessage={newMessage} />
        </section>
    );
}

export default MessageContainer;