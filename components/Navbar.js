"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image"

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession()
    const profileImage = session?.user?.image;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        fetchProviders()
    }, [])


  return (
    <nav className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
                GatherGrid
            </Link>

            {/* Desktop */}
            <div className="hidden gap-2 md:flex">

                <Link href="/" className={pathname === '/' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}>
                    Home
                </Link>

                <Link href="/activities" className={pathname === "/activities" || (pathname.startsWith('/activities/') && pathname !== "/activities/add") ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}>
                    Activities
                </Link>

                {session && (
                    <Link
                        href="/activities/add"
                        className={
                            pathname === "/activities/add"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    >
                        Add Activity
                    </Link>
                )}

                {session && profileImage && (
                    <Link href="/profile">
                        <Image
                            src={profileImage}
                            alt={session.user.name || "Profile"}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </Link>

                )}

                {session && (
                    <button
                        type="button"
                        onClick={() => signOut()}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Sign Out
                    </button>
                )}

                {!session &&
                    providers &&
                    Object.values(providers).map((provider) => (
                        <button
                            key={provider.id}
                            onClick={() => signIn(provider.id)}
                            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            Sign In with {provider.name}
                        </button>
                        )
                    )
                }
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

        {/* Mobile */}
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
                    className={pathname === "/activities" || (pathname.startsWith('/activities/') && pathname !== "/activities/add") ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Activities
                </Link>

                {session && (
                    <Link
                        href="/activities/add"
                        className={
                            pathname === "/activities/add"
                                ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Add Activity
                    </Link>
                )}

                {session && (
                    <Link
                        href="/profile"
                        className={
                        pathname === "/profile"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                       Profile
                    </Link>
                )}

                {!session &&
                    providers &&
                    Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.id}
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                signIn(provider.id)
                            }}
                            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            Sign In with {provider.name}
                        </button>
                    ))

                }
                {session && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileMenuOpen(false)
                            signOut()
                        }}

                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Sign Out
                    </button>
                )
                }
            </div>
        )}
    </nav>
  )
}
