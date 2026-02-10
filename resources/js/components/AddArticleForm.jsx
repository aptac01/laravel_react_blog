// components/AddArticleForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddArticleForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

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
                alert('Статья успешно добавлена!');
                setFormData({
                    title: '',
                    content: '',
                });
            }
        } catch (error) {
            console.error('Ошибка при добавлении статьи:', error);
            alert('Произошла ошибка при добавлении статьи');
        }
    };

    return (
        <div className="add-article-form">
            <h2>Добавить новую статью</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Заголовок</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Содержание</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="10"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Добавить статью
                </button>
            </form>
        </div>
    );
};

export default AddArticleForm;