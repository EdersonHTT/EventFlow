import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function PublicEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/events/public").then(setEvents).catch(
      (requestError) => setError(requestError.message)
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6 sm:p-10">
      <header className="mx-auto mb-10 flex max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-bold">
          Event<span className="text-[#4f6fd8]">Flow</span>
        </h1>
        <Link
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm"
          to="/login"
        >
          Área administrativa
        </Link>
      </header>

      <main className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-3xl font-bold">Eventos disponíveis</h2>
        <p className="mb-7 text-slate-500">
          Escolha um evento e garanta seu ingresso.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-[#4f6fd8]"
              to={`/public/events/${event.id}`}
              key={event.id}
            >
              <p className="mb-2 text-xs font-semibold uppercase text-[#4f6fd8]">
                {new Date(event.date).toLocaleDateString("pt-BR")} · {event.time}
              </p>
              <h3 className="mb-2 text-xl font-semibold">{event.name}</h3>
              <p className="mb-4 text-sm text-slate-600">{event.description}</p>
              <span className="text-sm font-semibold text-[#3159bd]">
                Comprar ingresso →
              </span>
            </Link>
          ))}
        </div>

        {!events.length && (
          <p className="mt-8 text-slate-500">
            {error || "Nenhum evento criado ainda."}
          </p>
        )}
      </main>
    </div>
  );
}

export default PublicEvents;
