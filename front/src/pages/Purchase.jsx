import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

function Purchase() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/events/public")
      .then((events) => setEvent(events.find((item) => String(item.id) === id)))
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  async function buy(eventSubmit) {
    eventSubmit.preventDefault();
    setError("");
    try {
      await api.post("/tickets", {
        buyerName: email.split("@")[0],
        buyerEmail: email,
        price: Number(event.ticketPrice),
        qrCode: `EV-${Date.now()}`,
        eventId: Number(id),
        status: "pending",
      });
      setMessage("Compra realizada. O ingresso foi enviado para o e-mail informado.");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (!event) {
    return <div className="p-8 text-center">{error || "Carregando evento..."}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5f7] p-4">
      <main className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-8">
        <Link className="text-sm text-[#3159bd]" to="/public/events">
          ← Voltar aos eventos
        </Link>
        <p className="mt-7 text-xs font-semibold uppercase text-[#4f6fd8]">
          {new Date(event.date).toLocaleDateString("pt-BR")} · {event.time}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{event.name}</h1>
        <p className="mt-3 text-slate-600">{event.description}</p>
        <p className="mt-5 text-2xl font-bold text-slate-900">
          {Number(event.ticketPrice).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <form onSubmit={buy} className="mt-8 border-t border-slate-200 pt-6">
          <label className="text-xs font-bold">
            Seu e-mail
            <input
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5"
              type="email"
              value={email}
              onChange={(eventInput) => setEmail(eventInput.target.value)}
              placeholder="voce@email.com"
              required
            />
          </label>
          <button className="mt-4 w-full rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white">
            Comprar ingresso
          </button>
          
        </form>

        {message && (
          <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
            {message}
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </main>
    </div>
  );
}

export default Purchase;
