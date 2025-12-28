// Zod validation schemas for forms

import { z } from "zod";
import { FORM_VALIDATION } from "@/utils/constants";

// Ad form validation schema - using constants for consistency
export const adFormSchema = z.object({
  title: z
    .string()
    .min(
      FORM_VALIDATION.MIN_TITLE_LENGTH,
      `Title must be at least ${FORM_VALIDATION.MIN_TITLE_LENGTH} characters`
    )
    .max(
      FORM_VALIDATION.MAX_TITLE_LENGTH,
      `Title must be at most ${FORM_VALIDATION.MAX_TITLE_LENGTH} characters`
    ),
  description: z
    .string()
    .min(
      FORM_VALIDATION.MIN_DESCRIPTION_LENGTH,
      `Description must be at least ${FORM_VALIDATION.MIN_DESCRIPTION_LENGTH} characters`
    )
    .max(
      FORM_VALIDATION.MAX_DESCRIPTION_LENGTH,
      `Description must be at most ${FORM_VALIDATION.MAX_DESCRIPTION_LENGTH} characters`
    ),
  price: z
    .number()
    .min(FORM_VALIDATION.MIN_PRICE, "Price must be positive")
    .max(FORM_VALIDATION.MAX_PRICE, "Price exceeds maximum allowed")
    .optional()
    .or(z.literal(undefined)),
  categoryId: z.string().optional(),
  categorySlug: z.string().min(1, "Category is required"),
});

// Dynamic field validation
export const createDynamicFieldSchema = (
  name: string,
  type: string,
  required: boolean,
  min?: number,
  max?: number
): z.ZodTypeAny => {
  let schema: z.ZodTypeAny;

  switch (type) {
    case "text":
    case "textarea":
      schema = z.string();
      if (min !== undefined) {
        schema = (schema as z.ZodString).min(
          min,
          `Minimum ${min} characters required`
        );
      }
      if (max !== undefined) {
        schema = (schema as z.ZodString).max(
          max,
          `Maximum ${max} characters allowed`
        );
      }
      break;

    case "number":
      schema = z.coerce.number();
      if (min !== undefined) {
        schema = (schema as z.ZodNumber).min(min, `Minimum value is ${min}`);
      }
      if (max !== undefined) {
        schema = (schema as z.ZodNumber).max(max, `Maximum value is ${max}`);
      }
      break;

    case "select":
    case "radio":
      schema = z.string();
      break;

    default:
      schema = z.string();
  }

  if (!required) {
    return schema.optional();
  }

  // For required fields, add min(1) for string types
  if (
    type === "text" ||
    type === "textarea" ||
    type === "select" ||
    type === "radio"
  ) {
    return (schema as z.ZodString).min(1, `${name} is required`);
  }

  return schema;
};

// Create complete form schema with dynamic fields
export const createCompleteFormSchema = (
  dynamicFields: Array<{
    name: string;
    type: string;
    required: boolean;
    min?: number;
    max?: number;
  }>
) => {
  const dynamicSchemaObject: Record<string, z.ZodTypeAny> = {};

  dynamicFields.forEach((field) => {
    dynamicSchemaObject[field.name] = createDynamicFieldSchema(
      field.name,
      field.type,
      field.required,
      field.min,
      field.max
    );
  });

  return adFormSchema.extend(dynamicSchemaObject);
};

// Type inference
export type AdFormData = z.infer<typeof adFormSchema>;
