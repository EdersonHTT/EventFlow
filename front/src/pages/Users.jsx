import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", cpf: "" });
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    api
      .get("/users")
      .then(setUsers)
      .catch((requestError) => setError(requestError.message));
  }, []);

  function startEditing(user) {
    setActionError("");
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, cpf: user.Cpf });
  }

  function updateEditForm(field, value) {
    setEditForm((current) => ({ ...current, [field]: value }));
  }

  async function saveUser(userId) {
    setActionError("");

    try {
      const updatedUser = await api.put(`/users/update/${userId}`, editForm);
      setUsers((currentUsers) => currentUsers.map((user) => (
        user.id === userId ? updatedUser : user
      )));
      setEditingId(null);
    } catch (requestError) {
      setActionError(requestError.message);
    }
  }

  async function deleteUser(userId) {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    setActionError("");

    try {
      await api.delete(`/users/delete/${userId}`);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
    } catch (requestError) {
      setActionError(requestError.message);
    }
  }

  return (
    <div className="max-w-[1000px] p-8 max-sm:p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[25px] font-bold">Usuários cadastrados</h1>
          <p className="text-[13px] text-slate-500">
            Dados gerais dos organizadores da plataforma.
          </p>
        </div>
        <Link
          className="rounded-md bg-[#4f6fd8] px-4 py-2.5 text-white"
          to="/users/new"
        >
          Cadastrar usuário
        </Link>
      </div>

      <section className="overflow-x-auto rounded-md border border-slate-200 bg-white p-5">
        <table className="w-full min-w-[560px] border-collapse text-xs [&_td]:border-b [&_td]:border-slate-100 [&_td]:p-3 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-600">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {editingId === user.id ? (
                  <>
                    <td>
                      <input
                        className="w-full rounded border border-slate-300 px-2 py-1.5"
                        value={editForm.name}
                        onChange={(event) => updateEditForm("name", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="w-full rounded border border-slate-300 px-2 py-1.5"
                        type="email"
                        value={editForm.email}
                        onChange={(event) => updateEditForm("email", event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="w-full rounded border border-slate-300 px-2 py-1.5"
                        value={editForm.cpf}
                        onChange={(event) => updateEditForm("cpf", event.target.value)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.Cpf}</td>
                  </>
                )}
                <td>{user.roles === 1 ? "Administrador" : "Usuário"}</td>
                <td className="whitespace-nowrap">
                  {editingId === user.id ? (
                    <>
                      <button
                        className="mr-2 rounded bg-green-600 px-2 py-1.5 text-white hover:bg-green-700"
                        onClick={() => saveUser(user.id)}
                        type="button"
                      >
                        Salvar
                      </button>
                      <button
                        className="rounded border border-slate-300 px-2 py-1.5 text-slate-700"
                        onClick={() => setEditingId(null)}
                        type="button"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="mr-2 rounded bg-[#4f6fd8] px-2 py-1.5 text-white hover:bg-[#405fbf]"
                        onClick={() => startEditing(user)}
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        className="rounded bg-red-600 px-2 py-1.5 text-white hover:bg-red-700"
                        onClick={() => deleteUser(user.id)}
                        type="button"
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500">
                  {error || "Nenhum usuário encontrado."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {actionError && <p className="mt-4 text-sm text-red-600">{actionError}</p>}
      </section>
    </div>
  );
}

export default Users;
