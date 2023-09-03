import React from "react";
import './style.css'


function ConvBulle({ conversation, hide, getcurrent }) {
    return (
        <div>
            {conversation.users[1].unread === 0 ? "" : conversation.users[1].unread !== 0 && hide === 'false' ?
                <span className="bubble-notif">
                    {conversation.users[1].unread !== 0 ? conversation.users[1].unread : conversation.users[0].unread !== 0 ? conversation.users[0].unread : ""}
                </span> : ""
            }
        </div>
    )
};
export default ConvBulle;