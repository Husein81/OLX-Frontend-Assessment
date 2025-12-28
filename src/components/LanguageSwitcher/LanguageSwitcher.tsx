import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    return (
        <div className={styles.switcher}>
            <button
                className={`${styles.button} ${locale === 'en' ? styles.active : ''}`}
                onClick={() => setLocale('en')}
                aria-label="Switch to English"
            >
                EN
            </button>
            <button
                className={`${styles.button} ${locale === 'ar' ? styles.active : ''}`}
                onClick={() => setLocale('ar')}
                aria-label="Switch to Arabic"
            >
                ع
            </button>
        </div>
    );
}
