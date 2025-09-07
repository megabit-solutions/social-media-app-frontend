import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import styles from '../styles/AuthPage.module.css';

export default function AuthLayout() {
    const location = useLocation();
    const [overlayClass, setOverlayClass] = useState(
        location.pathname === '/login'
            ? styles['ini-left']
            : styles['ini-right']
    );
    const toggleOverlay = () => {
        setOverlayClass((prev) => {
            if (
                prev.includes('' + styles['slider-right']) ||
                prev.includes('' + styles['ini-right'])
            ) {
                return styles['slider-left'];
            }
            return styles['slider-right'];
        });
    };

    const onSwitch = () => {
        toggleOverlay();
    };
    return (
        <main className={styles.page}>
            <Outlet context={{ onSwitch, styles }} />
            <div
                className={[styles['slider-bg'], overlayClass].join(' ')}
            ></div>
        </main>
    );
}
