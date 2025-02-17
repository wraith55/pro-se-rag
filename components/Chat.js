import { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        console.log("data", data);
        const botMessage = { text: data.reply.content, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false);
    };

    const botStyle = { 
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflow: 'auto',
        padding: '10px',
        overflowX: 'hidden',
        textAlign: 'right',
        marginLeft: 'auto',
        maxWidth: '80%',
        backgroundColor: '#7e6eff',
        borderRadius: '10px',
        color: 'white',
        marginBottom: '5px',
        marginTop: '5px'
    }
    const userStyle = {
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflow: 'auto',
        padding: '10px',
        overflowX: 'hidden',
        textAlign: 'left',
        marginRight: 'auto',
        maxWidth: '80%',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        marginBottom: '2px'
    }

    return (
        <div>
            <div
                style={{
                    height: '50%',
                    width: '80%',
                    overflow: 'auto',
                    border: '1px solid #ccc', // Optional: for visual clarity
                  }}
            >
                {messages.map((msg, index) => (
                    msg.sender === 'bot' ? (
                    <div key={index} className={msg.sender} style={botStyle}>
                        <pre style={{whiteSpace: 'pre-wrap'}}>{msg.text}</pre>
                    </div>
                    ) :
                    <div key={index} className={msg.sender} style={userStyle}>
                        <pre style={{whiteSpace: 'pre-wrap'}}>{msg.text}</pre>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                {loading ? 
                    <button type="submit" disabled={true}>ChatGPT is processing...</button> :
                    <button type="submit">Send</button> 
                }
                <div className='loader'></div>
            </form>
        </div>
    );
};

export default Chat;