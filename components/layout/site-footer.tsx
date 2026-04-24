export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-slate-500 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <p>Built with Next.js App Router, Tailwind CSS, and Sanity Studio.</p>
        <p>Update content in /studio after configuring your Sanity project.</p>
      </div>
    </footer>
  );
}
