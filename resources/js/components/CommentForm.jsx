import React, {useState} from 'react';
import { Form, Button} from 'react-bootstrap';
import ClosableAlert from './ClosableAlert';
import axios from 'axios';

function CommentForm({ articleId, onSubmit }) {
    const [formData, setFormData] = useState({
        author_name: '',
        content: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.author_name) newErrors.author_name = ['Имя автора обязательно.'];
        if (!formData.content) newErrors.content = ['Текст комментария обязателен.'];
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        axios.post(
            `/api/articles/${articleId}/comments`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                const data = response.data;

                if (response.status >= 200 && response.status < 300) {
                    setFormData({ author_name: '', content: '' });

                    // Вызываем onSubmit, если она есть
                    if (onSubmit) {
                        onSubmit(data);
                    }

                    window.showNotification(
                        'Комментарий успешно отправлен',
                        'success',
                        true,
                        5000
                    );
                } else {
                    // Сервер вернул ошибку (но HTTP-статус не 2xx)
                    setErrors(data.errors || { general: ['Ошибка при отправке'] });

                }
            })
            .catch((err) => {
                // Сетевая ошибка или другие проблемы
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ general: ['Не удалось подключиться к серверу'] });
                }
            })
            .finally(() => {
                // Завершаем состояние загрузки вне зависимости от результата
                setIsLoading(false);
            });
    };

    return (
        <Form className='comment-form' onSubmit={handleSubmit} noValidate>
            {errors.general && (
                <ClosableAlert
                    message={errors.general.join(', ')}
                    type="danger"
                />
            )}

            <Form.Group className="mb-3">
                <Form.Label>Ваше имя <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    isInvalid={!!errors.author_name}
                />
                {errors.author_name && (
                    <Form.Text className="text-danger">
                        {errors.author_name.join(', ')}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Комментарий <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={4}
                    disabled={isLoading}
                    isInvalid={!!errors.content}
                />
                {errors.content && (
                    <Form.Text className="text-danger">
                        {errors.content.join(', ')}
                    </Form.Text>
                )}
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Отправляется...' : 'Отправить комментарий'}
            </Button>
        </Form>
    );
}

export default CommentForm;