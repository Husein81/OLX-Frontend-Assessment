import React from "react";
import Link from "next/link";
import styles from "./Layout.module.css";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLocale();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoContainer}>
              <span className={styles.logoText}>Olx</span>
              <span className={styles.logoLebanon}>{t.common.lebanon}</span>
            </div>
          </Link>

          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              {t.common.home}
            </Link>
            <Link href="/post-ad" className={styles.sellButton}>
              <span className={styles.plusIcon}>+</span>
              {t.home.postAnAd}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>Olx</span>
            <span className={styles.footerLogoLebanon}>{t.common.lebanon}</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>{t.footer.aboutUs}</a>
            <a href="#" className={styles.footerLink}>{t.footer.contact}</a>
            <a href="#" className={styles.footerLink}>{t.footer.termsOfUse}</a>
            <a href="#" className={styles.footerLink}>{t.footer.privacyPolicy}</a>
            <a href="#" className={styles.footerLink}>{t.footer.helpCenter}</a>
          </div>
          <p className={styles.copyright}>
            &copy; 2025 {t.common.olx}. {t.footer.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
};
