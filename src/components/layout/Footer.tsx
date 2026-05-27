import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-5 text-center text-sm text-[var(--color-text-muted)] md:px-8">
        <p>
          © {new Date().getFullYear()} {site.nameCn} · {site.title}
        </p>
      </div>
    </footer>
  )
}
