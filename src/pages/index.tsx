import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { Layout, Button } from "@/components";
import { AdCard } from "@/components/AdCard/AdCard";
import { ApiService } from "@/services/api";
import { MockDataService } from "@/services/mockData";
import { useCategories } from "@/hooks";
import { useLocale } from "@/contexts/LocaleContext";
import { Category, Ad } from "@/types/api";
import styles from "@/styles/Home.module.css";

interface PageProps {
  dehydratedState: DehydratedState;
  featuredAds: Ad[];
}

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  vehicles: "🚗",
  cars: "🚗",
  properties: "🏠",
  mobiles: "📱",
  electronics: "💻",
  furniture: "🛋️",
  jobs: "💼",
  services: "🔧",
  fashion: "👗",
  kids: "👶",
  sports: "⚽",
  hobbies: "🎮",
  pets: "🐕",
  business: "🏭",
};

const getCategoryIcon = (slug: string, name: string): string => {
  const lowerSlug = slug.toLowerCase();
  const lowerName = name.toLowerCase();

  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lowerSlug.includes(key) || lowerName.includes(key)) {
      return icon;
    }
  }
  return "📦";
};

export default function Home({ dehydratedState, featuredAds }: PageProps) {
  const { data: categoriesResponse, isLoading, error } = useCategories();
  const { t } = useLocale();

  const categories = categoriesResponse || [];
  const mainCategories = categories.filter((cat: Category) => !cat.parentId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Head>
        <title>{`${t.common.olx} - ${t.home.heroTitle}`}</title>
        <meta name="description" content={t.home.heroSubtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={`${t.common.olx} - ${t.home.heroTitle}`}
        />
        <meta property="og:description" content={t.home.heroSubtitle} />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        {isLoading ? (
          <div className={styles.container}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{t.home.loading}</p>
            </div>
          </div>
        ) : error ? (
          <div className={styles.container}>
            <div className={styles.error}>
              <p>{t.home.error}</p>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>{t.home.heroTitle}</h1>
                <p className={styles.heroSubtitle}>{t.home.heroSubtitle}</p>
                <div className={styles.searchBar}>
                  <input
                    type="text"
                    placeholder={t.home.searchPlaceholder}
                    className={styles.searchInput}
                  />
                  <button className={styles.searchButton}>{t.home.search}</button>
                </div>
              </div>
            </section>

            {/* Categories Row */}
            <section className={styles.categoriesRow}>
              <h2 className={styles.sectionTitle}>{t.home.browseByCategory}</h2>
              <div className={styles.categoryChips}>
                {mainCategories.slice(0, 10).map((category: Category) => (
                  <Link
                    key={category.id}
                    href="/post-ad"
                    className={styles.categoryChip}
                  >
                    <span className={styles.chipIcon}>
                      {getCategoryIcon(category.slug, category.name)}
                    </span>
                    <span className={styles.chipName}>{category.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Ads Section */}
            {featuredAds.length > 0 && (
              <section className={styles.adsSection}>
                <div className={styles.adsSectionHeader}>
                  <h2 className={styles.sectionTitle}>{t.home.featuredAds}</h2>
                  <button className={styles.viewAllButton}>
                    {t.home.viewAll} →
                  </button>
                </div>
                <div className={styles.adsGrid}>
                  {featuredAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
                </div>
              </section>
            )}

            {/* Call to Action */}
            <section className={styles.ctaSection}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaContent}>
                  <h2 className={styles.ctaTitle}>{t.home.readyToStart}</h2>
                  <p className={styles.ctaDescription}>
                    {t.home.readyToStartDesc}
                  </p>
                </div>
                <Link href="/post-ad">
                  <Button variant="primary" size="large">
                    {t.home.postAnAdNow}
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        )}
      </Layout>
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => ApiService.fetchCategories(),
  });

  const featuredAds = await MockDataService.fetchFeaturedAds(9);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      featuredAds,
    },
  };
};
