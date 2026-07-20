import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  footer?: React.ReactNode
}

export function AuthLayout({ children, title, subtitle, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 auth-gradient">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="HOLY COOK" className="mx-auto h-12 w-auto" />
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-cream">
            {title}
          </h1>
          <p className="mt-2 text-sm text-cream/60">{subtitle}</p>
        </header>

        <div className="rounded-xl border border-dark-border bg-dark-surface/80 p-8 shadow-2xl backdrop-blur-sm">
          {children}
        </div>

        {footer && <footer className="mt-6 text-center text-sm text-cream/60">{footer}</footer>}
      </div>
    </div>
  )
}
