import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('/api/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container>
            <h1 className="mb-4">Статьи</h1>
            <Row xs={1} md={2} className="g-4">
                {articles.map(article => (
                    <Col key={article.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <a href={`/articles/${article.id}`} className="text-dark">
                                        {article.title}
                                    </a>
                                </Card.Title>
                                <Card.Text>
                                    {article.content.substring(0, 100)}...
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ArticlesList;

