"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Header from "../components/Header"


interface Note {
    _id: string
    title: string
    description: string
}


export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([])

    const getNotes = async () => {
        const res = await fetch(`/api/note`, {
            method: "GET"
        })
        // console.log(res)
        const response = await res.json()
        // console.log(response)

        setNotes(response.data)

    }

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/note/${id}`, {
            method: "DELETE"
        })
        const response = await res.json()

        if (res.status === 200) {
            setNotes((currentNotes) => currentNotes.filter((note) => note._id !== id))
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])



    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-50 px-4 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                            <p className="mt-1 text-slate-500">Manage your notes</p>
                        </div>
                        <Link
                            href="/dashboard/add"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Note
                        </Link>
                    </div>

                    {notes?.length === 0 ? (
                        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">No notes yet</h3>
                            <p className="mt-2 text-slate-500">Get started by creating your first note.</p>
                            <Link
                                href="/dashboard/add"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                            >
                                Create Note
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {notes?.map((note: Note) => (
                                <article
                                    key={note._id}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/dashboard/${note._id}`}
                                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-slate-900">{note.title}</h2>
                                    <p className="mb-4 line-clamp-3 text-sm text-slate-500">{note.description}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <span className="text-xs text-slate-400"></span>
                                        <Link
                                            href={`/dashboard/${note._id}`}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}