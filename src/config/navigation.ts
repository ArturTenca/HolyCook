import {
  BadgePercent,
  Boxes,
  ChartNoAxesCombined,
  ChefHat,
  CircleDollarSign,
  ClipboardList,
  Cookie,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShoppingBasket,
  SquareKanban,
  Truck,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  label: string
  path: string
  icon: LucideIcon
  group: 'Operação' | 'Gestão' | 'Sistema'
}

export const navigationItems: NavigationItem[] = [
  { label: 'Visão geral', path: '/painel', icon: LayoutDashboard, group: 'Operação' },
  { label: 'Pedidos', path: '/pedidos', icon: ClipboardList, group: 'Operação' },
  { label: 'Produção', path: '/producao', icon: ChefHat, group: 'Operação' },
  { label: 'Entregas', path: '/entregas', icon: Truck, group: 'Operação' },
  { label: 'Produtos', path: '/produtos', icon: Cookie, group: 'Gestão' },
  { label: 'Receitas', path: '/receitas', icon: PackageSearch, group: 'Gestão' },
  { label: 'Estoque', path: '/estoque', icon: Boxes, group: 'Gestão' },
  { label: 'Lista de compras', path: '/compras', icon: ShoppingBasket, group: 'Gestão' },
  { label: 'Clientes', path: '/clientes', icon: Users, group: 'Gestão' },
  { label: 'Financeiro', path: '/financeiro', icon: CircleDollarSign, group: 'Gestão' },
  { label: 'Promoções', path: '/promocoes', icon: BadgePercent, group: 'Gestão' },
  { label: 'Funcionários', path: '/funcionarios', icon: UsersRound, group: 'Sistema' },
  { label: 'Relatórios', path: '/relatorios', icon: ChartNoAxesCombined, group: 'Sistema' },
  { label: 'Tarefas', path: '/tarefas', icon: SquareKanban, group: 'Sistema' },
  { label: 'Configurações', path: '/configuracoes', icon: Settings, group: 'Sistema' },
]

export const navigationGroups = ['Operação', 'Gestão', 'Sistema'] as const
