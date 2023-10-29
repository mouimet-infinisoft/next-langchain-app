'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [isChatOpen, setChatOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);
  return (
    <div>
      <button
        className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-500 text-white"
        onClick={() => setChatOpen(!isChatOpen)}
      >
        Chat
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 p-4 bg-white rounded shadow-lg flex flex-col" style={{ width: '300px', height: '400px' }}>
          <div className="bg-gray-300 p-2 font-bold">Chat</div>
          <div className="overflow-auto flex-grow p-2">
            {messages.length > 0
              ? messages.map(m => (
                <div key={m.id} className={`whitespace-pre-wrap p-2 rounded mb-2 ${m.role === 'user' ? 'bg-blue-200 text-blue-700 text-right ml-auto' : 'bg-gray-200 text-gray-700 mr-auto'}`}>
                  <div className="font-bold">{m.role === 'user' ? 'Vous' : 'iBrain'}</div>
                  {m.content}
                </div>
              ))
              : null}
            <div ref={messagesEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 border-t border-gray-300 pt-2">
            <input
              className="w-full border border-gray-300 rounded p-2"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      )}

    </div>

  );
}
