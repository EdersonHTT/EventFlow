import { useState } from "react";
import Stat from "../components/Stat";
import { useEffect } from "react";
import { api } from "../services/api";

function Reception() {
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/tickets").then(setTickets).catch((requestError) => setError(requestError.message));
    }, []);

    async function validate() {
        
        if (!code.trim()) return;
        if (error) {
            setResult({ type: "error", title: "Não foi possível consultar", text: error });
            return;
        }
        
        const ticket = tickets.find(item => item.qrCode?.toLowerCase() === code.trim().toLowerCase());
        
        if (!ticket) {
            setResult({ type: "error", title: "Ingresso não encontrado", text: "Confira o código informado." });
        } else if (ticket.status === "checked") {
            setResult({ type: "warning", title: "Ingresso já verificado", text: `Este ingresso pertence a ${ticket.buyerName}.` });
        } else {
            try {
                const checkedTicket = await api.patch(`/tickets/${ticket.id}/check`);
                setTickets((currentTickets) => currentTickets.map((currentTicket) => currentTicket.id === checkedTicket.id ? checkedTicket : currentTicket));
                setResult({ type: "success", title: "Ingresso verificado", text: `Ingresso de ${ticket.buyerName} validado com sucesso.` });
            } catch (requestError) {
                setResult({ type: "error", title: "Não foi possível verificar", text: requestError.message });
            }
        }
    }

    const resultStyle = {
        success: "border-green-200 bg-green-50 text-green-800",
        warning: "border-amber-200 bg-amber-50 text-amber-800",
        error: "border-red-200 bg-red-50 text-red-800",
    };

    return (
        <div className="max-w-[900px] p-8 max-sm:p-4">
        <div className="mb-6">
            <h1 className="mb-1.5 text-[25px] font-bold">Validar ingresso</h1>
            <p className="text-[13px] text-slate-500">
            Digite o código do ingresso para liberar a entrada.
            </p>
        </div>

        <section className="mb-5 max-w-[760px] rounded-md border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-[17px] font-semibold">Verificação</h2>

            <label className="mb-1.5 mt-4 block text-xs font-bold">
            Código do ingresso
            </label>

            <div className="flex gap-2 max-sm:flex-col">
            <input
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-[#4f6fd8]"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Ex: AUR-2048-991"
            />
            <button
                className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white hover:bg-[#405fbf]"
                onClick={validate}
            >
                Validar
            </button>
            </div>

            <p className="text-xs text-slate-500">Consulta realizada nos ingressos cadastrados na API.</p>

            {result && (
            <div className={`mt-5 rounded-md border p-3.5 ${resultStyle[result.type]}`}>
                <strong className="block">{result.title}</strong>
                <span className="mt-1 block text-xs">{result.text}</span>
            </div>
            )}
        </section>

        <div className="grid grid-cols-3 gap-3.5 max-sm:grid-cols-1">
            <Stat label="Ingressos cadastrados" value={tickets.length.toLocaleString("pt-BR")} />
            <Stat label="Verificados" value={tickets.filter((ticket) => ticket.status === "checked").length.toLocaleString("pt-BR")} />
            <Stat label="Pendentes" value={tickets.filter((ticket) => ticket.status === "pending").length.toLocaleString("pt-BR")} />
        </div>
        </div>
    );
}

export default Reception;