"use client"
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Question, Quiz, QuizContext} from './QuizContext';

const QuizDetails: React.FC = () => {
    const {quizzes} = useContext(QuizContext);
    const {quizId, code} = useParams<{ quizId?: string, code?: string }>();
    const [selectedAnswers, setSelectedAnswers] = useState<boolean[][]>([]);
    const [submitted, setSubmitted] = useState(false);

    let quiz: Quiz | undefined;
    if (code) {
        quiz = quizzes.find((quiz) => quiz.code === code);
    } else if (quizId !== undefined) {
        quiz = quizzes[Number(quizId)];
    }

    // Initialize selectedAnswers whenever the selected quiz changes
    useEffect(() => {
        if (quiz) {
            setSelectedAnswers(quiz.questions.map(() => Array(quiz.questions.length).fill(false)));
        }
    }, [quiz]);

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number, selected: boolean) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex][answerIndex] = selected;
        setSelectedAnswers(newSelectedAnswers);
    };

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.slice(0, 10).map((question: Question, index: number) => (
                <div key={index}>
                    <p>{question.question}</p>
                    <p>{question.answers}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizDetails;