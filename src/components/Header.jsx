import React from 'react';
import { Calendar, Filter, Music } from 'lucide-react';

const PERIODOS = [
  { value: 7, label: '7 dias' },
  { value: 30, label: '30 dias' },
  { value: 90, label: '90 dias' },
];

const NOITES_FILTRO = [
  { value: 'todas', label: 'Todas as Noites' },
  { value: 'flow', label: 'Flow Like SP (Qui)' },
  { value: 'anos2000', label: 'Anos 2000 (Sex)' },
  { value: 'salseiro', label: 'Salseiro (Sex)' },
  { value: 'ritmos', label: 'Ritmos (Sáb)' },
];

export default function Header({ filters, setFilters, activeModule, setActiveModule }) {
  const MODULES = [
    { id: 'performance', label: 'Performance' },
    { id: 'publico', label: 'Público' },
    { id: 'crm', label: 'CRM & VIP' },
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'birthdays', label: 'Aniversários' },
    { id: 'university', label: 'Universitário' },
  ];

  const handleDateChange = (field, value) => {
    setFilters((f) => ({
      ...f,
      periodo: null,
      [field]: value,
    }));
  };

  const handlePeriodoClick = (value) => {
    setFilters((f) => ({
      ...f,
      periodo: value,
      dataInicio: '',
      dataFim: '',
    }));
  };

  return (
    <header className="border-b border-[#D4A843]/20 bg-[#0a0a0a]/95 sticky top-0 z-50 backdrop-blur-sm">
      {/* Top bar */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-widest">
                AMATA <span className="text-[#D4A843] font-normal text-base tracking-tight ml-2">Business Intelligence</span>
              </h1>
              <p className="text-[#888] text-xs">Rua Cunha Gago, 838 — Pinheiros, São Paulo</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2 border border-white/10">
              <Calendar size={14} className="text-[#D4A843]" />
              {PERIODOS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePeriodoClick(p.value)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    filters.periodo === p.value
                      ? 'bg-[#D4A843] text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Date range picker */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2 border border-white/10">
              <span className="text-white/40 text-xs">De</span>
              <input
                type="date"
                value={filters.dataInicio || ''}
                onChange={(e) => handleDateChange('dataInicio', e.target.value)}
                className="bg-transparent text-white/80 text-xs outline-none cursor-pointer [color-scheme:dark]"
              />
              <span className="text-white/40 text-xs">Até</span>
              <input
                type="date"
                value={filters.dataFim || ''}
                onChange={(e) => handleDateChange('dataFim', e.target.value)}
                className="bg-transparent text-white/80 text-xs outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2 border border-white/10">
              <Music size={14} className="text-[#D4A843]" />
              <select
                value={filters.noite}
                onChange={(e) => setFilters((f) => ({ ...f, noite: e.target.value }))}
                className="bg-transparent text-white/80 text-xs outline-none cursor-pointer"
              >
                {NOITES_FILTRO.map((n) => (
                  <option key={n.value} value={n.value} className="bg-[#1a1a1a]">
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Module tabs */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`px-5 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeModule === m.id
                  ? 'bg-[#1a1a1a] text-[#D4A843] border-t-2 border-x border-[#D4A843]/30 border-t-[#D4A843]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
