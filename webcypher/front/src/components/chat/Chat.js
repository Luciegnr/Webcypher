import MessageContainer from './features/MessageContainer';
import './style.scss'

const Chat = ({ sendMessage, messages }) =>
    <div className='chat-container' >
        <div className='chat'>
            <MessageContainer sendMessage={sendMessage} messages={messages} />
        </div>
    </div>

export default Chat;