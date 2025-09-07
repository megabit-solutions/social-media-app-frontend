import LoginForm from '../features/LoginForm/LoginForm';
import '../styles/global.css';
import { useOutletContext } from 'react-router';

export default function LoginPage() {
    const { onSwitch, styles } = useOutletContext();
    return (
        <>
            <section
                className={[styles.sections, styles['section-2']].join(' ')}
            >
                <LoginForm onSwitch={onSwitch} />
            </section>
        </>
    );
}
