import React from 'react';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';

const CommentList = ({
                         // articleId,
                         comments
}) => {
    if (comments.length === 0) {
        return (
            <p className="text-muted text-center mt-4">
                Комментариев пока нет
            </p>
        );
    }

    return (
        <ListGroup as="div">
            {comments.map((comment, index) => (
                <ListGroupItem key={index} className="py-3">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                <strong>{comment.author_name}</strong>
                            </Card.Title>
                            <Card.Text>
                                {comment.content}
                            </Card.Text>
                            <small className="text-muted">
                                {new Date(comment.created_at).toLocaleString()}
                            </small>
                        </Card.Body>
                    </Card>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;