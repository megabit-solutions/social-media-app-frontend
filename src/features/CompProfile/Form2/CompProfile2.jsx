import styles from './CompProfile2.module.css';
import cStyles from '../CompProfile.module.css';
import Button from '../../../components/Button/Button.jsx';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Select from 'react-select';

function CompProfile2() {
    const [currentCountry, setCurrentCountry] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [permanentCountry, setPermanentCountry] = useState(null);
    const [permanentCity, setPermanentCity] = useState(null);
    const [sameAddress, setSameAddress] = useState(false);

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [permCities, setPermCities] = useState([]);

    // custom styles for react-select
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '36px',
            border: 'none',
            borderRadius: 'var(--border-md)',
            backgroundColor: 'var(--color-input)',
            fontSize: 'var(--text-sm)',
            boxShadow: state.isFocused
                ? '0 0 0 2px hsl(50, 100%, 23%)'
                : 'none',
            '&:hover': { border: 'none' }
        }),
        menu: (base) => ({
            ...base,
            borderRadius: 'var(--border-md)',
            backgroundColor: 'var(--color-input)',
            fontSize: 'var(--text-sm)'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? 'hsl(50, 100%, 98%)'
                : 'var(--color-input)',
            color: 'var(--color-text-bright)',
            cursor: 'pointer'
        }),
        placeholder: (base) => ({
            ...base,
            color: 'var(--color-text-placeholder)',
            fontSize: 'var(--text-sm)',
            fontWeight: 400
        })
    };

    // Load countries
    useEffect(() => {
        async function loadCountries() {
            try {
                let res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
                let data = await res.json();
                const sorted = data.data
                    .map(c => ({ label: c.name, value: c.name }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setCountries(sorted);
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        }
        loadCountries();
    }, []);

    // Load cities for current country
    useEffect(() => {
        async function loadCities() {
            if (!currentCountry) {
                setCities([]);
                setCurrentCity(null);
                return;
            }
            try {
                let res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ country: currentCountry.value })
                });
                let data = await res.json();
                const sorted = data.data
                    .map(c => ({ label: c, value: c }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setCities(sorted);
                setCurrentCity(null); // reset city on country change
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        }
        loadCities();
    }, [currentCountry]);

    // Load cities for permanent country
    useEffect(() => {
        async function loadCities() {
            if (!permanentCountry) {
                setPermCities([]);
                setPermanentCity(null);
                return;
            }
            try {
                let res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ country: permanentCountry.value })
                });
                let data = await res.json();
                const sorted = data.data
                    .map(c => ({ label: c, value: c }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setPermCities(sorted);
                setPermanentCity(null); // reset city on country change
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        }
        loadCities();
    }, [permanentCountry]);

    // Handle same address toggle
    const handleSameAddressChange = (e) => {
        const checked = e.target.checked;
        setSameAddress(checked);
        if (checked) {
            setPermanentCountry(currentCountry);
            setPermanentCity(currentCity);
            setPermCities(cities);
        }
    };

    // Sync permanent with current if sameAddress is checked
    useEffect(() => {
        if (sameAddress) {
            setPermanentCountry(currentCountry);
            setPermanentCity(currentCity);
            setPermCities(cities);
        }
    }, [currentCountry, currentCity, cities, sameAddress]);

    return (
        <div className={cStyles.modal}>
            <form className={cStyles.form}>
                <h2>Where Are You From</h2>

                {/* Current Address */}
                <fieldset className={clsx(styles.inlineRow, cStyles['fieldset'])}>
                    <legend>Current Address</legend>
                    <Select
                        className={styles.selectBox}
                        options={countries}
                        value={currentCountry}
                        onChange={setCurrentCountry}
                        placeholder="Select Country"
                        isClearable
                        styles={selectStyles}
                    />
                    <Select
                        className={styles.selectBox}
                        options={cities}
                        value={currentCity}
                        onChange={setCurrentCity}
                        placeholder="Select City"
                        isClearable
                        isDisabled={!currentCountry}
                        styles={selectStyles}
                    />
                </fieldset>

                {/* Permanent Address */}
                <fieldset className={clsx(styles.inlineRow, cStyles['fieldset'])}>
                    <legend>Permanent Address</legend>
                    <Select
                        className={styles.selectBox}
                        options={countries}
                        value={permanentCountry}
                        onChange={setPermanentCountry}
                        placeholder="Select Country"
                        isClearable
                        isDisabled={sameAddress}
                        styles={selectStyles}
                    />
                    <Select
                        className={styles.selectBox}
                        options={permCities}
                        value={permanentCity}
                        onChange={setPermanentCity}
                        placeholder="Select City"
                        isClearable
                        isDisabled={!permanentCountry || sameAddress}
                        styles={selectStyles}
                    />
                    <label className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            id="sameAddress"
                            checked={sameAddress}
                            onChange={handleSameAddressChange}
                        />
                        <p>Permanent address is same as current</p>
                    </label>
                </fieldset>

                {/* Bio */}
                <fieldset className={clsx(styles['bio-group'], cStyles['fieldset'])}>
                    <legend>bio</legend>
                    <textarea
                        className={styles.bio}
                        name="bio"
                        id="bio"
                        placeholder="Tell us about yourself"
                        maxLength={250}
                    ></textarea>
                </fieldset>

                {/* Buttons */}
                <fieldset className={clsx(cStyles['btns-group'])}>
                    <Button type="button" variant="fourth" label="Skip" size="sm" />
                    <Button type="button" variant="primary" label="Save Changes" size="sm" />
                </fieldset>
            </form>

            <div className={cStyles.hero}>
                {/* optional hero image */}
            </div>
        </div>
    );
}

export default CompProfile2;
