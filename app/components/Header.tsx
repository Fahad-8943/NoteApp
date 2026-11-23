"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";


export default function Header() {

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/login'
        })

    }

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 4.75A2.75 2.75 0 0110.75 2h7.5A2.75 2.75 0 0121 4.75v11.5A2.75 2.75 0 0118.25 19h-7.5A2.75 2.75 0 018 16.25V4.75zM8 6H5.75A2.75 2.75 0 003 8.75v11.5A2.75 2.75 0 005.75 23h7.5A2.75 2.75 0 0016 20.25V19M12 7h5m-5 4h5m-5 4h3" />
                        </svg>
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-bold tracking-tight text-slate-900">Note app</span>
                        <span className="hidden text-xs text-slate-500 sm:block">Your ideas, organized</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    )
}
