"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
                GatherGrid
            </Link>

            <div className="hidden gap-2 md:flex">
                <Link href="/" className={pathname === '/' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}>
                    Home
                </Link>

                <Link href="/activities" className={pathname === "/activities" || pathname.startsWith('/activities/') ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}>
                    Activities
                </Link>
            </div>

            <button
                type="button"
                onClick={() =>
                    setIsMobileMenuOpen((previous) => !previous)
                }
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 md:hidden"
            >
                Menu
            </button>
        </div>

        {isMobileMenuOpen && (
            <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 pb-4 md:hidden">
                <Link
                    href="/"
                    className={pathname === '/' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Home
                </Link>

                <Link
                    href="/activities"
                    className={pathname === "/activities" || pathname.startsWith('/activities/') ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Activities
                </Link>
            </div>
        )}
    </nav>
  )
}
