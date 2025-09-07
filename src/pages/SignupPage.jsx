import { useOutletContext } from 'react-router';
import SignupForm from '../features/SignupForm/SignupForm';

export default function SignupPage() {
    const { onSwitch, styles } = useOutletContext();

    return (
        <>
            <section
                className={[styles.sections, styles['section-1']].join(' ')}
            >
                <SignupForm onSwitch={onSwitch} />
            </section>
        </>
    );
}
