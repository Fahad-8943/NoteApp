"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useState } from "react"

import toast from "react-hot-toast"



export default function Register() {
    const [userData, setUserData] = useState({
        name: "", email: "", password: ""
    })
    const router = useRouter()

    const handleRegister = async (e: any) => {
        e.preventDefault()
        const { name, email, password } = userData
        if (!name || !email || !password) {

            toast.error("Please fill the form completely", {
                duration: 2000
            })
            return
        }
        else {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            const serverResponse = await res.json()
            if (res.status == 201) {
                toast.success(serverResponse.message)
                router.push('/login')
            }
            else {

                toast.error(serverResponse.message || "Registration failed")
            }
            setUserData({ name: "", email: "", password: "" })
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-5 py-10">
            <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_24px_70px_-32px_rgba(30,64,175,0.38)] sm:p-9">
                <h1 className="text-center text-3xl font-bold text-slate-900">Note Hub</h1>
                <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Register</p>
                <form action="" className="mt-7" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="register-name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                        <input value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} id="register-name" type="text" placeholder="Your name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                        <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} id="register-email" type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                        <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} id="register-password" type="password" placeholder="Create a password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                    </div>
                    <div className="mt-6 text-center">
                        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700" >Register</button>
                        <p className="mt-5 text-sm text-slate-600">Already a User? Click here to <Link href={'/login'} className="font-semibold text-blue-600 hover:text-blue-800">Login</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

