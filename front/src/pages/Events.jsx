import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const emptyForm = { name: "", description: "", date: "", time: "", ticketPrice: "", categoryId: 1, locationId: "" };

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function loadEvents() {
    return api.get("/events").then(setEvents).catch((requestError) => setError(requestError.message));
  }

  useEffect(() => {
    loadEvents();
    api.get("/locations").then(setLocations).catch((requestError) => setError(requestError.message));
  }, []);

  function startEditing(event) {
    setError("");
    setEditing(event);
    setForm({
      name: event.name || "",
      description: event.description || "",
      date: event.date ? String(event.date).slice(0, 10) : "",
      time: event.time || "",
      ticketPrice: event.ticketPrice || "",
      categoryId: 1,
      locationId: event.location?.id || ""
    });
  }

  function closeModals() {
    setEditing(null);
    setDeleting(null);
    setError("");
  }

  async function updateEvent(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.put(`/events/update/${editing.id}`, {
        ...form,
        ticketPrice: Number(form.ticketPrice),
        categoryId: Number(form.categoryId),
        locationId: Number(form.locationId)
      });
      await loadEvents();
      closeModals();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent() {
    setSaving(true);
    setError("");
    try {
      await api.delete(`/events/delete/${deleting.id}`);
      await loadEvents();
      closeModals();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="max-w-[1250px] p-8 max-sm:p-4">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="mb-1.5 text-[25px] font-bold">Eventos</h1>
          <p className="text-[13px] text-slate-500">Consulte e gerencie os eventos cadastrados.</p>
        </div>
        {Number(localStorage.getItem("role")) === 2 && (
          <button className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white hover:bg-[#405fbf]" onClick={() => navigate("/events/new")}>
            Cadastrar evento
          </button>
        )}
      </div>

      <section className="overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
        <table className="w-full min-w-[950px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th>Local</th>
              <th>Preço</th>
              <th>Ingressos vendidos</th>
              <th>Ingressos verificados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td><strong>{event.name}</strong></td>
                <td>{new Date(event.date).toLocaleDateString("pt-BR")} · {event.time}</td>
                <td>{event.location?.name || "-"}</td>
                <td>{Number(event.ticketPrice).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>{event.tickets?.length || 0}</td>
                <td>{event.tickets?.filter((ticket) => ticket.status === "checked").length || 0}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="rounded border border-[#4f6fd8] px-3 py-1.5 text-[#3159bd] hover:bg-[#edf1fb]" onClick={() => startEditing(event)}>Editar</button>
                    <button className="rounded border border-red-200 px-3 py-1.5 text-red-700 hover:bg-red-50" onClick={() => setDeleting(event)}>Deletar</button>
                  </div>
                </td>
              </tr>
            ))}
            {!events.length && <tr><td colSpan="7" className="p-4 text-center text-slate-500">{error || "Nenhum evento encontrado."}</td></tr>}
          </tbody>
        </table>
      </section>

      {editing && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true">
          <form onSubmit={updateEvent} className="max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold">Editar evento</h2><button type="button" className="text-xl text-slate-500" onClick={closeModals} aria-label="Fechar">×</button></div>
            <div className="grid gap-4">
              <label className="text-xs font-bold">Nome<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.name} onChange={(event) => updateForm("name", event.target.value)} required /></label>
              <label className="text-xs font-bold">Descrição<textarea className="mt-1.5 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.description} onChange={(event) => updateForm("description", event.target.value)} required /></label>
              <label className="text-xs font-bold">Preço do ingresso<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="number" min="0.01" step="0.01" value={form.ticketPrice} onChange={(event) => updateForm("ticketPrice", event.target.value)} required /></label>
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1"><label className="text-xs font-bold">Data<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="date" value={form.date} onChange={(event) => updateForm("date", event.target.value)} required /></label><label className="text-xs font-bold">Horário<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="time" value={form.time} onChange={(event) => updateForm("time", event.target.value)} required /></label></div>
              <label className="text-xs font-bold">Local<select className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.locationId} onChange={(event) => updateForm("locationId", event.target.value)} required><option value="">Selecione um local</option>{locations.map((location) => <option key={location.id} value={location.id}>{location.name} · {location.address}</option>)}</select></label>
            </div>
            {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
            <div className="mt-6 flex justify-end gap-2"><button type="button" className="rounded-md border border-slate-300 px-4 py-2.5" onClick={closeModals}>Cancelar</button><button className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button></div>
          </form>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[420px] rounded-lg bg-white p-6 shadow-xl"><h2 className="text-lg font-semibold">Deletar evento?</h2><p className="mt-3 text-sm text-slate-600">Tem certeza que deseja deletar <strong>{deleting.name}</strong>? Essa ação não poderá ser desfeita.</p>{error && <p className="mt-3 text-xs text-red-600">{error}</p>}<div className="mt-6 flex justify-end gap-2"><button className="rounded-md border border-slate-300 px-4 py-2.5" onClick={closeModals}>Cancelar</button><button className="rounded-md bg-red-600 px-4 py-2.5 text-white" onClick={deleteEvent} disabled={saving}>{saving ? "Deletando..." : "Deletar"}</button></div></div>
        </div>
      )}
    </div>
  );
}

export default Events;
