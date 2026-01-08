import React, { useMemo, useState, useCallback, useRef } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Button, Card, Input, Layout, Select, Textarea } from "@/components";
import { useCategories, useCategoryFields } from "@/hooks";
import { ApiService } from "@/services/api";
import { useLocale } from "@/contexts/LocaleContext";
import { Category, CategoryField, FormData } from "@/types/api";
import {
  getCategoryFieldConfig,
  CustomField,
  CategoryFieldConfig,
} from "@/config/categoryFields";
import styles from "@/styles/PostAd.module.css";

interface PageProps {
  dehydratedState: DehydratedState;
}

// Lebanese cities for location dropdown
const LEBANON_CITIES = [
  { value: "beirut", label: "Beirut", labelAr: "بيروت" },
  { value: "tripoli", label: "Tripoli", labelAr: "طرابلس" },
  { value: "sidon", label: "Sidon", labelAr: "صيدا" },
  { value: "tyre", label: "Tyre", labelAr: "صور" },
  { value: "jounieh", label: "Jounieh", labelAr: "جونيه" },
  { value: "byblos", label: "Byblos", labelAr: "جبيل" },
  { value: "zahle", label: "Zahle", labelAr: "زحلة" },
  { value: "baalbek", label: "Baalbek", labelAr: "بعلبك" },
  { value: "nabatieh", label: "Nabatieh", labelAr: "النبطية" },
  { value: "aley", label: "Aley", labelAr: "عاليه" },
  { value: "batroun", label: "Batroun", labelAr: "البترون" },
  { value: "broummana", label: "Broummana", labelAr: "برمانا" },
  { value: "dbayeh", label: "Dbayeh", labelAr: "ضبية" },
  { value: "achrafieh", label: "Achrafieh", labelAr: "الأشرفية" },
  { value: "hamra", label: "Hamra", labelAr: "الحمرا" },
  { value: "verdun", label: "Verdun", labelAr: "فردان" },
  { value: "sin-el-fil", label: "Sin el Fil", labelAr: "سن الفيل" },
  { value: "dekwaneh", label: "Dekwaneh", labelAr: "الدكوانة" },
  { value: "mount-lebanon", label: "Mount Lebanon", labelAr: "جبل لبنان" },
  { value: "other", label: "Other", labelAr: "أخرى" },
];

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  vehicles: "🚗",
  cars: "🚗",
  properties: "🏠",
  "properties-for-sale": "🏠",
  "properties-for-rent": "🏠",
  mobiles: "📱",
  "mobile-phones": "📱",
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

// Image preview type
interface ImagePreview {
  id: string;
  file: File;
  preview: string;
}

export default function PostAd({ dehydratedState }: PageProps) {
  const [step, setStep] = useState<"category" | "form">("category");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Category | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [showPhone, setShowPhone] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, locale } = useLocale();

  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();

  const categories = categoriesResponse || [];

  const categorySlugForFields =
    selectedSubCategory?.slug || selectedCategory?.slug || null;

  const {
    data: fieldsResponse,
    isLoading: isLoadingFields,
    error: fieldsError,
  } = useCategoryFields(categorySlugForFields);

  // Get custom field configuration for the selected category
  const customFieldConfig: CategoryFieldConfig | null = useMemo(() => {
    if (!categorySlugForFields) return null;
    return getCategoryFieldConfig(categorySlugForFields);
  }, [categorySlugForFields]);

  // API fields (if available)
  const apiFields = useMemo(() => {
    if (!fieldsResponse?.data) return [];
    const allFields: CategoryField[] = [];
    Object.values(fieldsResponse.data).forEach((fields) => {
      allFields.push(...fields);
    });
    allFields.sort((a, b) => (a.order || 0) - (b.order || 0));
    return allFields;
  }, [fieldsResponse]);

  const mainCategories = categories.filter((cat) => !cat.parentId);

  const subCategories = selectedCategory
    ? categories.filter((cat) => cat.parentId === selectedCategory.id)
    : [];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);

    const subs = categories.filter((cat) => cat.parentId === category.id);
    if (subs.length === 0) {
      setStep("form");
    }
  };

  const handleSubCategoryClick = (subCategory: Category) => {
    setSelectedSubCategory(subCategory);
    setStep("form");
  };

  const handleBackToCategories = () => {
    setStep("category");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setFormData({ title: "", description: "", price: undefined });
    setErrors({});
    setImages([]);
    setVideoUrl("");
    setLocation("");
    setAddress("");
    setIsNegotiable(false);
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const newValue =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

      setFormData((prev) => ({ ...prev, [name]: newValue }));
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }, []);

  // Image upload handlers
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const remainingSlots = 8 - images.length;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);

      const newImages: ImagePreview[] = filesToAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [images.length]
  );

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      if (!files) return;

      const remainingSlots = 8 - images.length;
      const filesToAdd = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, remainingSlots);

      const newImages: ImagePreview[] = filesToAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [images.length]
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.title || formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    // Validate custom required fields
    if (customFieldConfig) {
      customFieldConfig.mainFields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${
            locale === "ar" ? field.labelAr : field.label
          } is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log form data for demo
    console.log("Form submitted:", {
      ...formData,
      images: images.map((img) => img.file.name),
      videoUrl,
      location,
      address,
      isNegotiable,
      contactName,
      contactPhone,
      showPhone,
    });
    alert(t.postAd.successMessage);

    setIsSubmitting(false);
    handleBackToCategories();
  };

  // Render custom field from config
  const renderCustomField = (field: CustomField) => {
    const label = locale === "ar" ? field.labelAr : field.label;
    const placeholder =
      locale === "ar" ? field.placeholderAr : field.placeholder;

    const commonProps = {
      key: field.id,
      name: field.name,
      label,
      required: field.required,
      error: errors[field.name],
      fullWidth: true,
    };

    switch (field.type) {
      case "text":
        return (
          <Input
            {...commonProps}
            placeholder={placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      case "number":
        return (
          <Input
            {...commonProps}
            type="number"
            placeholder={placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
            min={field.min}
            max={field.max}
          />
        );
      case "select":
        return (
          <Select
            {...commonProps}
            options={
              field.options?.map((opt) => ({
                value: opt.value,
                label: locale === "ar" ? opt.labelAr : opt.label,
              })) || []
            }
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  // Render API field
  const renderApiField = (field: CategoryField) => {
    const commonProps = {
      key: field.id,
      name: field.name,
      label: field.label,
      required: field.required,
      error: errors[field.name],
      fullWidth: true,
    };

    switch (field.type) {
      case "text":
        return (
          <Input
            {...commonProps}
            placeholder={field.placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      case "number":
        return (
          <Input
            {...commonProps}
            type="number"
            placeholder={field.placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
            min={field.min}
            max={field.max}
          />
        );
      case "select":
      case "radio":
        return (
          <Select
            {...commonProps}
            options={
              field.choices?.map((c) => ({ value: c.value, label: c.label })) ||
              []
            }
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <Head>
        <title>{`${t.postAd.title} | OLX Lebanon`}</title>
        <meta name="description" content={t.postAd.subtitle} />
      </Head>
      <Layout>
        {isLoadingCategories ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>{t.postAd.loadingCategories}</p>
          </div>
        ) : categoriesError ? (
          <div className={styles.errorContainer}>
            <p>{t.postAd.errorCategories}</p>
          </div>
        ) : step === "category" ? (
          // Category Selection Step
          <div className={styles.categoryPage}>
            <div className={styles.categoryHeader}>
              <h1>{t.postAd.title}</h1>
              <p>{t.postAd.chooseCategory}</p>
            </div>

            <div className={styles.categoryContainer}>
              {/* Main Categories */}
              <div className={styles.mainCategories}>
                <h2>{t.postAd.category}</h2>
                <ul className={styles.categoryList}>
                  {mainCategories.map((category) => {
                    const fieldConfig = getCategoryFieldConfig(category.slug);
                    const hasFields = fieldConfig !== null;

                    return (
                      <li
                        key={category.id}
                        className={`${styles.categoryItem} ${
                          selectedCategory?.id === category.id
                            ? styles.active
                            : ""
                        } ${hasFields ? styles.hasFields : ""}`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <span className={styles.categoryIcon}>
                          {getCategoryIcon(category.slug, category.name)}
                        </span>
                        <span className={styles.categoryName}>
                          {category.name}
                        </span>
                        {hasFields && (
                          <span
                            className={styles.fieldsIndicator}
                            title="Has custom fields"
                          >
                            📝
                          </span>
                        )}
                        {categories.some((c) => c.parentId === category.id) && (
                          <span className={styles.arrow}>›</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Subcategories */}
              {selectedCategory && subCategories.length > 0 && (
                <div className={styles.subCategories}>
                  <h2>{selectedCategory.name}</h2>
                  <ul className={styles.categoryList}>
                    {subCategories.map((subCategory) => {
                      const fieldConfig = getCategoryFieldConfig(
                        subCategory.slug
                      );
                      const hasFields = fieldConfig !== null;

                      return (
                        <li
                          key={subCategory.id}
                          className={`${styles.categoryItem} ${
                            selectedSubCategory?.id === subCategory.id
                              ? styles.active
                              : ""
                          } ${hasFields ? styles.hasFields : ""}`}
                          onClick={() => handleSubCategoryClick(subCategory)}
                        >
                          <span className={styles.categoryName}>
                            {subCategory.name}
                          </span>
                          {hasFields && (
                            <span
                              className={styles.fieldsIndicator}
                              title="Has custom fields"
                            >
                              📝
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Form Step
          <div className={styles.formPage}>
            <div className={styles.formHeader}>
              <button
                onClick={handleBackToCategories}
                className={styles.backButton}
              >
                ← {t.postAd.backToCategories}
              </button>
              <div className={styles.selectedPath}>
                <span>{selectedCategory?.name}</span>
                {selectedSubCategory && (
                  <>
                    <span className={styles.pathSeparator}>›</span>
                    <span>{selectedSubCategory.name}</span>
                  </>
                )}
              </div>
            </div>

            <div className={styles.formLayout}>
              {/* Main Form */}
              <div className={styles.formMain}>
                <Card className={styles.formCard}>
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    noValidate
                  >
                    {/* Selected Category Display */}
                    <div className={styles.section}>
                      <div className={styles.categoryDisplay}>
                        <label>{t.postAd.selectedCategory}</label>
                        <div className={styles.categoryBadge}>
                          <span className={styles.categoryIcon}>
                            {getCategoryIcon(
                              selectedSubCategory?.slug ||
                                selectedCategory?.slug ||
                                "",
                              selectedSubCategory?.name ||
                                selectedCategory?.name ||
                                ""
                            )}
                          </span>
                          <span>
                            {selectedSubCategory?.name ||
                              selectedCategory?.name}
                          </span>
                          <button
                            type="button"
                            onClick={handleBackToCategories}
                            className={styles.changeButton}
                          >
                            {t.postAd.change}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className={styles.section}>
                      <h2>{t.postAd.uploadImages}</h2>
                      <p className={styles.sectionDesc}>
                        {t.postAd.uploadImagesDesc}
                      </p>

                      <div className={styles.imageUploadArea}>
                        <div
                          className={styles.uploadDropzone}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className={styles.fileInput}
                            aria-label={t.postAd.uploadImages}
                          />
                          <div className={styles.uploadIcon}>
                            <svg
                              viewBox="0 0 24 24"
                              width="48"
                              height="48"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path
                                d="M4 16l4-4 4 4M14 12l4-4 4 4M4 20h16M12 4v12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className={styles.uploadText}>
                            {t.postAd.dragDrop}
                          </p>
                          <span className={styles.uploadHint}>
                            {images.length > 0
                              ? `${images.length} ${t.postAd.photoAdded} (${
                                  8 - images.length
                                } remaining)`
                              : t.postAd.maxPhotos}
                          </span>
                        </div>

                        {images.length > 0 && (
                          <div className={styles.imagePreviewGrid}>
                            {images.map((img, index) => (
                              <div key={img.id} className={styles.imagePreview}>
                                <img
                                  src={img.preview}
                                  alt={`Preview ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(img.id)}
                                  className={styles.removeImageBtn}
                                  aria-label={t.postAd.removePhoto}
                                >
                                  ×
                                </button>
                                {index === 0 && (
                                  <span className={styles.mainImageBadge}>
                                    Main
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Video URL Section */}
                    <div className={styles.section}>
                      <h2>{t.postAd.addVideo}</h2>
                      <p className={styles.sectionDesc}>
                        {t.postAd.videoUrlDesc}
                      </p>
                      <Input
                        name="videoUrl"
                        label={t.postAd.videoUrl}
                        placeholder={t.postAd.videoUrlPlaceholder}
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        fullWidth
                      />
                    </div>

                    {/* Basic Info Section */}
                    <div className={styles.section}>
                      <h2>{t.postAd.basicInfo}</h2>
                      <div className={styles.formGrid}>
                        <Input
                          name="title"
                          label={t.postAd.adTitle}
                          placeholder={t.postAd.adTitlePlaceholder}
                          value={formData.title || ""}
                          onChange={handleInputChange}
                          required
                          error={errors.title}
                          fullWidth
                        />
                        <div className={styles.priceRow}>
                          <Input
                            type="number"
                            name="price"
                            label={t.postAd.price}
                            placeholder={t.postAd.pricePlaceholder}
                            value={formData.price?.toString() || ""}
                            onChange={handleInputChange}
                            error={errors.price}
                            fullWidth
                            min={0}
                          />
                          <label className={styles.negotiableCheckbox}>
                            <input
                              type="checkbox"
                              checked={isNegotiable}
                              onChange={(e) =>
                                setIsNegotiable(e.target.checked)
                              }
                            />
                            <span>{t.postAd.negotiable}</span>
                          </label>
                        </div>
                      </div>
                      <Textarea
                        name="description"
                        label={t.postAd.description}
                        placeholder={t.postAd.descriptionPlaceholder}
                        value={formData.description || ""}
                        onChange={handleInputChange}
                        required
                        error={errors.description}
                        fullWidth
                        rows={5}
                      />
                    </div>

                    {/* Custom Main Fields (from config) */}
                    {customFieldConfig &&
                      customFieldConfig.mainFields.length > 0 && (
                        <div className={styles.section}>
                          <h2>{t.postAd.additionalDetails}</h2>
                          <div className={styles.formGrid}>
                            {customFieldConfig.mainFields.map((field) =>
                              renderCustomField(field)
                            )}
                          </div>
                        </div>
                      )}

                    {/* Vehicle Details Table */}
                    {customFieldConfig?.detailsTable && (
                      <div className={styles.section}>
                        <h2>
                          {locale === "ar"
                            ? customFieldConfig.detailsTable.titleAr
                            : customFieldConfig.detailsTable.title}
                        </h2>
                        <div className={styles.detailsTable}>
                          {customFieldConfig.detailsTable.fields.map(
                            (field) => (
                              <div key={field.id} className={styles.detailRow}>
                                <span className={styles.detailLabel}>
                                  {locale === "ar"
                                    ? field.labelAr
                                    : field.label}
                                </span>
                                <div className={styles.detailValue}>
                                  {field.type === "select" && field.options ? (
                                    <select
                                      name={field.name}
                                      value={
                                        (formData[field.name] as string) || ""
                                      }
                                      onChange={handleInputChange}
                                      className={styles.detailSelect}
                                      aria-label={
                                        locale === "ar"
                                          ? field.labelAr
                                          : field.label
                                      }
                                    >
                                      <option value="">
                                        {locale === "ar"
                                          ? "اختر..."
                                          : "Select..."}
                                      </option>
                                      {field.options.map((opt) => (
                                        <option
                                          key={opt.value}
                                          value={opt.value}
                                        >
                                          {locale === "ar"
                                            ? opt.labelAr
                                            : opt.label}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      value={
                                        (formData[field.name] as string) || ""
                                      }
                                      onChange={handleInputChange}
                                      className={styles.detailInput}
                                      placeholder={
                                        locale === "ar"
                                          ? field.placeholderAr
                                          : field.placeholder
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Property Amenities Table */}
                    {customFieldConfig?.amenitiesTable && (
                      <div className={styles.section}>
                        <h2>
                          {locale === "ar"
                            ? customFieldConfig.amenitiesTable.titleAr
                            : customFieldConfig.amenitiesTable.title}
                        </h2>
                        <div className={styles.amenitiesGrid}>
                          {customFieldConfig.amenitiesTable.fields.map(
                            (field) => (
                              <label
                                key={field.id}
                                className={styles.amenityCheckbox}
                              >
                                <input
                                  type="checkbox"
                                  name={field.name}
                                  checked={Boolean(formData[field.name])}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      field.name,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span className={styles.checkmark}>
                                  {Boolean(formData[field.name]) && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      className={styles.checkIcon}
                                    >
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                  )}
                                </span>
                                <span className={styles.amenityLabel}>
                                  {locale === "ar"
                                    ? field.labelAr
                                    : field.label}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* API Fields (fallback if no custom config) */}
                    {!customFieldConfig &&
                      !isLoadingFields &&
                      !fieldsError &&
                      apiFields.length > 0 && (
                        <div className={styles.section}>
                          <h2>{t.postAd.additionalDetails}</h2>
                          <div className={styles.formGrid}>
                            {apiFields.map((field) => renderApiField(field))}
                          </div>
                        </div>
                      )}

                    {isLoadingFields && !customFieldConfig && (
                      <div className={styles.loadingFields}>
                        <div className={styles.spinner}></div>
                        <p>{t.postAd.loadingFields}</p>
                      </div>
                    )}

                    {/* Location Section */}
                    <div className={styles.section}>
                      <h2>{t.postAd.location}</h2>
                      <div className={styles.formGrid}>
                        <Select
                          name="location"
                          label={t.postAd.city}
                          options={LEBANON_CITIES.map((city) => ({
                            value: city.value,
                            label: locale === "ar" ? city.labelAr : city.label,
                          }))}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          fullWidth
                        />
                        <Input
                          name="address"
                          label={t.postAd.address}
                          placeholder={t.postAd.addressPlaceholder}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          fullWidth
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.section}>
                      <h2>{t.postAd.contactInfo}</h2>
                      <div className={styles.formGrid}>
                        <Input
                          name="contactName"
                          label={t.postAd.name}
                          placeholder={t.postAd.namePlaceholder}
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          fullWidth
                        />
                        <Input
                          name="contactPhone"
                          label={t.postAd.phone}
                          placeholder={t.postAd.phonePlaceholder}
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          fullWidth
                        />
                      </div>
                      <label className={styles.showPhoneCheckbox}>
                        <input
                          type="checkbox"
                          checked={showPhone}
                          onChange={(e) => setShowPhone(e.target.checked)}
                        />
                        <span>{t.postAd.showPhone}</span>
                      </label>
                    </div>

                    <div className={styles.submitSection}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={isSubmitting}
                        fullWidth
                      >
                        {isSubmitting ? t.postAd.submitting : t.postAd.submit}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Help Sidebar */}
              <aside className={styles.helpSidebar}>
                <div className={styles.helpCard}>
                  <h3>{t.help.title}</h3>

                  <div className={styles.helpTip}>
                    <div className={styles.tipIcon}>💡</div>
                    <div className={styles.tipContent}>
                      <h4>{t.help.tip1Title}</h4>
                      <p>{t.help.tip1Desc}</p>
                    </div>
                  </div>

                  <div className={styles.helpTip}>
                    <div className={styles.tipIcon}>💰</div>
                    <div className={styles.tipContent}>
                      <h4>{t.help.tip2Title}</h4>
                      <p>{t.help.tip2Desc}</p>
                    </div>
                  </div>

                  <div className={styles.helpTip}>
                    <div className={styles.tipIcon}>🛡️</div>
                    <div className={styles.tipContent}>
                      <h4>{t.help.tip3Title}</h4>
                      <p>{t.help.tip3Desc}</p>
                    </div>
                  </div>

                  <button type="button" className={styles.helpLink}>
                    {t.help.viewTips} →
                  </button>
                </div>

                <div className={styles.faqCard}>
                  <h4>{t.help.faq}</h4>
                  <a href="#" className={styles.faqLink}>
                    {t.help.faqLink}
                  </a>
                </div>
              </aside>
            </div>
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
