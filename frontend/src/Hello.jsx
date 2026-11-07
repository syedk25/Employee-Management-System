function Hello() {
  const employees = [
    { name: "Alicia Gomez", role: "Project Manager", status: "Active" },
    { name: "Marcus Lee", role: "Frontend Developer", status: "On leave" },
    { name: "Nina Patel", role: "HR Specialist", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
              Employee Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Team overview
            </h1>
          </div>

          <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
            Add employee
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Total employees", "128"],
            ["Present today", "96"],
            ["Open positions", "7"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent employees
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {employees.map((employee) => (
              <div
                key={employee.name}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {employee.name}
                  </p>
                  <p className="text-sm text-slate-500">{employee.role}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    employee.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hello;
