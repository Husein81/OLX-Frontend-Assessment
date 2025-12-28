// API Service Layer for fetching categories and category fields

import { Category, CategoryFieldsResponse } from "@/types/api";

const BASE_URL = "https://www.olx.com.lb/api";
const FETCH_TIMEOUT = 15000; // 15 seconds

type Options = {
  includeChildCategories?: boolean;
  splitByCategoryIDs?: boolean;
  flatChoices?: boolean;
  groupChoicesBySection?: boolean;
  flat?: boolean;
};

// Helper function to add timeout to fetch
const fetchWithTimeout = async (
  url: string,
  timeout: number = FETCH_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Mock categories data as fallback
const mockCategories: Category[] = [
  { id: 1, name: "Vehicles", slug: "vehicles", parentId: null },
  { id: 2, name: "Cars for Sale", slug: "cars-for-sale", parentId: 1 },
  { id: 3, name: "Motorcycles", slug: "motorcycles", parentId: 1 },
  { id: 4, name: "Auto Accessories", slug: "auto-accessories", parentId: 1 },
  { id: 5, name: "Properties", slug: "properties", parentId: null },
  {
    id: 6,
    name: "Apartments & Villas For Sale",
    slug: "apartments-villas-for-sale",
    parentId: 5,
  },
  {
    id: 7,
    name: "Apartments & Villas For Rent",
    slug: "apartments-villas-for-rent",
    parentId: 5,
  },
  {
    id: 8,
    name: "Commercials For Sale",
    slug: "commercials-for-sale",
    parentId: 5,
  },
  {
    id: 9,
    name: "Commercials For Rent",
    slug: "commercials-for-rent",
    parentId: 5,
  },
  { id: 10, name: "Lands for Sale", slug: "lands-for-sale", parentId: 5 },
  { id: 11, name: "Mobiles & Accessories", slug: "mobiles", parentId: null },
  { id: 12, name: "Mobile Phones", slug: "mobile-phones", parentId: 11 },
  {
    id: 13,
    name: "Mobile Accessories",
    slug: "mobile-accessories",
    parentId: 11,
  },
  { id: 14, name: "Tablets", slug: "tablets", parentId: 11 },
  {
    id: 15,
    name: "Electronics & Appliances",
    slug: "electronics",
    parentId: null,
  },
  {
    id: 16,
    name: "Computers & Laptops",
    slug: "computers-laptops",
    parentId: 15,
  },
  { id: 17, name: "TVs & Audio", slug: "tvs-audio", parentId: 15 },
  { id: 18, name: "Cameras", slug: "cameras", parentId: 15 },
  { id: 19, name: "Furniture & Decor", slug: "furniture", parentId: null },
  { id: 20, name: "Jobs", slug: "jobs", parentId: null },
  { id: 21, name: "Services", slug: "services", parentId: null },
  { id: 22, name: "Fashion & Beauty", slug: "fashion", parentId: null },
  { id: 23, name: "Kids & Babies", slug: "kids", parentId: null },
  { id: 24, name: "Sports & Equipment", slug: "sports", parentId: null },
  { id: 25, name: "Pets", slug: "pets", parentId: null },
];

export class ApiService {
  static async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Return mock data as fallback
      console.log("Using mock categories as fallback");
      return mockCategories;
    }
  }

  static async fetchCategoryFields(
    categorySlugs: string | string[],
    options: Options = {}
  ): Promise<CategoryFieldsResponse> {
    try {
      const slugsParam = Array.isArray(categorySlugs)
        ? categorySlugs.join(",")
        : categorySlugs;

      const queryParams = new URLSearchParams({
        categorySlugs: slugsParam,
        includeChildCategories: String(options.includeChildCategories ?? true),
        splitByCategoryIDs: String(options.splitByCategoryIDs ?? true),
        flatChoices: String(options.flatChoices ?? true),
        groupChoicesBySection: String(options.groupChoicesBySection ?? true),
        flat: String(options.flat ?? true),
      });

      const url = `${BASE_URL}/categoryFields?${queryParams.toString()}`;
      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch category fields: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching category fields:", error);
      // Return empty data as fallback
      return { data: {} };
    }
  }
}
