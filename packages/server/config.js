module.exports = {
  PORT: process.env.PORT || 8080,
  ADYEN_API_KEY: process.env.ADYEN_API_KEY || null,
  ADYEN_BASE_URL:
    process.env.ADYEN_BASE_URL || "https://checkout-test.adyen.com",
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/my-store",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || "mongodb://localhost/my-store-test",
  JWT_SECRET: process.env.JWT_SECRET || "PROJECT_AW_ULTRA",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",
};
