"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image"
import UnreadMessageCount from "@/components/UnreadMessageCount"

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
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="text-xl font-bold tracking-tight text-gray-900 transition hover:text-gray-600">
                GatherGrid
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-1 md:flex">

                <Link href="/" className={pathname === '/' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}>
                    Home
                </Link>

                <Link
                    href="/activities"
                    className={
                        pathname === "/activities" ||
                    (
                        pathname.startsWith('/activities/') &&
                        pathname !== "/activities/add" &&
                        pathname !== "/activities/saved"
                    )
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }>
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

                {session && (
                    <Link
                        href='/activities/saved'
                        className={
                            pathname === "/activities/saved"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    >
                        Saved Activities
                    </Link>
                )}

                {session && profileImage && (
                    <Link
                        href="/profile"
                        className={`rounded-full transition ${
                            pathname === "/profile"
                                ? "ring-2 ring-gray-900 ring-offset-2"
                                : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                        }`}
                        aria-label="Profile"
                    >
                        <Image
                            src={profileImage}
                            alt={session.user.name || "Profile"}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </Link>
                )}

                {session && (
                    <Link
                        href="/messages"
                        className={
                            pathname === "/messages"
                                ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    >
                        Messages <UnreadMessageCount />
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
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 md:hidden"
            >
                Menu
            </button>
        </div>

        {/* Mobile */}
        {isMobileMenuOpen && (
            <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-6 md:hidden">
                <Link
                    href="/"
                    className={pathname === '/' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Home
                </Link>

                <Link
                    href="/activities"
                    className={
                        pathname === "/activities" ||
                    (
                        pathname.startsWith('/activities/') &&
                        pathname !== "/activities/add" &&
                        pathname !== "/activities/saved"
                    )
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
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
                        href="/activities/saved"
                        className={
                            pathname === "/activities/saved"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Saved Activities
                    </Link>
                )}

                {session && (
                    <Link
                        href="/messages"
                        className={
                            pathname === "/messages"
                                ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Messages <UnreadMessageCount />
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
