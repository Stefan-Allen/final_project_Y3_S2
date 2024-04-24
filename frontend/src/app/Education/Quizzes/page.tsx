"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';
import QuizForm from "@/Components/Quizzes/QuizForm";

const QuizPage: React.FC = () => {

    return (
        <DarkModeProvider>
            <Navbar/>
            <QuizForm/>
        </DarkModeProvider>
    );
};

export default QuizPage;