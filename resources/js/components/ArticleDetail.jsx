import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import echo from './../websocket';

const ArticleDetail = ({}) => {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const commentDeletedHandler = useRef(null); // Храним callback

    useEffect(() => {

        // Получаем статью
        axios.get(`/api/articles/${id}`)
            .then(response => setArticle(response.data))
            .catch(error => console.error(error));

    }, [id]);

    useEffect(() => {

        // Подписываемся на канал конкретной статьи
        const channel = echo.channel('article.' + id);

        // channel.subscribed(() => {
        //     console.log('✅ Успешно подключились к каналу');
        // });
        //
        // channel.error((error) => {
        //     console.error('❌ Ошибка канала:', error);
        // });

        // вставляем новый комментарий
        channel.listen('.new_comment', (e) => {
            setArticle(prev => ({
                ...prev,
                comments: [...prev.comments, e.comment]
            }));
        });

        // удаляем комментарий
        channel.listen('.comment_deleted', (e) => {

            // console.log('удалили коммент ' + e.comment_id)

            // Вызываем функцию из CommentList для сброса стилей кнопки
            if (commentDeletedHandler.current) {
                commentDeletedHandler.current(e.comment_id);
            }

            // удаляем сам коммент
            setArticle(prev => ({
                ...prev,
                comments: prev.comments.filter(comment => comment.id !== e.comment_id)
            }));

            window.showNotification(
                'Комментарий удалён',
                'success',
                true,
                4000
            );
        });

        // Отписка при уничтожении компонента
        return () => {
            channel.stopListening('article.' + id);
            echo.leave('.new_comment');
            echo.leave('.comment_deleted');
        };
    }, []);

    // // обновление списка комментов без вебсокетов
    // const handleCommentSubmit = (newComment) => {
    //
    //     // // Обновляем комментарии без перезапроса всей статьи
    //     // setArticle(prev => ({
    //     //     ...prev,
    //     //     comments: [...prev.comments, newComment]
    //     // }));
    // }

    // Функция для установки callback из CommentList
    const setCommentDeletedHandler = (handler) => {
        commentDeletedHandler.current = handler;
    };

    // пример отправки ивента на другие клиенты через сервер на бэке (reverb)
    const sendClickEvent = () => {

        const channel = echo.channel('article.' + id);

        channel.pusher.channels.channels['article.' + id]
            .trigger('client-my_custom_event', {'my_custom': 'data'});

        channel.stopListening('article.' + id);
    };

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
                    <h4 className="mb-3" onClick={sendClickEvent}>Комментарии</h4>
                    <CommentList
                        articleId={article.id}
                        comments={article.comments}
                        onCommentDeleted={setCommentDeletedHandler}
                    />
                    <CommentForm
                        articleId={article.id}
                        // onSubmit={handleCommentSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ArticleDetail;
