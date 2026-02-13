import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ArticleDetail = ({}) => {
    const [article, setArticle] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/articles/${id}`)
            .then(response => setArticle(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!article) return <div className="text-center mt-5">Загрузка...</div>;

    return (
        <Container>
            <Row className="mt-5">
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>{article.content}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <h4 className="mb-3">Комментарии</h4>
                    <CommentList
                        articleId={article.id}
                        comments={article.comments}
                    />
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
                </Col>
            </Row>
        </Container>
    );
};

export default ArticleDetail;
