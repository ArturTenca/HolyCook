import { Navigate, Route, Routes } from 'react-router-dom'
import { GuestRoute, ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { StockPage } from '@/pages/StockPage'
import { RecipesPage } from '@/pages/RecipesPage'
import { ClientsPage } from '@/pages/ClientsPage'
import { CouponsPage } from '@/pages/CouponsPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { ProductionPage } from '@/pages/ProductionPage'
import { DeliveriesPage } from '@/pages/DeliveriesPage'
import { ShoppingPage } from '@/pages/ShoppingPage'
import { FinancePage } from '@/pages/FinancePage'
import { EmployeesPage } from '@/pages/EmployeesPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { TasksPage } from '@/pages/TasksPage'
import { SettingsPage } from '@/pages/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/painel" element={<DashboardPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/producao" element={<ProductionPage />} />
          <Route path="/entregas" element={<DeliveriesPage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/receitas" element={<RecipesPage />} />
          <Route path="/estoque" element={<StockPage />} />
          <Route path="/compras" element={<ShoppingPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/financeiro" element={<FinancePage />} />
          <Route path="/promocoes" element={<CouponsPage />} />
          <Route path="/funcionarios" element={<EmployeesPage />} />
          <Route path="/relatorios" element={<ReportsPage />} />
          <Route path="/indicadores" element={<Navigate to="/relatorios" replace />} />
          <Route path="/tarefas" element={<TasksPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
