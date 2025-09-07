import LoginForm from '../features/LoginForm/LoginForm.jsx'
import SignupForm from '../features/SignupForm/SignupForm.jsx'
import styles from '../styles/AuthPage.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [overlayClass, setOverlayClass] = useState(
        location.pathname === "/login" ?
            styles["ini-left"] :
            styles["ini-right"]
    );
    const toggleOverlay = () => {
        setOverlayClass((prev) => {
            if (prev.includes("" + styles["slider-right"]) ||
                prev.includes("" + styles["ini-right"]) ) {
                    return styles["slider-left"];
            }
            return styles["slider-right"];
        });
    };
    return (
        <main className= {styles.page}>
            <section
                className= {[
                    styles.sections,
                    styles["section-1"],
                ].join(' ')}
                key={location.pathname === "/signup" ? "signup-section" : "login-section"}
                >
                <SignupForm onSwitch={() => {
                    toggleOverlay();
                    navigate('/login');
                }}
                key={location.pathname === "/signup" ? "signup" : "keep"}/>
            </section>
            <section
                className= {[
                    styles.sections,
                    styles["section-2"],
                ].join(' ')}
                >
                <LoginForm onSwitch={() => {
                    toggleOverlay();
                    navigate('/signup');
                }}
                key={location.pathname === "/login" ? "login" : "keep"}
                />
            </section>
            <div
                className={[
                    styles["slider-bg"],
                    overlayClass
                ]
                .join(" ")}>
            </div>
        </main>
    );
}