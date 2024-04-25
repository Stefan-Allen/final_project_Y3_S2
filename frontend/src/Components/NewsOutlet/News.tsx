import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DarkModeProvider} from '../../Components/NavBar/DarkModeProvider';
import styles from '../../app/page.module.css';

interface Article {
    title: string;
    description: string;
    url: string;
}

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'pollution',
                        language: 'en',
                        sortBy: 'publishedAt',
                        apiKey: 'ac10bff0d89b447d9c801a09eadce5df'
                    }
                });

                setArticles(response.data.articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNews();
    }, []);

    return (
        <DarkModeProvider>
            <h1 className={styles.ArticleHeading}>The Latest News about pollution around the world.</h1>
            <h4 className={styles.ArticleUnderHeading}>Shows 30 news posts.</h4>
            <div className={styles.NewsScroll}>
                {articles.slice(0, 30).map((article, index) => (
                    <div key={index}>
                        <div className={styles.articles}>
                            <h2 className={styles.article}>{article.title}</h2>
                            <p className={styles.description}>{article.description}</p>
                            <a className={styles.articleurl} href={article.url}>Read more</a>

                        </div>

                    </div>
                ))}
                <div className={styles.Whitespace}></div>
            </div>
        </DarkModeProvider>
    );
};

export default NewsPage;