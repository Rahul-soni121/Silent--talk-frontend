import React, { useState } from 'react';
import { sendMessage } from './api';

function App() {
  const [meta, setMeta] = useState({ name: '', age: '', relationship: '', photo: '' });
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message) return;
    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');
    const reply = await sendMessage(message, meta);
    setChat([...newChat, { role: 'bot', content: reply }]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Silent Talks: Dil Se Dil Tak</h1>
      {!meta.name ? (
        <div className="space-y-2">
          <input className="border p-2 w-full" placeholder="Name of the person" onChange={e => setMeta({ ...meta, name: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Age" onChange={e => setMeta({ ...meta, age: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Relationship" onChange={e => setMeta({ ...meta, relationship: e.target.value })} />
          <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setMeta({ ...meta, name: meta.name })}>Start Chat</button>
        </div>
      ) : (
        <div>
          <div className="border h-80 overflow-y-auto p-2 mb-2 bg-white rounded shadow">
            {chat.map((c, i) => (
              <div key={i} className={`mb-2 ${c.role === 'user' ? 'text-right' : 'text-left text-gray-600'}`}>
                <span>{c.content}</span>
              </div>
            ))}
          </div>
          <input
            className="border p-2 w-full"
            placeholder="Type your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
        </div>
      )}
    </div>
  );
}

export default App;