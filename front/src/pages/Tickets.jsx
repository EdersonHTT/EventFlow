import { useEffect, useState } from "react";
import { api } from "../services/api";

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/tickets").then(setTickets).catch((requestError) => setError(requestError.message));
    }, []);

  return (
    <div className="max-w-[1250px] p-8 max-sm:p-4">
        <div className="mb-6">
        <div>
            <h1 className="mb-1.5 text-[25px] font-bold">Ingressos</h1>
            <p className="text-[13px] text-slate-500">Consulte os ingressos vendidos.</p>
            </div>
        </div>
        <section className="overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
                <table className="w-full min-w-[600px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Participante</th>
                            <th>Evento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td><code className="rounded bg-slate-100 px-1.5 py-1">{ticket.qrCode}</code></td>
                                <td>{ticket.buyerName}</td>
                                <td>{ticket.event?.name || "-"}</td>
                                <td>
                                    <span className={ticket.status === "checked" ? "rounded bg-green-100 px-2 py-1 text-[11px] text-green-700" : "rounded bg-orange-100 px-2 py-1 text-[11px] text-orange-700"}>
                                        {ticket.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {!tickets.length && <tr><td colSpan="4" className="p-4 text-center text-slate-500">{error || "Nenhum ingresso encontrado."}</td></tr>}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Tickets;