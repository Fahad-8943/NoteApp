"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function AddNote() {
    const [note, setNote] = useState({
        title: "",
        description: ""
    })
    const router = useRouter()


    const handleNotes = async () => {
        const { title, description } = note
        if (title && description) {
            const res = await fetch(`/api/note`, {
                method: "POST",
                body: JSON.stringify(note)
            })
            const response = await res.json()
            console.log(response)

            if (res.status == 201) {
                toast.success(response.message)
                setNote({ title: "", description: "" })
                router.push('/dashboard')
            }


        }
        else {
            toast.error("enter the type and discription")
        }
    }


    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/dashboard"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
                >
                    <span aria-hidden="true">←</span>
                    Back to Dashboard
                </Link>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-32px_rgba(30,64,175,0.25)] sm:p-8">
                    <div className="border-b border-slate-100 pb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                            New note
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">Add Note</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Write down an idea or save something important.
                        </p>
                    </div>

                    <form action="" className="mt-6 space-y-5">
                        <div>
                            <label
                                htmlFor="note-title"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Title
                            </label>
                            <input
                                onChange={(e) => { setNote({ ...note, title: e.target.value }) }}
                                value={note.title}
                                id="note-title"
                                name="title"
                                type="text"
                                placeholder="Enter a title"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="note-content"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Content
                            </label>
                            <textarea
                                onChange={(e) => { setNote({ ...note, description: e.target.value }) }}
                                value={note.description}
                                id="note-content"
                                name="content"
                                rows={8}
                                placeholder="Write your note here..."
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                            <Link
                                href="/dashboard"
                                className="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="button"
                                onClick={handleNotes}
                                className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                            >
                                Save Note
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
