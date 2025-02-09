import { useState } from 'react';
import Chat from '../components/Chat';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, { text: data.response, sender: 'chatgpt' }]);
  };

  return (
    <div className={styles.container}>
      <h1>Chat with ChatGPT</h1>
      <Chat messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}