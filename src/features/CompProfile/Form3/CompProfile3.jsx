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
                    <p className={styles['desktop-intro']}>
                        More than just details, your education and work
                        experiences added to your profile help you to:
                    </p>
                    <p className={styles['mob-intro']}>
                        Add education and work experiences your profile and:
                    </p>
                    <ul>
                        <li>
                            Stand out with a richer<span>, more complete </span>{' '}
                            profile.
                        </li>
                        <li>
                            See content that fits your interests
                            <span>, tailored around your background </span>(you
                            can adjust or disable anytime).
                        </li>
                        <li>
                            Reconnect with old classmates and colleagues
                            <span>
                                {' '}
                                who studied or worked at the same places.
                            </span>
                        </li>
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
                        label="Add Experience"
                        size="sm"
                        // disabled={true}
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
