import React, { useState, useEffect, useRef } from "react";
import SendMessageForm from './SendMessageForm';
import User from "@services/user";
import './style.css'

const MessageContainer = ({ messages, sendMessage }) => {
    const messageRef = useRef();
    const [user, setUser] = useState([]);
    const messagesColumnRef = useRef(null);

    const retrieveAccount = () => {
        User.get().then((response) => {
            setUser(response.data);
        });
    };

    const convertTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    useEffect(() => {
        retrieveAccount();
    }, []);

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
        <section className="msg">
            <main className="msg-chat">
                <div className="msg-column" ref={messagesColumnRef}>
                    {messages.map((m, index) =>
                        <div className={`msg-buble-container ${m.senderId === user._id ? "right" : "left"}-msg`} key={index} >
                            <div className="msg-bubble">
                                <div className="msg-info">
                                    <div className="msg-info-name">{m.username}</div>
                                    <div className="msg-info-time"> {convertTime(m.date)}</div>
                                </div>
                                <div>
                                    <div>
                                        <div>{m.message}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </main>
            <SendMessageForm sendMessage={sendMessage} />
        </section>
    );
}

export default MessageContainer;