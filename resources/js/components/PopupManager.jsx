import React, { useState, useEffect } from 'react';
import NotificationPopup from './NotificationPopup';

let popupIdCounter = 0;

const PopupManager = () => {
    const [popups, setPopups] = useState([]);

    // Функция для добавления нового попапа
    const addPopup = (message, type = 'info', autoclose = true, closeDelayMs = 5000) => {
        const newPopup = {
            id: popupIdCounter++,
            message,
            type,
            autoclose,
            closeDelayMs
        };

        setPopups(prev => [...prev, newPopup]);
    };

    // Функция для удаления попапа
    const removePopup = (id) => {
        setPopups(prev => prev.filter(popup => popup.id !== id));
    };

    // Экспортируем функцию добавления для использования в других компонентах
    window.showNotification = addPopup;

    useEffect(() => {
        // Очистка старых попапов при размонтировании
        return () => {
            setPopups([]);
        };
    }, []);

    return (
        <div className="popup-manager">
            {popups.map((popup, index) => (
                <NotificationPopup
                    key={popup.id}
                    id={popup.id}
                    message={popup.message}
                    type={popup.type}
                    autoclose={popup.autoclose}
                    closeDelayMs={popup.closeDelayMs}
                    onClose={removePopup}
                />
            ))}
        </div>
    );
};

export default PopupManager;