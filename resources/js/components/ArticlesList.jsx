import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('/api/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Статьи</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <a href={`/articles/${article.id}`}>
                            {article.title}
                        </a>
                        <p>{article.content.substring(0, 100)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticlesList;

