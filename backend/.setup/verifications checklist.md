 # Sprint 4 — Verification Checklist

# 1. Install new dependencies
npm install bcrypt jsonwebtoken

# 2. Add to your .env
JWT_ACCESS_SECRET=some_long_random_string_at_least_32_chars
JWT_REFRESH_SECRET=a_different_long_random_string
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# 3. Start dev server
npm run dev

# 4. Run tests (against a dedicated test DB)
MONGODB_URI=mongodb://localhost:27017/mediread_test npm test




Manual endpoint check:
POST /api/v1/auth/register   { fullName, email, password, preferredLanguage }
POST /api/v1/auth/login      { email, password }
GET  /api/v1/auth/me          Authorization: Bearer <accessToken>
POST /api/v1/auth/refresh    { refreshToken }
POST /api/v1/auth/logout     Authorization: Bearer <accessToken>  Body: { refreshToken }