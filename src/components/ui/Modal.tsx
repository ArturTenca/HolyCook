import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}

export function Modal({ open, title, description, onClose, children, wide = false }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={[
          'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-xl border border-dark-border bg-dark-surface p-6 shadow-2xl',
          wide ? 'max-w-3xl' : 'max-w-lg',
        ].join(' ')}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-cream">
              {title}
            </h2>
            {description && <p className="mt-1 text-sm text-cream/45">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-cream/40 hover:bg-white/5 hover:text-cream"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
