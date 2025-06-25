'use client'

import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

export default function HeaderMenu() {
  const router = useRouter()

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button className="inline-flex justify-center w-full rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
          ☰ Menu <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Menu.Button>

        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/home')}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Trang chính
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/characters')}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  🧩 Nhân vật
                </button>
              )}
            </Menu.Item>
            {/* Add more menu items here */}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}
