require('dotenv').config();
export const PORT = process.env.PORT || 8080;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
export const ADYEN_API_KEY = process.env.ADYEN_API_KEY || '';
export const ADYEN_BASE_URL = process.env.ADYEN_BASE_URL || 'https://checkout-test.adyen.com';
export const ADYEN_MERCHANT_ACCOUNT = process.env.ADYEN_MERCHANT_ACCOUNT || '';
export const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1/adyen-demo';
export const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://127.0.0.1/adyen-demo-test';
export const JWT_SECRET = process.env.JWT_SECRET || 'PROJECT_AW_ULTRA';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
