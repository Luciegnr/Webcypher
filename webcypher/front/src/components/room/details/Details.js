import React, { useState, useEffect, useContext, useRef, useReducer, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import roomService from "@services/room";
import { SocketContext } from '@context/socket.context';
import ConnectedUsers from "@components/chat/ConnectedUser";
import Chat from "@components/chat/Chat";
import Queue from './features/playlist/Queue';
import Player from './features/Player';
import { URL } from "@services";
import ControlBar from './features/ControlBar';
import { Chip, Stack, Button } from "@mui/material";
import { DeleteIcon } from "@config/icons";
import { toast } from 'react-toastify';
import "./style.css";


function DetailsScreen() {
    let { id } = useParams();
    let socket = useContext(SocketContext);
    let props = useLocation()
    let { user } = props.state
    const [party, setParty] = useState(null);
    const [isVideo, setIsVideo] = useState(false);
    const [UserInRoom, setUserInRoom] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [reactPlayer, setReactPlayer] = useState(null);
    const [joinedParty, setJoinedParty] = useState(false);
    const [freshlyJoined, setFreshlyJoined] = useState(true);

    // NOTE call to room service to retrieve data of the room and set it to party
    const retrieveRooms = useCallback(() => {
        roomService.getOne(id).then((response) => {
            setParty(response.data.data);
        });
    }, [id]);

    useEffect(() => {
        retrieveRooms();
    }, [retrieveRooms]);

    const deleteRooms = (id) => {
        roomService.remove(id).then((response) => {
            socket.emit('remove-room', party);
        });
    }

    // return same color for same word tag
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = "#";
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).substr(-2);
        }
        return color;
    };


    // NOTE set and define all the player variable to the initial state
    const uiTimeoutShortDelay = 5000;
    const initialPlayerState = { playOrder: null, isPlaying: false, isFocused: true, isSeeking: false, isFullScreen: false, isSyncing: false, isBuffering: false, playlistIndex: 0, playingItem: null, duration: 0, sourceUrl: '', volume: 1 };
    const initialServerTimeOffset = 0;


    const playerStateReducer = (playerState, updatedProperties) => { return { ...playerState, ...updatedProperties }; };
    const [playerState, setPlayerState] = useReducer(playerStateReducer, initialPlayerState);
    const playerStateRef = useRef(playerState);
    playerStateRef.current = playerState;

    const initialPlayerTimeoutState = { actionMessageTimeoutId: null, actionMessageTimeoutDone: false, uiTimeoutId: null, uiTimeoutDelay: uiTimeoutShortDelay, uiTimeoutTimestamp: Date.now() };
    const playerTimeoutReducer = (playerTimeoutState, updatedProperties) => {
        return { ...playerTimeoutState, ...updatedProperties };
    };
    const [playerTimeoutState] = useReducer(playerTimeoutReducer, initialPlayerTimeoutState);

    const playerTimeoutStateRef = useRef(playerTimeoutState);
    playerTimeoutStateRef.current = playerTimeoutState;

    // NOTE Set the music change when admin change the music or the position of the music. We use socket to emit the change and then retrieve for all the user in the room. 
    // NOTE (we used function of the react player library to get the duration and the current time of the music)
    const emitPlayWish = (mediaItem, isPlaying, lastPositionItemId, requestLastPosition, newPosition, noIssuer) => {
        if (socket && party && user) {
            const playWish = {
                partyId: party._id,
                issuer: noIssuer ? 'system' : user._id,
                mediaItemId: mediaItem._id,
                type: mediaItem.type,
                isPlaying: isPlaying,
                position: newPosition !== undefined ? newPosition : reactPlayer ? reactPlayer.getCurrentTime() / reactPlayer.getDuration() : 0,
                lastPosition: lastPositionItemId ? { itemId: lastPositionItemId, position: reactPlayer && reactPlayer.getDuration() > 300 && !noIssuer ? reactPlayer.getCurrentTime() / reactPlayer.getDuration() : 0 } : null,
                requestLastPosition: requestLastPosition,
                timestamp: Date.now()
            };
            socket.emit('playWish', playWish);
        }
    };

    // NOTE Set index of the laying media item in playlist
    const updatePlaylistIndex = useCallback((playlistItem) => {
        if (party && party.items.length) {
            const index = party.items.findIndex((listItem) => listItem._id === playlistItem._id);
            setPlayerState({ playlistIndex: index });
        }
    }, [party]);


    // NOTE function to check if the media is a video or a music, if it's a video we use the react player library to broadcast the video else we display the cover picture of the room
    const getSite = (url) => {
        let site = '';
        if (url.includes('youtube.') || url.includes('youtu.be')) {
            site = true;
        } else if (url.includes('facebook.')) {
            site = true;
        } else if (url.includes('vimeo.')) {
            site = true;
        } else if (url.includes('soundcloud.')) {
            site = false;
        } else if (url.includes('twitch.')) {
            site = true;
        } else if (url.includes('.mp3')) {
            site = false;
        } else if (url.includes('.mp4')) {
            site = 'mp4';
        }
        setIsVideo(site)
        return site;
    };


    // Update the playlist index when the playing item changes
    useEffect(() => {
        if (playerState.playingItem) {
            updatePlaylistIndex(playerState.playingItem);
        }
    }, [playerState.playingItem, updatePlaylistIndex]);


    useEffect(() => {
        if (socket && party && user) {
            // NOTE join the room and emit the user id and the room id with socket
            if (!joinedParty) {
                socket.emit('joinParty', { userId: user._id, partyId: party._id, timestamp: Date.now() });
                setJoinedParty(true);
            }
            // NOTE when the user join or when the admin change the music we retrieve the media item and the position of the music
            socket.off('playOrder');
            socket.on('playOrder', (playOrder) => {
                setPlayerState({ playOrder: playOrder });
                const playOrderItem = party.items.find((item) => { return item._id === playOrder.mediaItemId });

                // NOTE we use our function to check if the current media is a video or a music before to set to the player the source url
                if (getSite(playOrderItem.url) === false) {
                    let newSourceUrl;
                    newSourceUrl = 'http://localhost:4000/room/file/' + playOrder.mediaItemId + '?party=' + party._id;

                    setPlayerState({ playingItem: playOrderItem, sourceUrl: newSourceUrl, isSyncing: true });
                    updatePlaylistIndex(playOrderItem);
                } else if (getSite(playOrderItem.url) === 'mp4') {
                    let newSourceUrl;
                    newSourceUrl = 'http://localhost:4000/room/file/' + playOrder.mediaItemId + '?party=' + party._id;

                    setPlayerState({ playingItem: playOrderItem, sourceUrl: newSourceUrl, isSyncing: true });
                    updatePlaylistIndex(playOrderItem);
                } else {
                    setPlayerState({ playingItem: playOrderItem, sourceUrl: playOrderItem.url, isSyncing: true });
                    updatePlaylistIndex(playOrderItem);
                }

            });
            socket.on("mediaItemUpdate", async (data) => {
                await setParty(data);
                retrieveRooms();
            });
            socket.on("remove-room", async (data) => {
                window.location.href = "/liste-room";
            });

        }
    }, [socket, party, user, joinedParty, updatePlaylistIndex, retrieveRooms]);



    useEffect(() => {
        if (reactPlayer && reactPlayer.getInternalPlayer() && playerState.duration && playerState.playOrder && playerState.isSyncing && playerState.playingItem) {
            let offset = 0;
            if (freshlyJoined) {
                if (playerState.playOrder.isPlaying) {
                    offset = (Date.now() + initialServerTimeOffset - playerState.playOrder.timestamp) / (playerState.duration * 1000);
                }
                setFreshlyJoined(false);
            }

            reactPlayer.seekTo(playerState.playOrder.position + offset);
            const site = getSite(playerState.playingItem.url);
            setPlayerState({
                isSeeking: false,
                isPlaying: playerState.playOrder.isPlaying,
                isSyncing: false,
                isBuffering: playerState.playOrder.isPlaying && playerState.playOrder.type === 'web' && (site === 'youtube' || site === 'facebook' || playerState.playingItem.type === 'file')
            });
        }
    }, [reactPlayer, playerState, initialServerTimeOffset, freshlyJoined]);


    // NOTE Socket for the live chat of the room, we add the current user to the room then we retrieve the users in the room. We also retrieve the messages sent by the users
    const joinRoom = useCallback(() => {
        const username = user.username;
        const room = id;
        var user_id = user._id;
        socket.emit("join_room", { username, room, user_id });
        socket.on("chatroom_users", (data) => {
            setUserInRoom(data.chatRoomUsers);
        });

        socket.on("receive_message", (data) => {
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    senderId: data.senderId,
                    date: data.__createdtime__,
                },
            ]);
        });
    }, [socket, user, id]);

    useEffect(() => {
        joinRoom();
    }, [joinRoom]);

    // NOTE we send the message to the server and emit with socket for the other users 
    const sendMessage = async (message) => {
        try {
            const username = user.username;
            const room = id;
            const senderId = user._id;
            if (message.trim() !== "") {
                socket.emit("send_message", { room, username, message, senderId });
                message = "";
            } else {
                toast('Impossible d\'envoyer un message vide.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            {party && (

                <section id="page">
                    <header>
                        <div className="header">
                            <h2 className='mta'>Nom de la Room: {party.name}
                                <Stack className="mt5" direction="row" spacing={1}>
                                    {party.tag.map((tag) => (
                                        <Chip className="mb5" key={tag._id} label={tag.value} sx={{ color: hashCode(tag.value) }} variant="outlined" />
                                    ))}
                                </Stack>
                            </h2>
                            <div style={{ display: "flex" }} className='mta'>
                                {party && party.items && party.items.length > 0 && party.id_user !== user._id && (
                                    <Queue queue={party.items} party={party} retrieveRooms={retrieveRooms} playerState={playerState} current={playerState.playingItem} />
                                )}
                                {party && party.id_user === user._id && (
                                    <Queue queue={party.items} party={party} retrieveRooms={retrieveRooms} id={id} emitPlayWish={emitPlayWish} playerState={playerState} socket={socket} current={playerState.playingItem} />
                                )}
                                {party.id_user === user._id && (
                                    <Button className="button2" startIcon={<DeleteIcon />} onClick={() => deleteRooms(party._id)}></Button>
                                )}

                            </div>
                        </div>
                    </header>
                    <nav>
                        <Chat sendMessage={sendMessage} messages={messagesReceived} users={user} />
                    </nav>
                    <main>
                        <section className='room-display'>
                            {!isVideo ? (
                                <div>
                                    <img className="room-cover" alt="room-cover" src={`${URL}rooms/` + party.id_user + ".jpeg"} />
                                    <Player isvideo={false} playerState={playerState} party={party} socket={socket} emitPlayWish={emitPlayWish} setPlayerState={setPlayerState} setCurrentPosition={setCurrentPosition} setReactPlayer={setReactPlayer} />
                                </div>
                            ) : (
                                <Player isvideo={true} playerState={playerState} party={party} socket={socket} emitPlayWish={emitPlayWish} setPlayerState={setPlayerState} setCurrentPosition={setCurrentPosition} setReactPlayer={setReactPlayer} />
                            )}

                            {party && party.items && party.items.length > 0 && party.id_user === user._id && (
                                <ControlBar socket={socket} emitPlayWish={emitPlayWish} playerState={playerState} party={party} currentPosition={currentPosition} setPlayerState={setPlayerState} setCurrentPosition={setCurrentPosition} reactPlayer={reactPlayer} />
                            )}

                            {party && party.items && party.items.length > 0 && party.id_user !== user._id && (
                                <ControlBar emitPlayWish={emitPlayWish} playerState={playerState} party={party} currentPosition={currentPosition} setPlayerState={setPlayerState} setCurrentPosition={setCurrentPosition} reactPlayer={reactPlayer} />
                            )}
                        </section>
                        <div className="footer">
                            <ConnectedUsers users={UserInRoom} />
                        </div>
                    </main>

                </section>
            )}
        </>
    );
}

export default DetailsScreen;