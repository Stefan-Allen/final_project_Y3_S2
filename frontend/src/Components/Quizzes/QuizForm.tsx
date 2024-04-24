import React, {useEffect, useState} from 'react';

interface Quiz {
    name: string;
    questions: { question: string; answer: string }[];
}

const QuizForm: React.FC = () => {
    const [name, setName] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [questions, setQuestions] = useState<{ question: string; answer: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state variable for the search term
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch('http://localhost:5005/Quiz');

                if (!res.ok) {
                    throw new Error('Failed to fetch quizzes');
                }

                const data = await res.json();
                setQuizzes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        setQuestions(Array.from({length: numQuestions}, () => ({question: '', answer: ''})));
    }, [numQuestions]);

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (quizzes.some(quiz => quiz.name === name)) {
            alert('A quiz with this name already exists. Please choose a different name.');
            return;
        }

        const quiz = {
            name,
            questions: questions.map(q => ({QuestionText: q.question, Answer: q.answer}))
        };

        try {
            const res = await fetch('http://localhost:5005/Quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quiz),
            });

            if (!res.ok) {
                throw new Error('Failed to send the quiz');
            }

            // Refresh the page after the form is submitted successfully
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    // Filter quizzes based on search term
    const filteredQuizzes = quizzes.filter(quiz => quiz.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div>Quizzes</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Number of Questions:
                    <input type="number" value={numQuestions}
                           onChange={(e) => setNumQuestions(Number(e.target.value))}/>
                </label>
                {questions.map((_, index) => (
                    <div key={index}>
                        <label>
                            Question {index + 1}:
                            <input type="text" value={questions[index].question}
                                   onChange={(e) => handleQuestionChange(index, e.target.value)}/>
                        </label>
                        <label>
                            Answer {index + 1}:
                            <input type="text" value={questions[index].answer}
                                   onChange={(e) => handleAnswerChange(index, e.target.value)}/>
                        </label>
                    </div>
                ))}
                <button type="submit"
                        disabled={!name || numQuestions === 0 || questions.some(q => !q.question || !q.answer)}>
                    Submit
                </button>
            </form>
            <div>View All Quizzes</div>
            <input type="text" placeholder="Search for a quiz" value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}/>
            {filteredQuizzes.map((quiz, index) => (
                <div key={index}>
                    {quiz.questions.map((question, qIndex) => (
                        <div key={qIndex}>
                            <div>
                                <div>{quiz.name}</div>
                            </div>
                            <button onClick={() => setShowAnswer(!showAnswer)}>
                                {showAnswer ? 'Hide Answer' : 'Show Answer'}
                            </button>
                            {showAnswer && <p>Answer: {question.answer}</p>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default QuizForm;