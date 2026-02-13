import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AddArticleForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/articles', formData);
            if (response.status === 201) {
                setFormData({ title: '', content: '' });
                setError(null);
                setSuccess('Статья успешно добавлена!');
                setTimeout(() => setSuccess(null), 3000); // Автоматическое скрытие через 3 секунды
            }
        } catch (error) {
            setError('Произошла ошибка при добавлении статьи');
        }
    };

    return (
        <div className="mt-5">
            <h2 className="mb-4">Добавить новую статью</h2>

            {success && (
                <Alert variant="success" className="mb-3">
                    {success}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </Alert>
            )}

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Содержание</Form.Label>
                    <Form.Control as="textarea" rows={10} name="content" value={formData.content} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Добавить статью
                </Button>
            </Form>
        </div>
    );
};

export default AddArticleForm;