export const events = [
  { id: 1, name: "Festival Aurora", date: "25/08/2026", sold: 1250, checked: 842, capacity: 2000 },
  { id: 2, name: "Feira de Tecnologia", date: "29/08/2026", sold: 860, checked: 510, capacity: 1200 },
  { id: 3, name: "Workshop de Design", date: "05/09/2026", sold: 320, checked: 0, capacity: 500 },
];

export const tickets = [
  { code: "AUR-2048-991", name: "João da Silva", event: "Festival Aurora", type: "Pista", status: "Válido" },
  { code: "AUR-2048-992", name: "Maria Oliveira", event: "Festival Aurora", type: "VIP", status: "Utilizado" },
  { code: "TEC-3011-220", name: "Lucas Souza", event: "Feira de Tecnologia", type: "Inteira", status: "Válido" },
];

export const participants = [
  ["João da Silva", "joao@email.com", "Festival Aurora", "Sim"],
  ["Maria Oliveira", "maria@email.com", "Festival Aurora", "Sim"],
  ["Lucas Souza", "lucas@email.com", "Feira de Tecnologia", "Não"],
  ["Ana Costa", "ana@email.com", "Festival Aurora", "Sim"],
];