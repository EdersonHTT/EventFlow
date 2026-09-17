import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ onLogout }) {
    const navigate = useNavigate();
    const role = Number(localStorage.getItem("role")) === 1 ? "admin" : "user";

    const items =
      role === "admin"
        ? [
            ["/dashboard", "Dashboard"],
            ["/events", "Eventos"],
            ["/users", "Usuários"],
            ["/users/new", "Cadastrar usuário"],
          ]
        : [
            ["/dashboard", "Dashboard"],
            ["/events", "Eventos"],
            ["/events/new", "Cadastrar evento"],
            ["/reception", "Validar ingresso"],
            ["/history", "Histórico"],
          ];

    function logout() {
      onLogout();
      navigate("/login");
    }

  return (
    <aside className="flex min-h-screen w-[220px] shrink-0 flex-col border-r border-slate-200 bg-white p-6 max-md:w-[170px] max-sm:w-[100px] max-sm:p-2">
      <h2 className="mb-1 text-[22px] font-bold max-sm:text-base">
        Event<span className="text-[#4f6fd8]">Flow</span>
      </h2>

      <div className="border-b border-slate-100 pb-6 text-xs text-slate-500 max-sm:text-[9px]">
        {role === "admin" ? "Painel administrativo" : "Painel do organizador"}
      </div>

      <nav className="mt-5 grid gap-1">
        {items.map(([path, label]) => (
          <NavLink
            className={({ isActive }) =>
              `rounded-md px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#edf1fb] hover:text-[#3159bd] max-sm:px-1.5 max-sm:text-[10px] ${
                isActive ? "bg-[#edf1fb] text-[#3159bd]" : ""
              }`}
            to={path}
            key={path}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-4">
        <button
          className="w-full rounded-md px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 max-sm:px-1.5 max-sm:text-[10px]"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;