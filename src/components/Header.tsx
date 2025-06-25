'use client'
import HeaderMenu from "./HeaderMenu";
import { Menu } from 'lucide-react'
export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="relative w-full pb-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-200 transition flex items-center gap-x-2"
        >
          <Menu className="w-6 h-6 text-black" />
          <span className="text-sm font-bold text-black">Menu</span>
        </button>

      </div>
      {/* Banner Image */}
      <img
        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/Naraka.jpg"
        alt="Naraka Banner"
        className="w-full h-40 md:h-60 object-cover rounded shadow-lg"
      />

      {/* Nút menu ở góc phải phía trên ảnh (absolute) */}
      {/* <div className="absolute top-4 left-4">
        <HeaderMenu />
      </div> */}
    </header>
  );
}
