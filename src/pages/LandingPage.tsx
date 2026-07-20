import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function LandingPage() {
  const { session, isLoading } = useAuth()

  useEffect(() => {
    document.title = 'HOLY COOK'
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-caramel border-t-transparent" />
      </div>
    )
  }

  if (session) {
    return <Navigate to="/painel" replace />
  }

  return (
    <div className="landing relative flex min-h-screen flex-col overflow-hidden bg-dark text-cream">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="landing-glow landing-glow--a absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] rounded-full" />
        <div className="landing-glow landing-glow--b absolute -right-1/4 bottom-[-10%] h-[55vh] w-[55vw] rounded-full" />
        <div className="landing-grain absolute inset-0 opacity-[0.35]" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <img
          src="/logo.png"
          alt="HOLY COOK"
          className="landing-logo h-16 w-auto sm:h-20 md:h-24"
        />

        <p className="landing-fade landing-delay-1 mt-10 max-w-md font-display text-2xl leading-snug tracking-tight text-cream/90 sm:text-3xl md:text-[2.15rem]">
          A operação da cozinha, em um só lugar.
        </p>

        <p className="landing-fade landing-delay-2 mt-4 max-w-sm text-sm leading-relaxed text-cream/45 sm:text-base">
          Pedidos, produção, estoque e equipe — acesso exclusivo para colaboradores.
        </p>

        <div className="landing-fade landing-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-lg bg-caramel px-8 py-3.5 text-sm font-medium text-dark shadow-lg shadow-caramel/25 transition duration-300 hover:bg-caramel/90 hover:shadow-caramel/40 active:scale-[0.98]"
          >
            Entrar no sistema
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </main>

      <footer className="landing-fade landing-delay-4 relative z-10 pb-8 text-center text-xs text-cream/25">
        HOLY COOK · Uso interno
      </footer>
    </div>
  )
}
