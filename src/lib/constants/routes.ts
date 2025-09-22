// src/lib/constants/routes.ts

export const ROUTES = {
  admin: {},
  public: {
    home: "/",
    new: "/new",
    hot:"/hot",
    faces: "/faces",
    character: "/character",
    instruction: '/faces/instructions',
  },
}

export const buildFaceDetailUrl = (slug: string) =>
  `${ROUTES.public.faces}/${slug}`;

export const buildCharacterDetailUrl = (slug: string) => 
  `${ROUTES.public.character}/${slug}`;

export const menuSidebar = [
  { label: "Trang chủ", path: ROUTES.public.home },
  { label: "Mới cập nhật", path: ROUTES.public.new },
  { label: "xem nhiều nhất", path: ROUTES.public.hot },
]