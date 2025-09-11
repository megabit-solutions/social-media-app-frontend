import cStyles from '../CompProfile.module.css';
import styles from './CompProfile1.module.css';
import Button from '../../../components/Button/Button.jsx';
import { useRef, useState, usState } from 'react';
import clsx from 'clsx';

function CompProfile1() {
    const [profilePic, setProfilePic] = useState('/profile.png');
    const [coverPic, setCoverPic] = useState('/profile.png');
    const fileProfileRef = useRef(null);
    const fileCoverRef = useRef(null);
    const handleProfileClick = () => {
        fileProfileRef.current.click();
    };
    const handleCoverClick = () => {
        fileCoverRef.current.click();
    };
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            setProfilePic(URL.createObjectURL(file));
        }
    };
    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            setCoverPic(URL.createObjectURL(file));
        }
    };

    return (
        <section className={cStyles.modal}>
            <form className={cStyles.form}>
                <h2>Show Who You Are</h2>

                <fieldset
                    className={clsx(
                        styles['cover-pic-group'],
                        cStyles['fieldset']
                    )}
                >
                    <legend>cover photo</legend>
                    <img src={coverPic} />
                    <div
                        className={clsx(
                            styles['btn-wrapper'],
                            styles['wrapper']
                        )}
                    >
                        <img
                            className={styles['profile-pic']}
                            src="https://img.icons8.com/?size=100&id=MCdDfCTzd5GC&format=png&color=ffffff"
                            alt="Add a profile photo"
                            onClick={handleCoverClick}
                        />
                        <input
                            type="file"
                            ref={fileCoverRef}
                            onChange={handleCoverChange}
                        />
                    </div>
                </fieldset>

                <fieldset
                    className={clsx(
                        styles['profile-pic-group'],
                        cStyles['fieldset']
                    )}
                >
                    <legend>profile photo</legend>
                    <div
                        className={clsx(
                            styles['pic-wrapper'],
                            styles['wrapper']
                        )}
                    >
                        <img
                            className={styles['profile-pic']}
                            src={profilePic}
                            alt="Add a profile photo"
                            onClick={handleProfileClick}
                        />
                        <input
                            type="file"
                            ref={fileProfileRef}
                            onChange={handleProfileChange}
                        />
                    </div>
                    <div className={styles['text-wrapper']}>
                        <p className={styles.username}>@zaheer</p>
                        <p className={styles.info}>
                            Click on profile photo to update
                        </p>
                    </div>
                </fieldset>

                <fieldset
                    className={clsx(styles['bio-group'], cStyles['fieldset'])}
                >
                    <legend>bio</legend>
                    <textarea
                        className={styles.bio}
                        name="bio"
                        id="bio"
                        placeholder="Tell us about yourself"
                        maxLength={250}
                    ></textarea>
                </fieldset>
                <fieldset className={clsx(cStyles['btns-group'])}>
                    <Button
                        type="button"
                        variant="fourth"
                        label="Skip"
                        size="sm"
                    />
                    <Button
                        type="button"
                        variant="primary"
                        label="Update Profile"
                        size="sm"
                        // disabled={true}
                    />
                </fieldset>
            </form>
            <div className={cStyles.hero}>
                <img
                    className={styles['hero-img']}
                    src="/comp_profile_1.png"
                    alt="Add a profile photo"
                />
            </div>
        </section>
    );
}

export default CompProfile1;
