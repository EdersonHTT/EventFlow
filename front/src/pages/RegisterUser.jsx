import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", cpf: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/users", form);
      setMessage("Usuário cadastrado com sucesso.");
      setForm({ name: "", email: "", cpf: "", password: "" });
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5f7] p-4">
      <form onSubmit={submit} className="w-full max-w-[420px] rounded-lg border border-slate-200 bg-white p-8">
        <h1 className="text-center text-[25px] font-bold">Event<span className="text-[#4f6fd8]">Flow</span></h1>
        <p className="mb-7 text-center text-xs text-slate-500">Cadastro de usuário comum</p>
        <h2 className="mb-5 text-lg font-semibold">Novo usuário</h2>
        {[['name', 'Nome'], ['email', 'E-mail'], ['cpf', 'CPF'], ['password', 'Senha']].map(([field, label]) => (
          <label className="mb-1.5 mt-4 block text-xs font-bold" key={field}>
            {label}
            <input className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#4f6fd8]" type={field === "password" ? "password" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => update(field, event.target.value)} required />
          </label>
        ))}
        <button className="mt-3 w-full rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white hover:bg-[#405fbf]" type="submit">Cadastrar usuário</button>
        <button className="mt-3 w-full rounded-md border border-slate-300 px-4 py-2.5 text-slate-700" type="button" onClick={() => navigate("/dashboard")}>Voltar</button>
        {message && <p className="mt-3 text-center text-xs text-green-700">{message}</p>}
        {error && <p className="mt-3 text-center text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default RegisterUser;
