import { Form, FormControl, InputGroup } from 'react-bootstrap';
import './../style.css'

const SendMessageForm = ({ handleSend, newMessage, setNewMessage }) => {
    return (
        <div>
            <Form className="msg-inputarea" onSubmit={e => { e.preventDefault(); handleSend(); setNewMessage('') }}>
                <InputGroup className="msg-input">
                    <FormControl className="msg-input" type="user" placeholder="message..."
                        onChange={e => setNewMessage(e.target.value)} value={newMessage} />
                </InputGroup>
            </Form>
        </div>
    )
}

export default SendMessageForm;