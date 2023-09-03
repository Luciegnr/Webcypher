
const ConvBulle = ({ conversation, hide, id }) => <div>
    <div>
        {
            conversation.users[1].unread !== "0" ||
                conversation.users[0].unread !== "0" ?
                <span style={{ color: "#fff", backgroundColor: "#f5424e", fontSize: "11px", padding: "3px 10px", margin: "-5px 0px 0px 10px", borderRadius: "10px" }}>
                    {conversation.users[1].unread !== 0 ? conversation.users[1].unread : conversation.users[0].unread !== 0 ? conversation.users[0].unread : ""}
                </span>
                : ""
        }
    </div>
</div >

export default ConvBulle;