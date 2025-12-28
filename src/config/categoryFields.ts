// Category-specific field configurations
// These define custom fields for each category when the API doesn't provide them

export interface CustomField {
  id: string;
  name: string;
  label: string;
  labelAr: string;
  type: "text" | "number" | "select" | "checkbox" | "textarea";
  required: boolean;
  placeholder?: string;
  placeholderAr?: string;
  options?: Array<{ value: string; label: string; labelAr: string }>;
  min?: number;
  max?: number;
  section?: "main" | "details" | "amenities";
}

export interface CategoryFieldConfig {
  categorySlug: string;
  categoryMatches: string[]; // Slugs that should match this config
  mainFields: CustomField[];
  detailsTable?: {
    title: string;
    titleAr: string;
    fields: CustomField[];
  };
  amenitiesTable?: {
    title: string;
    titleAr: string;
    fields: CustomField[];
  };
}

// Vehicle field configuration
export const vehicleFieldsConfig: CategoryFieldConfig = {
  categorySlug: "vehicles",
  categoryMatches: [
    "vehicles",
    "cars",
    "cars-for-sale",
    "motorcycles",
    "auto-accessories",
  ],
  mainFields: [
    {
      id: "make",
      name: "make",
      label: "Brand / Make",
      labelAr: "الشركة المصنعة",
      type: "select",
      required: true,
      options: [
        { value: "toyota", label: "Toyota", labelAr: "تويوتا" },
        { value: "honda", label: "Honda", labelAr: "هوندا" },
        { value: "bmw", label: "BMW", labelAr: "بي إم دبليو" },
        { value: "mercedes", label: "Mercedes-Benz", labelAr: "مرسيدس بنز" },
        { value: "audi", label: "Audi", labelAr: "أودي" },
        { value: "nissan", label: "Nissan", labelAr: "نيسان" },
        { value: "hyundai", label: "Hyundai", labelAr: "هيونداي" },
        { value: "kia", label: "Kia", labelAr: "كيا" },
        { value: "ford", label: "Ford", labelAr: "فورد" },
        { value: "chevrolet", label: "Chevrolet", labelAr: "شيفروليه" },
        { value: "volkswagen", label: "Volkswagen", labelAr: "فولكس واجن" },
        { value: "lexus", label: "Lexus", labelAr: "لكزس" },
        { value: "porsche", label: "Porsche", labelAr: "بورشه" },
        { value: "land_rover", label: "Land Rover", labelAr: "لاند روفر" },
        { value: "jeep", label: "Jeep", labelAr: "جيب" },
        { value: "other", label: "Other", labelAr: "أخرى" },
      ],
    },
    {
      id: "model",
      name: "model",
      label: "Model",
      labelAr: "الموديل",
      type: "text",
      required: true,
      placeholder: "e.g. Camry, Civic, 320i",
      placeholderAr: "مثال: كامري، سيفيك",
    },
    {
      id: "year",
      name: "year",
      label: "Year",
      labelAr: "سنة الصنع",
      type: "select",
      required: true,
      options: Array.from({ length: 35 }, (_, i) => {
        const year = (2025 - i).toString();
        return { value: year, label: year, labelAr: year };
      }),
    },
    {
      id: "condition",
      name: "condition",
      label: "Condition",
      labelAr: "الحالة",
      type: "select",
      required: true,
      options: [
        { value: "new", label: "New", labelAr: "جديد" },
        { value: "used", label: "Used", labelAr: "مستعمل" },
      ],
    },
    {
      id: "kilometers",
      name: "kilometers",
      label: "Kilometers",
      labelAr: "عدد الكيلومترات",
      type: "number",
      required: true,
      placeholder: "e.g. 50000",
      placeholderAr: "مثال: 50000",
      min: 0,
      max: 1000000,
    },
    {
      id: "fuelType",
      name: "fuelType",
      label: "Fuel Type",
      labelAr: "نوع الوقود",
      type: "select",
      required: true,
      options: [
        { value: "petrol", label: "Petrol", labelAr: "بنزين" },
        { value: "diesel", label: "Diesel", labelAr: "ديزل" },
        { value: "hybrid", label: "Hybrid", labelAr: "هايبرد" },
        { value: "electric", label: "Electric", labelAr: "كهربائي" },
        { value: "lpg", label: "LPG", labelAr: "غاز" },
      ],
    },
    {
      id: "transmission",
      name: "transmission",
      label: "Transmission",
      labelAr: "ناقل الحركة",
      type: "select",
      required: true,
      options: [
        { value: "automatic", label: "Automatic", labelAr: "أوتوماتيك" },
        { value: "manual", label: "Manual", labelAr: "عادي" },
      ],
    },
  ],
  detailsTable: {
    title: "Vehicle Details",
    titleAr: "تفاصيل السيارة",
    fields: [
      {
        id: "color",
        name: "color",
        label: "Color",
        labelAr: "اللون",
        type: "select",
        required: false,
        options: [
          { value: "white", label: "White", labelAr: "أبيض" },
          { value: "black", label: "Black", labelAr: "أسود" },
          { value: "silver", label: "Silver", labelAr: "فضي" },
          { value: "gray", label: "Gray", labelAr: "رمادي" },
          { value: "red", label: "Red", labelAr: "أحمر" },
          { value: "blue", label: "Blue", labelAr: "أزرق" },
          { value: "brown", label: "Brown", labelAr: "بني" },
          { value: "green", label: "Green", labelAr: "أخضر" },
          { value: "other", label: "Other", labelAr: "أخرى" },
        ],
      },
      {
        id: "doors",
        name: "doors",
        label: "Number of Doors",
        labelAr: "عدد الأبواب",
        type: "select",
        required: false,
        options: [
          { value: "2", label: "2 Doors", labelAr: "بابين" },
          { value: "3", label: "3 Doors", labelAr: "3 أبواب" },
          { value: "4", label: "4 Doors", labelAr: "4 أبواب" },
          { value: "5", label: "5 Doors", labelAr: "5 أبواب" },
        ],
      },
      {
        id: "seats",
        name: "seats",
        label: "Number of Seats",
        labelAr: "عدد المقاعد",
        type: "select",
        required: false,
        options: [
          { value: "2", label: "2 Seats", labelAr: "مقعدين" },
          { value: "4", label: "4 Seats", labelAr: "4 مقاعد" },
          { value: "5", label: "5 Seats", labelAr: "5 مقاعد" },
          { value: "7", label: "7 Seats", labelAr: "7 مقاعد" },
          { value: "8+", label: "8+ Seats", labelAr: "8+ مقاعد" },
        ],
      },
      {
        id: "owners",
        name: "owners",
        label: "Number of Previous Owners",
        labelAr: "عدد المالكين السابقين",
        type: "select",
        required: false,
        options: [
          { value: "0", label: "First Owner", labelAr: "المالك الأول" },
          { value: "1", label: "1 Previous Owner", labelAr: "مالك سابق واحد" },
          { value: "2", label: "2 Previous Owners", labelAr: "مالكين سابقين" },
          { value: "3+", label: "3+ Previous Owners", labelAr: "3+ مالكين" },
        ],
      },
      {
        id: "source",
        name: "source",
        label: "Source / Origin",
        labelAr: "المصدر",
        type: "select",
        required: false,
        options: [
          { value: "gcc", label: "GCC Specs", labelAr: "خليجي" },
          { value: "american", label: "American Specs", labelAr: "أمريكي" },
          { value: "european", label: "European Specs", labelAr: "أوروبي" },
          { value: "japanese", label: "Japanese Specs", labelAr: "ياباني" },
          { value: "korean", label: "Korean Specs", labelAr: "كوري" },
          { value: "other", label: "Other", labelAr: "أخرى" },
        ],
      },
      {
        id: "interior",
        name: "interior",
        label: "Interior Material",
        labelAr: "المقصورة الداخلية",
        type: "select",
        required: false,
        options: [
          { value: "leather", label: "Leather", labelAr: "جلد" },
          { value: "fabric", label: "Fabric", labelAr: "قماش" },
          {
            value: "synthetic",
            label: "Synthetic Leather",
            labelAr: "جلد صناعي",
          },
          { value: "mixed", label: "Mixed", labelAr: "مختلط" },
        ],
      },
      {
        id: "carType",
        name: "carType",
        label: "Car Type",
        labelAr: "نوع السيارة",
        type: "select",
        required: false,
        options: [
          { value: "sedan", label: "Sedan", labelAr: "سيدان" },
          { value: "suv", label: "SUV", labelAr: "دفع رباعي" },
          { value: "hatchback", label: "Hatchback", labelAr: "هاتشباك" },
          { value: "coupe", label: "Coupe", labelAr: "كوبيه" },
          { value: "convertible", label: "Convertible", labelAr: "مكشوفة" },
          { value: "pickup", label: "Pickup", labelAr: "بيك أب" },
          { value: "van", label: "Van", labelAr: "فان" },
          { value: "wagon", label: "Wagon", labelAr: "ستيشن" },
        ],
      },
      {
        id: "sellerType",
        name: "sellerType",
        label: "Seller Type",
        labelAr: "نوع البائع",
        type: "select",
        required: false,
        options: [
          { value: "owner", label: "Owner", labelAr: "المالك" },
          { value: "dealer", label: "Dealer", labelAr: "معرض" },
        ],
      },
      {
        id: "paymentOptions",
        name: "paymentOptions",
        label: "Payment Options",
        labelAr: "خيارات الدفع",
        type: "select",
        required: false,
        options: [
          { value: "cash", label: "Cash Only", labelAr: "كاش فقط" },
          {
            value: "installments",
            label: "Installments Available",
            labelAr: "تقسيط متاح",
          },
          {
            value: "exchange",
            label: "Exchange Possible",
            labelAr: "تبديل ممكن",
          },
          { value: "negotiable", label: "Negotiable", labelAr: "قابل للتفاوض" },
        ],
      },
    ],
  },
};

// Property field configuration
export const propertyFieldsConfig: CategoryFieldConfig = {
  categorySlug: "properties",
  categoryMatches: [
    "properties",
    "properties-for-sale",
    "apartments-villas-for-sale",
    "apartments-villas-for-rent",
    "commercials-for-sale",
    "commercials-for-rent",
  ],
  mainFields: [
    {
      id: "size",
      name: "size",
      label: "Size (m²)",
      labelAr: "المساحة (م²)",
      type: "number",
      required: true,
      placeholder: "e.g. 150",
      placeholderAr: "مثال: 150",
      min: 1,
      max: 100000,
    },
    {
      id: "bedrooms",
      name: "bedrooms",
      label: "Bedrooms",
      labelAr: "غرف النوم",
      type: "select",
      required: true,
      options: [
        { value: "studio", label: "Studio", labelAr: "ستوديو" },
        { value: "1", label: "1 Bedroom", labelAr: "غرفة واحدة" },
        { value: "2", label: "2 Bedrooms", labelAr: "غرفتين" },
        { value: "3", label: "3 Bedrooms", labelAr: "3 غرف" },
        { value: "4", label: "4 Bedrooms", labelAr: "4 غرف" },
        { value: "5", label: "5 Bedrooms", labelAr: "5 غرف" },
        { value: "6+", label: "6+ Bedrooms", labelAr: "6+ غرف" },
      ],
    },
    {
      id: "bathrooms",
      name: "bathrooms",
      label: "Bathrooms",
      labelAr: "الحمامات",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "1 Bathroom", labelAr: "حمام واحد" },
        { value: "2", label: "2 Bathrooms", labelAr: "حمامين" },
        { value: "3", label: "3 Bathrooms", labelAr: "3 حمامات" },
        { value: "4", label: "4 Bathrooms", labelAr: "4 حمامات" },
        { value: "5+", label: "5+ Bathrooms", labelAr: "5+ حمامات" },
      ],
    },
    {
      id: "furnished",
      name: "furnished",
      label: "Furnishing",
      labelAr: "التأثيث",
      type: "select",
      required: true,
      options: [
        { value: "furnished", label: "Furnished", labelAr: "مفروش" },
        {
          value: "semi-furnished",
          label: "Semi-Furnished",
          labelAr: "نصف مفروش",
        },
        { value: "unfurnished", label: "Unfurnished", labelAr: "غير مفروش" },
      ],
    },
    {
      id: "ownership",
      name: "ownership",
      label: "Listed By",
      labelAr: "مدرج بواسطة",
      type: "select",
      required: true,
      options: [
        { value: "owner", label: "By Owner", labelAr: "المالك" },
        { value: "agent", label: "By Agent", labelAr: "وكيل عقاري" },
        { value: "company", label: "By Company", labelAr: "شركة عقارية" },
      ],
    },
    {
      id: "floor",
      name: "floor",
      label: "Floor",
      labelAr: "الطابق",
      type: "select",
      required: false,
      options: [
        { value: "ground", label: "Ground Floor", labelAr: "الطابق الأرضي" },
        { value: "1", label: "1st Floor", labelAr: "الطابق الأول" },
        { value: "2", label: "2nd Floor", labelAr: "الطابق الثاني" },
        { value: "3", label: "3rd Floor", labelAr: "الطابق الثالث" },
        { value: "4", label: "4th Floor", labelAr: "الطابق الرابع" },
        {
          value: "5+",
          label: "5th Floor or Higher",
          labelAr: "الطابق الخامس أو أعلى",
        },
        { value: "penthouse", label: "Penthouse", labelAr: "بنتهاوس" },
      ],
    },
  ],
  amenitiesTable: {
    title: "Amenities",
    titleAr: "المرافق والخدمات",
    fields: [
      {
        id: "balcony",
        name: "balcony",
        label: "Balcony",
        labelAr: "شرفة",
        type: "checkbox",
        required: false,
      },
      {
        id: "elevator",
        name: "elevator",
        label: "Elevator",
        labelAr: "مصعد",
        type: "checkbox",
        required: false,
      },
      {
        id: "storageRoom",
        name: "storageRoom",
        label: "Storage Room",
        labelAr: "غرفة تخزين",
        type: "checkbox",
        required: false,
      },
      {
        id: "electricity24",
        name: "electricity24",
        label: "24/7 Electricity",
        labelAr: "كهرباء 24/7",
        type: "checkbox",
        required: false,
      },
      {
        id: "coveredParking",
        name: "coveredParking",
        label: "Covered Parking",
        labelAr: "موقف مغطى",
        type: "checkbox",
        required: false,
      },
      {
        id: "centralAC",
        name: "centralAC",
        label: "Central A/C",
        labelAr: "تكييف مركزي",
        type: "checkbox",
        required: false,
      },
      {
        id: "security",
        name: "security",
        label: "24/7 Security",
        labelAr: "حراسة أمنية",
        type: "checkbox",
        required: false,
      },
      {
        id: "gym",
        name: "gym",
        label: "Gym / Fitness Center",
        labelAr: "صالة رياضية",
        type: "checkbox",
        required: false,
      },
      {
        id: "pool",
        name: "pool",
        label: "Swimming Pool",
        labelAr: "مسبح",
        type: "checkbox",
        required: false,
      },
      {
        id: "garden",
        name: "garden",
        label: "Garden / Terrace",
        labelAr: "حديقة / تراس",
        type: "checkbox",
        required: false,
      },
      {
        id: "maidRoom",
        name: "maidRoom",
        label: "Maid's Room",
        labelAr: "غرفة خادمة",
        type: "checkbox",
        required: false,
      },
      {
        id: "concierge",
        name: "concierge",
        label: "Concierge Service",
        labelAr: "خدمة الكونسيرج",
        type: "checkbox",
        required: false,
      },
      {
        id: "petsAllowed",
        name: "petsAllowed",
        label: "Pets Allowed",
        labelAr: "يُسمح بالحيوانات",
        type: "checkbox",
        required: false,
      },
      {
        id: "seaView",
        name: "seaView",
        label: "Sea View",
        labelAr: "إطلالة بحرية",
        type: "checkbox",
        required: false,
      },
      {
        id: "mountainView",
        name: "mountainView",
        label: "Mountain View",
        labelAr: "إطلالة جبلية",
        type: "checkbox",
        required: false,
      },
      {
        id: "generator",
        name: "generator",
        label: "Generator",
        labelAr: "مولد كهربائي",
        type: "checkbox",
        required: false,
      },
    ],
  },
};

// Get category field config by slug
export const getCategoryFieldConfig = (
  categorySlug: string
): CategoryFieldConfig | null => {
  const lowerSlug = categorySlug.toLowerCase();

  // Check vehicles
  if (
    vehicleFieldsConfig.categoryMatches.some((match) =>
      lowerSlug.includes(match)
    )
  ) {
    return vehicleFieldsConfig;
  }

  // Check properties
  if (
    propertyFieldsConfig.categoryMatches.some((match) =>
      lowerSlug.includes(match)
    )
  ) {
    return propertyFieldsConfig;
  }

  return null;
};

// Export all configs
export const categoryFieldConfigs: CategoryFieldConfig[] = [
  vehicleFieldsConfig,
  propertyFieldsConfig,
];
