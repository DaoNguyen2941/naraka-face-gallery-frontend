const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiRoutes = {
  host: API_BASE,
  admin: {
    login: () => `/admin/auth/login`,
    refresh: () => `/admin/auth/refresh`,
    characters: (id?: string) => id ? `/admin/characters/${id}` : `/admin/characters`,
    tag: (id?: string) => id ? `/admin/tag/${id}` : `/admin/tag`,
    album: (id?: string) => id ? `/admin/category/${id}` : `/admin/category`,
    face: (id?: string) => id ? `/admin/face/${id}` : `/admin/face`,
    analytics: {
      dailyTrafficAnalysis: () => `/admin/analytics/daily`,
      pageTrafficAnalysis: () => `/admin/analytics/page`,
    },
    history: () => `/admin/activity-log`,
    logout: () => `/admin/auth/logout`,
    profile: () => `/admin/profile`,
    changePassword: () => `/admin/password/change`,
    resetPassword: () => `/admin/password/reset`,
  },
  public: {
    face: (slug?: string) => slug ? `/face/${slug}` : `/face`,
    character: (slug?: string) => slug ? `/character/${slug}` : `/character`,
    tag: (slug?: string) => slug ? `/tag/${slug}` : `/tag`,
    trackPage: () => `/analytics/pageview`,
    trackFace: (slug: string) => `/analytics/face/${slug}/view`
  }
};
