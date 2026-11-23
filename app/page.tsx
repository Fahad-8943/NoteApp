import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_24px_70px_-32px_rgba(30,64,175,0.35)] backdrop-blur sm:p-10 md:grid-cols-[1fr_0.9fr]">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">Your ideas, organized</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">Note Hub</h1>
          <h3 className="mt-3 text-2xl font-semibold text-blue-700 sm:text-3xl">Capture Your Thoughts</h3>
          <p className="my-6 max-w-xl text-lg leading-8 text-slate-600">Bring meeting notes, project docs, and shared resources together in one searchable hub. Keep everyone aligned with real-time collaboration, clean version history, and instant access across devices.</p>
          <Link href={'/login'} className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl">Login</Link>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-white p-4 shadow-inner">
            <Image height={400} width={500} alt="Note Hub illustration" className="h-auto w-full max-w-md rounded-3xl" src={'https://cdn-icons-gif.flaticon.com/16678/16678003.gif'} />
          </div>
        </div>
      </div>
    </main>
  );
}
