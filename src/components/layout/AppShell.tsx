import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, Menu, ShieldCheck, X } from 'lucide-react'
import { navigationGroups, navigationItems } from '@/config/navigation'
import { GlobalSearch } from '@/components/layout/GlobalSearch'
import { NotificationsMenu } from '@/components/layout/NotificationsMenu'
import { useAuth } from '@/hooks/useAuth'

const roleLabels = {
  administrador: 'Administrador',
  gerente: 'Gerente',
  atendente: 'Atendente',
  confeiteiro: 'Confeiteiro',
  entregador: 'Entregador',
} as const

export function AppShell() {
  const { profile, user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const displayName = profile?.full_name ?? user?.user_metadata.full_name ?? 'Usuário'
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((part: string) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-dark text-cream">
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-dark-border bg-[#111] transition-transform duration-200',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex h-20 items-center justify-between border-b border-dark-border px-6">
          <NavLink to="/painel" onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.png" alt="HOLY COOK" className="h-9 w-auto" />
          </NavLink>
          <button
            type="button"
            aria-label="Fechar menu"
            className="rounded-lg p-2 text-cream/60 hover:bg-white/5 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Navegação principal">
          {navigationGroups.map((group) => (
            <div key={group} className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/30">
                {group}
              </p>
              <div className="space-y-1">
                {navigationItems
                  .filter((item) => item.group === group)
                  .map(({ label, path, icon: Icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      end={path === '/painel'}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                          isActive
                            ? 'bg-caramel/12 text-caramel'
                            : 'text-cream/55 hover:bg-white/[0.04] hover:text-cream',
                        ].join(' ')
                      }
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      {label}
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-dark-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-caramel/15 text-xs font-semibold text-caramel">
              {initials || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-cream/35">
                {profile ? roleLabels[profile.role] : user?.email}
              </p>
            </div>
            <button
              type="button"
              aria-label="Sair"
              title="Sair"
              onClick={() => void signOut()}
              className="rounded-lg p-2 text-cream/40 transition-colors hover:bg-white/5 hover:text-error"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-dark-border bg-dark/85 px-4 backdrop-blur-xl sm:gap-4 sm:px-8">
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-lg p-2 text-cream/70 hover:bg-white/5 lg:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={21} />
          </button>

          <GlobalSearch className="max-w-md" />

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3 py-1.5 text-xs text-success sm:flex">
              <ShieldCheck size={14} />
              Sessão protegida
            </div>
            <NotificationsMenu />
          </div>
        </header>

        <main className="px-4 py-7 sm:px-8 sm:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
