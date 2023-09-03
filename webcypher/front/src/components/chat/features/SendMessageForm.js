import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import './style.css'

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    return (
        <div>
            <Form className="footer-form" onSubmit={e => { e.preventDefault(); sendMessage(message); setMessage('') }}>
                <InputGroup className="input-group">
                    <FormControl className="input-group" type="user" placeholder="message..." onChange={e => setMessage(e.target.value)} value={message} />
                </InputGroup>
            </Form>
        </div>
    )
}

export default SendMessageForm;