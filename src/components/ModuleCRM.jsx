import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { ArrowUpDown, Star, Gift, AlertTriangle, TrendingUp, Users, Repeat } from 'lucide-react';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.fill || p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

function SortableTable({ data, columns }) {
  const [sortKey, setSortKey] = useState(columns[1]?.key || 'gasto');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number') return sortDir === 'desc' ? vb - va : va - vb;
      return sortDir === 'desc' ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-3 text-white/50 font-medium w-8">#</th>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-3 px-3 text-white/50 font-medium cursor-pointer hover:text-[#D4A843] transition-colors ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                onClick={() => toggleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  <ArrowUpDown size={12} className={sortKey === col.key ? 'text-[#D4A843]' : 'opacity-30'} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-3 px-3 text-white/30 text-xs">{i + 1}</td>
              {columns.map((col) => (
                <td key={col.key} className={`py-3 px-3 ${col.align === 'right' ? 'text-right' : ''} ${col.className || 'text-white/80'}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ModuleCRM({ data }) {
  const { top20, segmentacao, aniversariantesSemana, aniversariantesMes, crossSell, crm } = data;

  const [showBirthdayTab, setShowBirthdayTab] = useState('semana');

  const topColumns = [
    { key: 'nome', label: 'Cliente', align: 'left', className: 'text-white font-medium' },
    { key: 'gasto', label: 'Total Gasto', align: 'right', render: (v) => formatBRL(v) },
    { key: 'visitas', label: 'Visitas', align: 'right' },
    { key: 'ticketMedio', label: 'Ticket Médio', align: 'right', render: (v) => formatBRL(v) },
    { key: 'noiteFavorita', label: 'Noite Favorita', align: 'left', render: (v) => (
      <span className="bg-white/10 px-2 py-1 rounded text-xs">{v}</span>
    )},
    { key: 'ultimaVisita', label: 'Última Visita', align: 'right', render: (v) => {
      if (!v || v === '-') return '-';
      const d = new Date(v + 'T12:00:00');
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }},
  ];

  const anivColumns = [
    { key: 'nome', label: 'Cliente', align: 'left', className: 'text-white font-medium' },
    { key: 'data_nascimento', label: 'Aniversário', align: 'right', render: (v) => {
      const parts = v.split('-');
      return `${parts[2]}/${parts[1]}`;
    }},
    { key: 'visitas', label: 'Visitas', align: 'right' },
    { key: 'gasto', label: 'Gasto Total', align: 'right', render: (v) => formatBRL(v) },
    { key: 'noiteFavorita', label: 'Noite Favorita', align: 'left', render: (v) => (
      <span className="bg-white/10 px-2 py-1 rounded text-xs">{v}</span>
    )},
  ];

  const anivList = showBirthdayTab === 'semana' ? aniversariantesSemana : aniversariantesMes;

  // Segmentation pie
  const segPieData = segmentacao.map((s) => ({ name: s.nome, value: s.count, fill: s.cor }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CRM KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-[#D4A843]" />
            <span className="text-white/50 text-xs uppercase">Únicos 30d</span>
          </div>
          <div className="text-2xl font-bold text-white">{crm.clientesUnicos30d?.toLocaleString('pt-BR')}</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Repeat size={16} className="text-[#D4A843]" />
            <span className="text-white/50 text-xs uppercase">Taxa Retorno 30d</span>
          </div>
          <div className="text-2xl font-bold text-white">{crm.taxaRetorno}%</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-[#D4A843]" />
            <span className="text-white/50 text-xs uppercase">Freq. Média Visitas</span>
          </div>
          <div className="text-2xl font-bold text-white">{crm.freqMediaRetorno}x</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#D4A843]/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-[#F59E0B]" />
            <span className="text-white/50 text-xs uppercase">Cross-sell Oportunidade</span>
          </div>
          <div className="text-lg font-bold text-[#D4A843]">{crossSell.pct}% do Sábado</div>
          <p className="text-white/40 text-xs mt-1">
            {crossSell.total.toLocaleString('pt-BR')} de {crossSell.totalSabado.toLocaleString('pt-BR')} clientes do Sábado nunca vieram na Quinta
          </p>
        </div>
      </div>

      {/* Top 20 clients */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-[#D4A843]" />
          <h3 className="text-sm font-semibold text-white/70">Top 20 Clientes por Gasto Acumulado</h3>
        </div>
        <SortableTable data={top20} columns={topColumns} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segmentation */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Segmentação da Base</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {segmentacao.map((s) => (
              <div key={s.nome} className="bg-[#0a0a0a] rounded-lg p-4 border-l-4" style={{ borderLeftColor: s.cor }}>
                <div className="text-xs text-white/50 mb-1">{s.nome}</div>
                <div className="text-xl font-bold text-white">{s.count.toLocaleString('pt-BR')}</div>
                <div className="text-xs text-white/40 mt-1">
                  Gasto médio: {formatBRL(s.gastoMedio)} · Freq: {s.freqMedia.toFixed(1)}x
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={segPieData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                   label={({ name, percent }) => `${name.split('(')[0].trim()} ${(percent * 100).toFixed(0)}%`}
                   labelLine={false}>
                {segPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Birthdays */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gift size={16} className="text-[#D4A843]" />
              <h3 className="text-sm font-semibold text-white/70">Aniversariantes</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBirthdayTab('semana')}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  showBirthdayTab === 'semana' ? 'bg-[#D4A843] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                Esta Semana ({aniversariantesSemana.length})
              </button>
              <button
                onClick={() => setShowBirthdayTab('mes')}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  showBirthdayTab === 'mes' ? 'bg-[#D4A843] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                Este Mês ({aniversariantesMes.length})
              </button>
            </div>
          </div>
          {anivList.length > 0 ? (
            <SortableTable data={anivList} columns={anivColumns} />
          ) : (
            <p className="text-white/30 text-sm text-center py-8">Nenhum aniversariante encontrado no período.</p>
          )}
        </div>
      </div>
    </div>
  );
}
