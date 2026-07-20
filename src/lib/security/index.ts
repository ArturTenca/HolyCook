/**
 * Sanitiza entrada de texto removendo caracteres de controle e limitando tamanho.
 * Nunca confie apenas nisso — validação com Zod e RLS no Supabase são obrigatórios.
 */
export function sanitizeText(input: string, maxLength = 255): string {
  return input
    .replace(/\p{Cc}/gu, '')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeEmail(email: string): string {
  return sanitizeText(email.toLowerCase(), 254)
}

/**
 * Mapeia erros do Supabase Auth para mensagens seguras (sem vazar detalhes internos).
 */
export function mapAuthError(error: { message?: string; status?: number }): string {
  const message = error.message?.toLowerCase() ?? ''

  if (message.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.'
  }

  if (message.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.'
  }

  if (message.includes('user already registered')) {
    return 'Este e-mail já está cadastrado.'
  }

  if (message.includes('password')) {
    return 'A senha não atende aos requisitos de segurança.'
  }

  if (message.includes('rate limit') || error.status === 429) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  }

  if (message.includes('network') || message.includes('fetch')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.'
  }

  return 'Ocorreu um erro. Tente novamente mais tarde.'
}

/**
 * Rate limit simples no cliente para reduzir tentativas de força bruta.
 * Complementar ao rate limiting do Supabase Auth.
 */
const attemptStore = new Map<string, { count: number; resetAt: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now()
  const entry = attemptStore.get(key)

  if (!entry || now > entry.resetAt) {
    attemptStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  entry.count += 1
  return { allowed: true }
}

export function resetRateLimit(key: string): void {
  attemptStore.delete(key)
}

export function formatRetryAfter(ms: number): string {
  const minutes = Math.ceil(ms / 60_000)
  return `${minutes} minuto${minutes > 1 ? 's' : ''}`
}

/** Escapa curingas de ILIKE para evitar injeção de padrões na busca. */
export function escapeIlike(term: string): string {
  return sanitizeText(term, 80)
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
}

export function mapDbError(error: { message?: string; code?: string }): string {
  const message = error.message?.toLowerCase() ?? ''
  const code = error.code ?? ''

  if (code === '42501' || message.includes('operation_not_permitted')) {
    return 'Você não tem permissão para esta ação.'
  }
  if (message.includes('invalid_coupon')) {
    return 'Cupom inválido, expirado ou esgotado.'
  }
  if (message.includes('invalid_order_status') || message.includes('invalid_production_status')) {
    return 'Status inválido para esta operação.'
  }
  if (message.includes('duplicate') || code === '23505') {
    return 'Já existe um registro com esses dados.'
  }
  if (message.includes('foreign key') || code === '23503') {
    return 'Não é possível concluir: há registros relacionados.'
  }
  if (message.includes('check') || code === '23514') {
    return 'Dados inválidos. Verifique os campos e tente novamente.'
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.'
  }

  return 'Não foi possível concluir a operação. Tente novamente.'
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
