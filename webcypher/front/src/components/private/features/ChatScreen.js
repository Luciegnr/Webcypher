import MessageContainer from './MessageContainer';

const Chat = ({ setSendMessage, receivedMessage, chat, currentUser, getChats, userInConv }) => <div>
    <div>
        <MessageContainer userInConv={userInConv} setSendMessage={setSendMessage} receivedMessage={receivedMessage} chat={chat} currentUser={currentUser} getChats={getChats} />
    </div>
</div>

export default Chat;