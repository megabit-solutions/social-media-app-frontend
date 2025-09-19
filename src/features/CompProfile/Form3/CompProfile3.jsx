import styles from './CompProfile3.module.css';
import cStyles from '../CompProfile.module.css';
import Button from '../../../components/Button/Button.jsx';
import clsx from 'clsx';

function CompProfile3() {
    return (
        <main className={cStyles['modal']}>
            <section className={cStyles['section']}>
                <h2>Your Journey So Far</h2>
                <div className={clsx(styles['group'], styles['exp-group'])}>
                    <h4>work and education</h4>
                    <p>
                        Adding education and work experiences to your profile
                        helps you to:
                    </p>
                    <ul>
                        <li>Stand out and present yourself better.</li>
                        <li>
                            See content that fits your interests (you can
                            disable it anytime).
                        </li>
                        <li>Reconnect with old classmates and colleagues.</li>
                    </ul>
                </div>
                <fieldset
                    className={clsx(
                        cStyles['btns-group'],
                        styles['btns-group']
                    )}
                >
                    <Button
                        type="button"
                        variant="fourth"
                        label="Skip"
                        size="sm"
                    />
                    <Button
                        type="button"
                        variant="primary"
                        label="Add Experiences"
                        size="sm"
                    />
                </fieldset>
            </section>
            <section className={cStyles['hero']}>
                <img
                    className={styles['hero-img']}
                    src="/comp_profile_3.png"
                    alt="Add a profile photo"
                />
            </section>
        </main>
    );
}

export default CompProfile3;
