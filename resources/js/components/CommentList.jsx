import React, {useEffect, useRef, useState} from 'react';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import axios from 'axios';

const CommentList = ({
     articleId,
     comments,
     onCommentDeleted
}) => {
    if (comments.length === 0) {
        return (
            <p className="text-muted text-center mt-4">
                Комментариев пока нет
            </p>
        );
    }

    const [loading, setLoading] = useState(null); // отслеживаем загрузку для конкретного комментария
    const buttonRefs = useRef({});

    // Callback для внешнего вызова (при обработке события comment_deleted)
    const handleCommentDeleted = (commentId) => {
        const button = buttonRefs.current[commentId];
        if (button) {
            button.style.removeProperty('opacity');
            button.disabled = false;
            button.style.pointerEvents = 'auto';
        }
    };
    useEffect(() => {
        // Экспортируем функцию handleCommentDeleted наружу
        if (onCommentDeleted) {
            onCommentDeleted(handleCommentDeleted);
        }
    }, [onCommentDeleted]);

    const handleDeleteComment = (commentId) => {
        setLoading(commentId);
        // console.log('начинаем удаление');

        // Получаем DOM‑элемент кнопки
        const button = buttonRefs.current[commentId];

        if (button) {
            // Синхронно меняем свойства кнопки ДО перерендера React
            button.disabled = true;
            button.style.opacity = '0.1';
            button.style.pointerEvents = 'none';
        }

        axios.delete(`/api/articles/${articleId}/comment/${commentId}`)
            .then((response) => {
                // Успешное удаление — можно добавить дополнительную логику при необходимости
                // console.log('Запрос на удаление отправлен:', commentId);
            })
            .catch((error) => {
                // console.error('Ошибка при удалении комментария:', error);
                // Здесь можно показать уведомление пользователю об ошибке
            })
            .finally(() => {
                setLoading(null);
            });
    };

    return (
        <ListGroup as="div">
            {comments.map((comment, index) => (
                <ListGroupItem key={index} className="py-3" data-comment-id={comment.id}>
                    <Card className="">
                        <Card.Body className="position-relative">
                            <Card.Title>
                                <strong>{comment.author_name}</strong>
                            </Card.Title>
                            <Card.Text>
                                {comment.content}
                            </Card.Text>
                            <small className="text-muted">
                                {new Date(comment.created_at).toLocaleString() + ' id:' + comment.id}
                            </small>

                            <button
                                ref={(el) => { buttonRefs.current[comment.id] = el; }}

                                type="button"
                                className="article-comment-btn-close btn-close position-absolute top-0 end-0 translate-middle z-index-1"
                                disabled={loading === comment.id}
                                onClick={() => handleDeleteComment(comment.id)}
                                aria-label="Удалить комментарий"
                            />
                        </Card.Body>
                    </Card>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;