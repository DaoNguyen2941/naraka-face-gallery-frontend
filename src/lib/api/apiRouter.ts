// lib/api/apiRouter.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiRoutes = {
  host: API_BASE,
  admin: {
    login: () => `/admin/auth/login`,
    refresh: () => `/admin/auth/refresh`,
    characters: (id?: string) => id ? `/admin/characters/${id}` : `/admin/characters`,
    tag: (id?: string) => id ? `/admin/tag/${id}` : `/admin/tag`,
    album: (id?:string) => id ? `/admin/category/${id}` : `/admin/category`,
    face: (id?:string) => id? `/admin/face/${id}` : `/admin/face`,
  },
  public: {

  }
};
