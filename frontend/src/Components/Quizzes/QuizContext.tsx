"use client"
import React from 'react';

export type Question = {
    question: string;
    answers: string[];
    correctAnswers: boolean[];
    multipleCorrect: boolean; // New property
};

export type Quiz = {
    title: string;
    questions: Question[];
    public: boolean;
    code: string;
};

type QuizContextType = {
    quizzes: Quiz[];
    addQuiz: (quiz: Quiz) => void;
};

export const QuizContext = React.createContext<QuizContextType>({
    quizzes: [],
    addQuiz: () => {
    },
});