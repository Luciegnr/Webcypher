import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Grid, styled, Avatar, Divider } from '@mui/material';
import AvatarModel from "react-nice-avatar";
import { SocketContext } from '@context/socket.context.js';
import { SearchIcon, PersonIcon, CircleIcon } from "@config/icons";
import { conversation_get_all } from '@services/chat'
import User from "@services/user";
import Chat from './features/ChatScreen';
import ConvBulle from './features/ConversationBubble';
import ServiceAvatar from "@services/avatar";
import './style.css'

function ChatScreen() {
    const [searchTerm, setSearchTerm] = useState("");
    const [conversations, setConversation] = useState([]);
    const [userAvatar, setUserAvatar] = useState([]);
    const [currentConversation, setCurrentConversation] = useState('');
    const [currentUserInConversation, setCurrentUserInConv] = useState('');
    const [user, setGetUser] = useState([]);
    const socket = useContext(SocketContext);

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);

    const getChats = async () => {
        try {
            const { data } = await conversation_get_all();
            setConversation(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getChats();
    }, [user._id]);


    useEffect(() => {
        socket.emit("new-user-add", user._id);
        socket.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);


    useEffect(() => {
        if (sendMessage !== null) {
            console.log("sendMessage")
            socket.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    useEffect(() => {
        socket.on("recieve-message", (data) => {
            setReceivedMessage(data);
            getChats();
            console.log("recieve-message")
        });
    }, []);

    const checkOnlineStatus = (chat) => {
        const otherUser = chat.users.find((member) => member.id !== user._id);
        const isOnline = onlineUsers.find((user) => user.userId === otherUser.id);
        return isOnline ? true : false;
    };


    const retrieveUser = () => {
        return Promise.all([User.get()]).then(async (response) => {
            await setGetUser(response[0].data);
        }).catch((e) => {
            console.log(e);
        })
    };
    const setConversationId = async (conversation, conversation_id, userInConv) => {
        await setCurrentConversation(conversation);
        await setCurrentUserInConv(userInConv);

    };

    useEffect(() => {
        retrieveUser();
    }, []);

    const getUserAvatar = () => {
        ServiceAvatar.get().then((response) => {
            if (response) {
                setUserAvatar(response.data)
            }
        });
    };

    useEffect(() => {
        retrieveUser();
        getUserAvatar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#211625",
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
    }));

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <Box sx={{ flexGrow: 1, pl: 3 }} className='main-container'>
            <div className="main-column-conv">
                <div className='header' >
                    <div className="profile">
                        {userAvatar.length !== 0 && userAvatar != null ?
                            <AvatarModel className="avatar" bgColor={userAvatar.bgColor} hairStyle={userAvatar.hairStyle} hatColor={userAvatar.hatColor} hatStyle={userAvatar.hatStyle} mouthStyle={userAvatar.mouthStyle} noseStyle={userAvatar.noseStyle} shirtStyle={userAvatar.shirtStyle} shirtColor={userAvatar.shirtColor} glassesStyle={userAvatar.glassesStyle} faceColor={userAvatar.faceColor} eyeStyle={userAvatar.eyesStyle} earSize={userAvatar.earstyle} hairColor={userAvatar.hairColor} />
                            : <Avatar className="avatar">
                                <PersonIcon sx={{ fontSize: 40 }} />
                            </Avatar>

                        }
                        <div className="text">
                            <h3>{user.username}</h3>
                            <p>Active</p>
                        </div>
                    </div>
                    <div className="searchBar">
                        <SearchIcon />
                        <input type="text" name="searchBar" id="searchBar" placeholder="Rechercher un utilisateur" onChange={handleSearchTerm} />
                    </div>
                </div>
                <Divider className='divider' />
                <Grid className='list' container direction="column" justifyContent="center" alignItems="stretch">
                    {conversations.filter((conversation) => {
                        return conversation.users[1].username.toLowerCase().includes(searchTerm.toLowerCase());
                    }).map((conversation, index) =>
                        <Grid item key={index} onClick={() => { setConversationId(conversation, conversation._id, conversation.users) }}>
                            <Item>
                                <div className='item'>
                                    {
                                        (conversation.users[1].avatar != null) ?
                                            <AvatarModel className='avatar' bgColor={conversation.users[1].avatar.BgColor} hairStyle={conversation.users[1].avatar.HairStyle} hatColor={conversation.users[1].avatar.HatColor} hatStyle={conversation.users[1].avatar.HatStyle} mouthStyle={conversation.users[1].avatar.MouthStyle} noseStyle={conversation.users[1].avatar.NoseStyle} shirtStyle={conversation.users[1].avatar.ShirtStyle} shirtColor={conversation.users[1].avatar.ShirtColor} glassesStyle={conversation.users[1].avatar.GlassesStyle} faceColor={conversation.users[1].avatar.FaceColor} eyeStyle={conversation.users[1].avatar.EyesStyle} earSize={conversation.users[1].avatar.EarSize} hairColor={conversation.users[1].avatar.HairColor} hairColorRandom />
                                            : (conversation.users[0].avatar != null) ?
                                                <AvatarModel className='avatar' bgColor={conversation.users[0].avatar.BgColor} hairStyle={conversation.users[0].avatar.HairStyle} hatColor={conversation.users[0].avatar.HatColor} hatStyle={conversation.users[0].avatar.HatStyle} mouthStyle={conversation.users[0].avatar.MouthStyle} noseStyle={conversation.users[0].avatar.NoseStyle} shirtStyle={conversation.users[0].avatar.ShirtStyle} shirtColor={conversation.users[0].avatar.ShirtColor} glassesStyle={conversation.users[0].avatar.GlassesStyle} faceColor={conversation.users[0].avatar.FaceColor} eyeStyle={conversation.users[0].avatar.EyesStyle} earSize={conversation.users[0].avatar.EarSize} hairColor={conversation.users[0].avatar.HairColor} />
                                                : <Avatar className='avatar'>
                                                    <PersonIcon sx={{ fontSize: 40 }} />
                                                </Avatar>
                                    }
                                    <div className='text'>
                                        <h3>{user._id !== conversation.users[0].id ? conversation.users[0].username : conversation.users[1].username}
                                            <ConvBulle getcurrent={currentConversation} hide={currentConversation === conversation._id ? 'true' : 'false'} conversation={conversation} />
                                        </h3>
                                        {checkOnlineStatus(conversation) && <div className="online-dot d-flex"> <CircleIcon color="success" /> <p className="ml5">En ligne</p></div>}
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    )}
                </Grid>
            </div>
            <div className='chatscreen'>
                {currentConversation ?
                    <Chat getChats={getChats} chat={currentConversation}
                        currentUser={user} setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage} visitorAvatar userInConv={currentUserInConversation} /> :
                    <div className='no-current'>
                        <h1>Ouvrez une conversation pour commencer à discuter</h1>
                    </div>
                }
            </div>
        </Box>
    )
}

export { ChatScreen }