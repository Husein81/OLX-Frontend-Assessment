// API Type Definitions for OLX Categories and Fields

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  children?: Category[];
  parentId?: number | null;
}

export interface FieldChoice {
  id: number;
  label: string;
  value: string;
  parentId?: number | null;
}

export interface CategoryField {
  id: number;
  name: string;
  label: string;
  type:
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "textarea"
  | "date";
  required: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  choices?: FieldChoice[];
  validation?: {
    pattern?: string;
    message?: string;
  };
  order?: number;
  section?: string;
}

export interface CategoryFieldsResponse {
  data: {
    [categoryId: string]: CategoryField[];
  };
}

export interface FormData {
  [key: string]: string | number | string[] | boolean | undefined;
  title?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  categorySlug?: string;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  categorySlug: string;
  categoryName: string;
  image?: string;
  location?: string;
  createdAt: string;
}

