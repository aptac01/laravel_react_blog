import React from 'react';

const CommentList = ({ articleId, comments }) => {
    if (comments.length === 0) {
        return <p>Комментариев пока нет</p>;
    }

    return (
        <div className="comment-list">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <h4>Комментарий от {comment.author_name}</h4>
                    <p>{comment.content}</p>
                    <small>{new Date(comment.created_at).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default CommentList;