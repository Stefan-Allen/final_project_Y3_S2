import React from 'react';

interface Props {
}

const BasicPage: React.FC<Props> = () => {
    return (
        <div>
            <h1>Welcome to the Basic Page</h1>
            <p>This is a basic TypeScript React page.</p>
        </div>
    );
};

export default BasicPage;