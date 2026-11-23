"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'




export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const { email, password } = userData
        if (email && password) {
            const result = await signIn("credentials", {
                email: email.trim().toLowerCase(),
                password,
                callbackUrl: "/dashboard",
                redirect: false,
            })

            if (result?.error) {
                toast.error("Invalid email or password")
            } else if (result?.url) {
                window.location.href = result.url
            }
        } else {
            toast.error("enter email and password ")
        }
    }


    return (
        <main className="flex min-h-screen items-center justify-center px-5 py-10">
            <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_24px_70px_-32px_rgba(30,64,175,0.38)] sm:p-9">
                <h1 className="text-center text-3xl font-bold text-slate-900">Note Hub</h1>
                <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Login</p>
                <form onSubmit={handleLogin} className="mt-7">
                    <div>
                        <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                        <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                        <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                    </div>
                    <div className="mt-6 text-center">
                        <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700" >Login</button>
                        <p className="mt-5 text-sm text-slate-600">New a User? Click here to <Link href={'/register'} className="font-semibold text-blue-600 hover:text-blue-800">Login</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}