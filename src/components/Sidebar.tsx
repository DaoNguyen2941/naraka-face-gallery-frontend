'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronRight } from "lucide-react"
import characters from "@/data/characters.json"
import album from "@/data/album.json"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [showCharacters, setShowCharacters] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative h-screen w-72 bg-gray-900/80 text-white p-4 overflow-y-auto shadow-lg backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col">
              {/* Static items */}
              {[
                { label: "Home", path: "/home" },
                { label: "Mới cập nhật", path: "/home?sort=newest" },
                { label: "Đầu tóc", path: "/home?sort=newest" },
              ].map((item, i) => (
                <div key={i}>
                  <div
                    className="px-3 py-2 cursor-pointer hover:bg-gray-700 rounded"
                    onClick={() => {
                      router.push(item.path)
                      onClose()
                    }}
                  >
                    🧩 {item.label}
                  </div>
                  <hr className="my-2 border-gray-700" />
                </div>
              ))}

              {/*  QR-code make up */}
              <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-700 rounded flex items-center justify-between"
                onClick={() => setShowCharacters(!showCharacters)}
              >
                <span>🧩 QR-code make up</span>
                {showCharacters ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <hr className="my-2 border-gray-700" />

              <AnimatePresence>
                {showCharacters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1"
                  >
                    {characters.map((char) => (
                      <div
                        key={char.id}
                        className="ml-4 px-3 py-1 cursor-pointer hover:bg-gray-700 rounded text-sm flex items-center gap-2"
                        onClick={() => {
                          router.push(`/home/characters/${char.id}`)
                          onClose()
                        }}
                      >
                        <Image
                          src={char.avatar}
                          alt={char.name}
                          width={40}
                          height={40}
                          className="aspect-square object-cover rounded"
                        />
                        <span>{char.name}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* anbum */}
              <div
                className="mt-2 px-3 py-2 cursor-pointer hover:bg-gray-700 rounded flex items-center justify-between"
                onClick={() => setShowCategories(!showCategories)}
              >
                <span>🧩 anbum</span>
                {showCategories ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <hr className="my-2 border-gray-700" />

              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1"
                  >
                    {album.map((cat) => (
                      <div
                        key={cat.id}
                        className="ml-4 px-3 py-1 cursor-pointer hover:bg-gray-700 rounded text-sm"
                        onClick={() => {
                          router.push(`/home?category=${cat.id}`)
                          onClose()
                        }}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
