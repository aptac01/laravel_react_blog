import React, {useEffect, useState} from 'react';

/**
 * Голый алерт, для встраивания куда-то в конкретное место
 * Вернёт html с алёртом который можно закрыть
 *
 * @param message       что вывести
 * @param type          primary, success, danger, warning
 * @param autoclose     bool, если true - скроется через closeDelayMs милисек.
 * @param closeDelayMs
 * @returns {JSX.Element|string}
 * @constructor
 */
const ClosableAlert = ({
    message,
    type = 'info',
    autoclose = false,
    closeDelayMs = 5000,
}) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  useEffect(() => {
    if (autoclose) {
      setTimeout(() => {
        setIsVisible(false);
      }, closeDelayMs);
    }
  }, [autoclose, closeDelayMs]);

  if (!isVisible) return '';

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      />
    </div>
  );
};

export default ClosableAlert;