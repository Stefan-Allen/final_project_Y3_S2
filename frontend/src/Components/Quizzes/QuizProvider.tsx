"use client"
import React, {useState} from 'react';
import {Quiz, QuizContext} from './QuizContext';

export const QuizProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const addQuiz = (quiz: Quiz) => {
        setQuizzes([...quizzes, quiz]);
    };

    return (
        <QuizContext.Provider value={{quizzes, addQuiz}}>
            {children}
        </QuizContext.Provider>
    );
};