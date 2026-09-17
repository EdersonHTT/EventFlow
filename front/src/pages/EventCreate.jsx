import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function EventCreate() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", date: "", time: "", ticketPrice: "", categoryId: 1, locationId: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/locations").then(setLocations).catch((requestError) => setError(requestError.message));
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await api.post("/events", { ...form, ticketPrice: Number(form.ticketPrice), categoryId: Number(form.categoryId), locationId: Number(form.locationId) });
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="max-w-[760px] p-8 max-sm:p-4">
      <div className="mb-6"><h1 className="mb-1.5 text-[25px] font-bold">Cadastrar evento</h1><p className="text-[13px] text-slate-500">Crie um evento vinculado ao seu usuário.</p></div>
      <form onSubmit={submit} className="grid gap-4 rounded-md border border-slate-200 bg-white p-6">
        <label className="text-xs font-bold">Nome<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
        <label className="text-xs font-bold">Descrição<textarea className="mt-1.5 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.description} onChange={(event) => update("description", event.target.value)} required /></label>
        <label className="text-xs font-bold">Preço do ingresso<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="number" min="0.01" step="0.01" value={form.ticketPrice} onChange={(event) => update("ticketPrice", event.target.value)} placeholder="0,00" required /></label>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1"><label className="text-xs font-bold">Data<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="date" value={form.date} onChange={(event) => update("date", event.target.value)} required /></label><label className="text-xs font-bold">Horário<input className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" type="time" value={form.time} onChange={(event) => update("time", event.target.value)} required /></label></div>
        <label className="text-xs font-bold">Local<select className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5" value={form.locationId} onChange={(event) => update("locationId", event.target.value)} required><option value="">Selecione um local</option>{locations.map((location) => <option key={location.id} value={location.id}>{location.name} · {location.address}</option>)}</select></label>
        {!locations.length && <p className="text-xs text-amber-700">Nenhum local disponível. Solicite ao administrador o cadastro de um local.</p>}
        <div className="flex gap-2"><button className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white disabled:opacity-50" disabled={!locations.length}>Salvar evento</button><button type="button" className="rounded-md border border-slate-300 px-4 py-2.5" onClick={() => navigate("/dashboard")}>Cancelar</button></div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default EventCreate;
