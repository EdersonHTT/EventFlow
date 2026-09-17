import { useEffect, useState } from "react";
import { api } from "../services/api";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/tickets").then(setParticipants).catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div className="max-w-[1250px] p-8 max-sm:p-4">
      <div className="mb-6">
        <h1 className="mb-1.5 text-[25px] font-bold">Participantes</h1>
        <p className="text-[13px] text-slate-500">
          Pessoas cadastradas através dos ingressos.
        </p>
      </div>

      <section className="overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
        <table className="w-full min-w-[600px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Evento</th>
              <th>Check-in</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <strong>{ticket.buyerName || "-"}</strong>
                </td>
                <td>{ticket.buyerEmail || "-"}</td>
                <td>{ticket.event?.name || "-"}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
            {!participants.length && <tr><td colSpan="4" className="p-4 text-center text-slate-500">{error || "Nenhum participante encontrado."}</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Participants;