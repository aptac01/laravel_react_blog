import React, { useEffect, useState } from 'react';

/**
 * Информационное уведомление с заданным текстом, появляется в уголке снизу справа
 *   пример использования:
 *   window.showNotification(
 *                 'Комментарий удалён',
 *                 'success',
 *                 true,
 *                 4000
 *             );
 * @param id
 * @param message
 * @param type
 * @param autoclose
 * @param closeDelayMs
 * @param onClose
 * @returns {JSX.Element|null}
 * @constructor
 */
const NotificationPopup = ({
                               id,
                               message,
                               type = 'info',
                               autoclose = false,
                               closeDelayMs = 5000,
                               onClose
                           }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose(id);
    };

    useEffect(() => {
        if (autoclose && isVisible) {
            const timer = setTimeout(() => {
                handleClose();
            }, closeDelayMs);
            return () => clearTimeout(timer);
        }
    }, [autoclose, closeDelayMs, isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className={`notification-popup alert alert-${type} alert-dismissible fade show`}
            role="alert"
        >
            {message}
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
            />
        </div>
    );
};

export default NotificationPopup;