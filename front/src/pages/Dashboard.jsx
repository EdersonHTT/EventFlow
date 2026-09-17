import { useEffect, useState } from "react";
import Stat from "../components/Stat";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [usersError, setUsersError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();
  const isAdmin = Number(localStorage.getItem("role")) === 1;

  useEffect(() => {
    const loadEvents = () => {
      api.get("/events")
        .then((loadedEvents) => {
          setEvents(loadedEvents);
          setError("");
        })
        .catch((requestError) => setError(requestError.message));
    };

    const loadUsers = () => {
      if (!isAdmin) return;

      api.get("/users")
        .then((loadedUsers) => {
          setUsers(loadedUsers);
          setUsersError("");
        })
        .catch((requestError) => setUsersError(requestError.message));
    };

    loadEvents();
    loadUsers();
    const refreshInterval = window.setInterval(loadEvents, 5000);
    const usersRefreshInterval = isAdmin ? window.setInterval(loadUsers, 5000) : null;

    return () => {
      window.clearInterval(refreshInterval);
      if (usersRefreshInterval) window.clearInterval(usersRefreshInterval);
    };
  }, [isAdmin]);

  const selectedEvent = events.find((event) => String(event.id) === selectedId) || events[0];
  const sold = selectedEvent?.tickets?.length || 0;
  const checked = selectedEvent?.tickets?.filter((ticket) => ticket.status === "checked").length || 0;
  const pending = selectedEvent?.tickets?.filter((ticket) => ticket.status === "pending").length || 0;
  const highlight = selectedEvent;
  
  return (
    <div className="max-w-[1250px] p-8 max-sm:p-4">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="mb-1.5 text-[25px] font-bold">Visão geral</h1>
          <p className="text-[13px] text-slate-500">
            Acompanhe os números dos seus eventos.
          </p>
        </div>

        <div className="flex gap-2 max-sm:w-full">
          {events.length > 0 && <select className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" value={selectedId || events[0]?.id || ""} onChange={(event) => setSelectedId(event.target.value)}>
            {events.map((event) => <option key={event.id} value={event.id}>{event.name}</option>)}
          </select>}
          {!isAdmin && <button className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white hover:bg-[#405fbf]" onClick={() => navigate("/events/new")}>Cadastrar evento</button>}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-3.5 max-md:grid-cols-2 max-sm:grid-cols-1">
        <Stat label="Ingressos vendidos" value={sold.toLocaleString("pt-BR")} />
        <Stat label="Ingressos validados" value={checked.toLocaleString("pt-BR")} />
        <Stat label="Ingressos pendentes" value={pending.toLocaleString("pt-BR")} />
        <Stat label="Evento selecionado" value={selectedEvent?.name || "Nenhum"} />
      </div>

      {isAdmin && (
        <div className="mb-5 flex gap-2 border-b border-slate-200">
          <button
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold ${activeTab === "events" ? "border-[#4f6fd8] text-[#3159bd]" : "border-transparent text-slate-500"}`}
            onClick={() => setActiveTab("events")}
            type="button"
          >
            Eventos
          </button>
          <button
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold ${activeTab === "users" ? "border-[#4f6fd8] text-[#3159bd]" : "border-transparent text-slate-500"}`}
            onClick={() => setActiveTab("users")}
            type="button"
          >
            Usuários
          </button>
        </div>
      )}

      {activeTab === "users" && isAdmin ? (
        <section className="mb-5 overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold">Usuários cadastrados</h2>
            <span className="text-[11px] text-slate-400">Atualizado automaticamente</span>
          </div>

          <table className="w-full min-w-[560px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.Cpf}</td>
                  <td>{user.roles === 1 ? "Administrador" : "Usuário"}</td>
                </tr>
              ))}
              {!users.length && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-500">
                    {usersError || "Nenhum usuário encontrado."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      ) : (
        <>
          <section className="mb-5 overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold">Resumo do evento selecionado</h2>
              <span className="text-[11px] text-slate-400">Atualizado hoje</span>
            </div>

            <table className="w-full min-w-[600px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Data</th>
                  <th>Ingressos</th>
                  <th>Participantes</th>
                  <th>Local</th>
                </tr>
              </thead>

              <tbody>
                {selectedEvent ? (
                  <tr key={selectedEvent.id}>
                    <td>
                      <strong>{selectedEvent.name}</strong>
                    </td>
                    <td>{new Date(selectedEvent.date).toLocaleDateString("pt-BR")}</td>
                    <td>{selectedEvent.tickets?.length || 0}</td>
                    <td>{selectedEvent.tickets?.filter((ticket) => ticket.status === "checked").length || 0}</td>
                    <td>{selectedEvent.location?.name || "-"}</td>
                  </tr>
                ) : <tr><td colSpan="5" className="p-4 text-center text-slate-500">{error || (isAdmin ? "Nenhum evento encontrado." : "Você ainda não tem eventos cadastrados.")} {!isAdmin && <><br /><button className="mt-3 rounded-md bg-[#4f6fd8] px-4 py-2 text-white" onClick={() => navigate("/events/new")}>Cadastrar evento</button></>}</td></tr>}
              </tbody>
            </table>
          </section>

          <div className="mb-5">
            <section className="rounded-md border border-slate-200 bg-white p-5">
              <h2 className="mb-4 text-[17px] font-semibold">Evento em destaque</h2>
              <h3 className="mb-1.5 font-semibold">{highlight?.name || "Nenhum evento"}</h3>
              <p className="my-1 text-[13px] text-slate-500">{highlight ? `${new Date(highlight.date).toLocaleDateString("pt-BR")} · ${highlight.time}` : "-"}</p>
              <p className="my-1 text-[13px] text-slate-500">
                <strong>{highlight?.tickets?.length || 0}</strong> ingressos vendidos.
              </p>

              <div className="my-4 h-3 overflow-hidden rounded-sm bg-slate-200">
                <span className="block h-full bg-[#4f6fd8]" style={{ width: `${highlight ? Math.min(100, (highlight.tickets?.filter((ticket) => ticket.status === "checked").length || 0) / Math.max(1, highlight.tickets?.length || 1) * 100) : 0}%` }} />
              </div>

              <small className="text-xs text-slate-500">
                {highlight ? `${Math.round((highlight.tickets?.filter((ticket) => ticket.status === "checked").length || 0) / Math.max(1, highlight.tickets?.length || 1) * 100)}% dos ingressos foram verificados.` : "-"}
              </small>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;