"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import DisplayQuiz from "../../../Components/Quizzes/DisplayQuiz";
import QuizForm from "../../../Components/Quizzes/QuizForm";
import {QuizProvider} from "../../../Components/Quizzes/QuizProvider";
import QuizDetails from "../../../Components/Quizzes/QuizDetails";
import Navbar from "@/Components/NavBar/Navbar";
import {Route, Routes} from 'react-router-dom';

const Router = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), {ssr: false});

const QuizPage: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div>
                <Router>
                    <QuizProvider>
                        <Routes>
                            <Route path="/quiz/code/:code" element={<QuizDetails/>}/>
                            <Route path="/quiz/:quizId" element={<QuizDetails/>}/>
                            <Route path="/Education/Quizzes" element={<><DisplayQuiz/><QuizForm/></>}/>
                            <Route path="/Quizzes" element={<><DisplayQuiz/><QuizForm/></>}/>
                            <Route path="/" element={<><DisplayQuiz/><QuizForm/></>}/>
                        </Routes>
                    </QuizProvider>
                </Router>
            </div>
        </>
    );
};

export default QuizPage;