export const ROUTES = {
  admin: {
    dashboards:"/admin/dashboards",
    characters:"/admin/dashboards/characters",
    faces:"/admin/dashboards/face-images",
    tags:"/admin/dashboards/tags",
    album:"/admin/dashboards/album",
    history:"/admin/dashboards/history",
    traffic: {
      daily:"/admin/dashboards/traffic/daily",
      page: "/admin/dashboards/traffic/page"
    },
    contact:"/admin/dashboards/contact",
    trashCan:"/admin/dashboards/trash-can"
  },
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