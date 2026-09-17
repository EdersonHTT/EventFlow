import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function login() {
    navigate("/dashboard");
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.roles);

      login(res.user.roles);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5f7] p-4">
      <form onSubmit={handleLogin} className="w-full max-w-[360px] rounded-lg border border-slate-200 bg-white p-8">
        <h1 className="text-center text-[25px] font-bold">
          Event<span className="text-[#4f6fd8]">Flow</span>
        </h1>

        <p className="mb-7 text-center text-xs text-slate-500">
          Gerenciador de eventos
        </p>

        <h2 className="mb-5 text-lg font-semibold">Entrar</h2>

        <label className="mb-1.5 mt-4 block text-xs font-bold">E-mail</label>
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#4f6fd8]"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label className="mb-1.5 mt-4 block text-xs font-bold">Senha</label>
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#4f6fd8]"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button
          className="mt-3 w-full rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white hover:bg-[#405fbf]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a className="mt-4 block text-center text-xs text-[#3159bd] hover:underline" href="/public/events">
          Ver eventos disponíveis
        </a>

        {error && <p className="mt-3 text-center text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default Login;