import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/articles/' + articleId + '/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData({ author_name: '', content: '' });
                onSubmit?.(data);
            } else {
                setErrors(data.errors || { general: ['Ошибка при отправке'] });
            }
        } catch (err) {
            setErrors({ general: ['Не удалось подключиться к серверу'] });
        }
        setIsLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
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

            {errors.general && (
                <Alert variant="danger">
                    {errors.general.join(', ')}
                </Alert>
            )}

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