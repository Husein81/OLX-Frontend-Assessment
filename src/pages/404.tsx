import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout, Button } from "@/components";
import { useLocale } from "@/contexts/LocaleContext";
import styles from "@/styles/404.module.css";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>{`404 - Page Not Found | ${t.common.olx}`}</title>
        <meta name="description" content="Page not found" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Page Not Found</h2>
            <p className={styles.description}>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className={styles.actions}>
              <Link href="/">
                <Button variant="primary" size="large">
                  Go to Home
                </Button>
              </Link>
              <Link href="/post-ad">
                <Button variant="outline" size="large">
                  Post an Ad
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
