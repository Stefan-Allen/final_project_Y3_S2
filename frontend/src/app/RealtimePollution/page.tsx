"use client"
import React from 'react';
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';

interface Props {
}

const BasicPage: React.FC<Props> = () => {
    return (
        <DarkModeProvider>
            <div>
                <h1>Welcome to the Basic Page</h1>
                <p>This is a basic TypeScript React page.</p>
            </div>
        </DarkModeProvider>
    );
};

export default BasicPage;