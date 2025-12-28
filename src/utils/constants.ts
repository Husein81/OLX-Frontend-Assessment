// Application constants

export const APP_NAME = 'Classifieds';

export const API_BASE_URL = 'https://www.olx.com.lb/api';

export const ROUTES = {
  HOME: '/',
  POST_AD: '/post-ad',
  CATEGORY: '/category',
  AD_DETAIL: '/ad',
} as const;

export const COLORS = {
  PRIMARY: '#000000',
  SECONDARY: '#002f34',
  ERROR: '#cc0000',
  SUCCESS: '#27ae60',
  WARNING: '#f39c12',
  INFO: '#3498db',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#666666',
  BACKGROUND: '#f2f2f2',
  BORDER: '#e0e0e0',
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1200,
} as const;

export const FORM_VALIDATION = {
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_PRICE: 0,
  MAX_PRICE: 999999999,
} as const;

export const SUPPORTED_CATEGORIES = {
  PROPERTIES_FOR_SALE: 'properties-for-sale',
  CARS_FOR_SALE: 'cars-for-sale',
  MOBILE_PHONES: 'mobile-phones',
  ELECTRONICS: 'electronics',
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  MIN_VALUE: (min: number) => `Minimum value is ${min}`,
  MAX_VALUE: (max: number) => `Maximum value is ${max}`,
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

export const SUCCESS_MESSAGES = {
  AD_POSTED: 'Your ad has been posted successfully!',
  FORM_SUBMITTED: 'Form submitted successfully!',
} as const;

