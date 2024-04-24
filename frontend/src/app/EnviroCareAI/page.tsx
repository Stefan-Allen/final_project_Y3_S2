"use client"
import React, { useState } from 'react';
import Navbar from "@/Components/NavBar/Navbar";

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const askAI = async () => {
        const result = await fetch('http://127.0.0.1:5000/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await result.json();
        setResponse(data);
    };

    return (
        <div>
            <Navbar />
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={askAI}>Ask</button>
            <p>{response}</p>
        </div>
    );
};

export default ChatBot;
