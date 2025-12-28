// Mock data service for simulating ads
import { Ad } from "@/types/api";

// Simulate loading delay with Promise
const simulateDelay = (ms: number = 800): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock ads data for demonstration
const mockAds: Ad[] = [
    // Properties
    {
        id: 1,
        title: "Spacious 3BR Apartment in Achrafieh",
        description: "Beautiful apartment with sea view, fully furnished",
        price: 250000,
        categorySlug: "properties-for-sale",
        categoryName: "Properties",
        location: "Achrafieh, Beirut",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: "Modern Villa in Dbayeh",
        description: "Luxury villa with pool and garden, 5 bedrooms",
        price: 850000,
        categorySlug: "properties-for-sale",
        categoryName: "Properties",
        location: "Dbayeh",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        title: "Office Space in Downtown",
        description: "Prime location office space, 200 sqm",
        price: 180000,
        categorySlug: "properties-for-sale",
        categoryName: "Properties",
        location: "Downtown Beirut",
        createdAt: new Date().toISOString(),
    },
    // Cars
    {
        id: 4,
        title: "2020 BMW 320i",
        description: "Excellent condition, low mileage, full options",
        price: 28000,
        categorySlug: "cars",
        categoryName: "Cars",
        location: "Beirut",
        createdAt: new Date().toISOString(),
    },
    {
        id: 5,
        title: "2019 Toyota Corolla",
        description: "Well maintained, single owner, automatic",
        price: 15000,
        categorySlug: "cars",
        categoryName: "Cars",
        location: "Jounieh",
        createdAt: new Date().toISOString(),
    },
    {
        id: 6,
        title: "2021 Mercedes C200",
        description: "Like new, under warranty, premium package",
        price: 42000,
        categorySlug: "cars",
        categoryName: "Cars",
        location: "Beirut",
        createdAt: new Date().toISOString(),
    },
    // Mobiles
    {
        id: 7,
        title: "iPhone 14 Pro Max 256GB",
        description: "Brand new sealed, international warranty",
        price: 1200,
        categorySlug: "mobile-phones",
        categoryName: "Mobiles",
        location: "Hamra, Beirut",
        createdAt: new Date().toISOString(),
    },
    {
        id: 8,
        title: "Samsung Galaxy S23 Ultra",
        description: "Mint condition, with all accessories",
        price: 950,
        categorySlug: "mobile-phones",
        categoryName: "Mobiles",
        location: "Achrafieh",
        createdAt: new Date().toISOString(),
    },
    {
        id: 9,
        title: "iPad Pro 12.9 inch",
        description: "2022 model, 512GB, WiFi + Cellular",
        price: 1100,
        categorySlug: "mobile-phones",
        categoryName: "Mobiles",
        location: "Verdun",
        createdAt: new Date().toISOString(),
    },
];

export class MockDataService {
    static async fetchAdsByCategory(categorySlug: string): Promise<Ad[]> {
        await simulateDelay();
        return mockAds.filter((ad) => ad.categorySlug === categorySlug);
    }

    static async fetchFeaturedAds(limit: number = 9): Promise<Ad[]> {
        await simulateDelay();
        return mockAds.slice(0, limit);
    }

    static async fetchAdsByCategorySlugs(categorySlugs: string[]): Promise<Ad[]> {
        await simulateDelay();
        return mockAds.filter((ad) => categorySlugs.includes(ad.categorySlug));
    }
}
