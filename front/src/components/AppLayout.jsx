import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const titles = {
  dashboard: "Dashboard",
  events: "Eventos",
  participants: "Participantes",
  tickets: "Ingressos",
  reception: "Validar ingresso",
  history: "Histórico de validações",
  "users": "Usuários",
};

function AppLayout() {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const role = Number(localStorage.getItem("role")) === 1 ? "admin" : "user";

  const logout = (() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={logout} />

      <main className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 max-sm:px-4">
          <div>
            <strong className="block text-[17px]">
              {titles[page] || "EventFlow"}
            </strong>
            <span className="text-[11px] text-slate-500">EventFlow</span>
          </div>

          <div className="text-xs text-slate-600 max-sm:hidden">
            ● {role === "admin" ? "Administrador" : "Organizador"}
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;