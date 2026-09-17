function Stat({ label, value }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <span className="mb-2 block text-xs text-slate-500">{label}</span>
      <strong className="text-2xl">{value}</strong>
    </div>
  );
}

export default Stat;