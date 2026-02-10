import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const ArticleDetail = ({}) => {
    const [article, setArticle] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/articles/${id}`)
            .then(response => setArticle(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!article) return <div>Загрузка...</div>;

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <CommentList articleId={article.id} comments={article.comments} />
            {/*<CommentForm articleId={article.id} />*/}
            <CommentForm
                articleId={article.id}
                onSubmit={(newComment) => {
                    // Обновляем комментарии без перезапроса всей статьи
                    setArticle(prev => ({
                        ...prev,
                        comments: [...prev.comments, newComment]
                    }));
                }}
            />
        </div>
    );
};

export default ArticleDetail;
