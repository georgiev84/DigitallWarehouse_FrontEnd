import React, { useEffect, useContext } from 'react';
import NavigationContext from '../context/NavigationContext';
import './ErrorPopup.css';

type Props = {
    message: string;
}

function ErrorPopup({ message }: Props) {
    const { setShowPopup } = useContext(NavigationContext)

    const onClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="popup-container">
            <div className="popup">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;
