"use client"
import React, {useContext, useEffect, useState} from 'react';
import {Question, Quiz, QuizContext} from './QuizContext';


const CreateQuiz: React.FC = () => {
    const {addQuiz} = useContext(QuizContext);
    const [title, setTitle] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [publicQuiz, setPublicQuiz] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setQuestions(Array(numQuestions).fill({
            question: '',
            answers: Array(4).fill(''),
            correctAnswers: Array(4).fill(false)
        }));
    }, [numQuestions]);

    const handleQuestionChange = (index: number, question: string) => {
        const newQuestions = [...questions];
        newQuestions[index].question = question;
        setQuestions(newQuestions);
    };

    const handleMultipleCorrectChange = (questionIndex: number, multipleCorrect: boolean) => {
        if (questions[questionIndex]) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].multipleCorrect = multipleCorrect;
            setQuestions(newQuestions);
        }
    };

    const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = Number(e.target.value);
        if (num > 10) {
            num = 10;
        }
        setNumQuestions(num);
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number, answer: string, correct: boolean) => {
        if (questions[questionIndex]) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].answers[answerIndex] = answer;
            newQuestions[questionIndex].correctAnswers[answerIndex] = correct;
            setQuestions(newQuestions);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title || numQuestions === 0 || questions.some(q => !q.question || q.answers.length === 0 || q.correctAnswers.length === 0) || (!publicQuiz && !code)) {
            setError('Please fill in all fields');
            return;
        }

        const newQuiz: Quiz = {title, questions, public: publicQuiz, code};
        addQuiz(newQuiz);

        setTitle('');
        setNumQuestions(0);
        setQuestions([]);
        setPublicQuiz(false);
        setCode('');
        setError('');

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].multipleCorrect && !questions[i].correctAnswers.includes(true)) {
                setError(`Multiple Choice questions ${i + 1} must have at least one correct answer.`);
                return;
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Quiz Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
                Number of Questions:
                <input type="number" value={numQuestions} onChange={handleNumQuestionsChange}/>
            </label>
            <label>
                Public:
                <input type="checkbox" checked={publicQuiz} onChange={(e) => setPublicQuiz(e.target.checked)}/>
            </label>
            {!publicQuiz && (
                <label>
                    Code:
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                </label>
            )}
            {Array.from({length: numQuestions}, (_, questionIndex) => (
                <div key={questionIndex}>
                    <label>
                        Multiple Correct Answers:
                        <input type="checkbox"
                               onChange={(e) => handleMultipleCorrectChange(questionIndex, e.target.checked)}/>
                    </label>
                    <label>
                        Question {questionIndex + 1}:
                        <input type="text"
                               onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}/>
                    </label>
                    {Array.from({length: questions[questionIndex]?.multipleCorrect ? 4 : 1}, (_, answerIndex) => (
                        <div key={answerIndex}>
                            <label>
                                Answer {answerIndex + 1}:
                                <input type="text"
                                       onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value, questions[questionIndex]?.correctAnswers[answerIndex])}/>
                            </label>
                            {questions[questionIndex]?.multipleCorrect && (
                                <label>
                                    Correct:
                                    <input type="checkbox"
                                           checked={questions[questionIndex]?.correctAnswers[answerIndex]}
                                           onChange={(e) => handleAnswerChange(questionIndex, answerIndex, questions[questionIndex]?.answers[answerIndex], e.target.checked)}/>
                                </label>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Create Quiz</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateQuiz;