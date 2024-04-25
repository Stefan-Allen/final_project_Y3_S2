"use client"
import React, {useState} from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import styles from "../page.module.css";
import {DarkModeProvider} from '../../Components/NavBar/DarkModeProvider';

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
        <DarkModeProvider>
            <div>
                <Navbar/>
                <h1 className={styles.AIHeading}>EnviroCare AI</h1>
                <h3 className={styles.AIUnderHeading}>Ask me a generalized question about pollution </h3>
                <h4 className={styles.AIUnderHeading}>Example: What is co2</h4>
                <div className={styles.AIHight}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        askAI();
                    }}>
                        <input className={styles.AIInput}
                               type="text"
                               placeholder={"Ask me a question"}
                               value={input}
                               onChange={(e) => setInput(e.target.value)}
                        />
                        <button className={styles.AIButton} type="submit">Ask</button>
                    </form>
                    <p className={styles.AIResponse}>{response}</p>
                </div>
            </div>
        </DarkModeProvider>
    );
};

export default ChatBot;