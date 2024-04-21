"use client"
import React, {useContext, useState} from 'react';
import {QuizContext} from './QuizContext';
import {Link, useNavigate} from 'react-router-dom';

const DisplayQuiz: React.FC = () => {
    const {quizzes} = useContext(QuizContext);
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const quiz = quizzes.find((quiz) => quiz.code === code);

        if (quiz) {
            navigate(`/quiz/code/${code}`);
        } else {
            // Show an error message
            alert('Invalid code');
        }
    };


    return (
        <div>
            {quizzes.filter((quiz) => quiz.public).map((quiz, index) => (
                <div key={index}>
                    <Link to={`/quiz/${index}`}>{quiz.title}</Link>
                </div>
            ))}
            <form onSubmit={handleCodeSubmit}>
                <label>
                    Enter a code to view a private quiz:
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                </label>
                <button type="submit">View Quiz</button>
            </form>
        </div>
    );
};

export default DisplayQuiz;