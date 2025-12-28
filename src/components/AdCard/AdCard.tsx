import React from "react";
import { Ad } from "@/types/api";
import styles from "./AdCard.module.css";

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    // Ad detail page not implemented - this is just a demo
    alert(
      `Ad Details:\n\nTitle: ${ad.title}\nPrice: ${formatPrice(
        ad.price
      )}\nDescription: ${ad.description}\nLocation: ${ad.location || "Lebanon"}`
    );
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        {ad.image ? (
          <img src={ad.image} alt={ad.title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>📷</span>
          </div>
        )}
        <span className={styles.featured}>Featured</span>
      </div>
      <div className={styles.content}>
        <div className={styles.price}>{formatPrice(ad.price)}</div>
        <h3 className={styles.title}>{ad.title}</h3>
        <div className={styles.meta}>
          <span className={styles.location}>📍 {ad.location || "Lebanon"}</span>
          <span className={styles.date}>{formatDate(ad.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
