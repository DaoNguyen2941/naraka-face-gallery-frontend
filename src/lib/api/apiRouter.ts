// lib/api/apiRouter.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const apiRoutes = {
  host: API_BASE,
  admin: {
    login: () => `/admin/auth/login`,
    refresh: () => `/admin/auth/refresh`,
    profile: () => `/admin/me`,
    // ... thêm các route khác
  },
  // public: { ... }
};
