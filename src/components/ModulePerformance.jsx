import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const formatK = (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v;

const CORES_NOITE = {
  'Flow Like SP': '#8B5CF6',
  'Anos 2000': '#EC4899',
  'Salseiro': '#F59E0B',
  'Ritmos': '#10B981',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white/60 text-xs mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 100 ? formatBRL(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function ModulePerformance({ data }) {
  const { porNoite, evolucaoSemanal } = data;

  const barDataPublico = porNoite.map((n) => ({
    name: n.nome,
    'Público Médio': n.publicoMedio,
    fill: n.cor,
  }));

  const barDataReceita = porNoite.map((n) => ({
    name: n.nome,
    'Receita Média': Math.round(n.receitaMedia),
    fill: n.cor,
  }));

  const barDataTicket = porNoite.map((n) => ({
    name: n.nome,
    'Ticket Médio': Math.round(n.ticketMedio),
    fill: n.cor,
  }));

  const mixData = porNoite.map((n) => ({
    name: n.nome,
    'Drinks Autorais': parseFloat(n.mix['Drinks Autorais'] || 0),
    'Cervejas': parseFloat(n.mix['Cervejas'] || 0),
    'Clássicos': parseFloat(n.mix['Clássicos'] || 0),
    'Doses': parseFloat(n.mix['Doses'] || 0),
    'Combos': parseFloat(n.mix['Combos'] || 0),
    'Food': parseFloat(n.mix['Food'] || 0),
    'Soft Drinks': parseFloat(n.mix['Soft Drinks'] || 0),
    'Espumantes': parseFloat(n.mix['Espumantes'] || 0),
  }));

  const mixColors = {
    'Drinks Autorais': '#D4A843',
    'Cervejas': '#F59E0B',
    'Clássicos': '#3B82F6',
    'Doses': '#8B5CF6',
    'Combos': '#EC4899',
    'Food': '#10B981',
    'Soft Drinks': '#6B7280',
    'Espumantes': '#F472B6',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary cards per night */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {porNoite.map((n) => (
          <div
            key={n.id}
            className="bg-[#1a1a1a] rounded-xl p-5 border-l-4"
            style={{ borderLeftColor: n.cor }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: n.cor }}>{n.nome}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Público médio</span>
                <span className="text-white font-medium">{n.publicoMedio.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Receita média</span>
                <span className="text-white font-medium">{formatBRL(n.receitaMedia)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Ticket médio</span>
                <span className="text-white font-medium">{formatBRL(n.ticketMedio)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Noites no período</span>
                <span className="text-white font-medium">{n.numNoites}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Public comparison */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Público Médio por Noite</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barDataPublico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 11 }} />
              <YAxis tick={{ fill: '#999', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Público Médio" radius={[6, 6, 0, 0]}>
                {barDataPublico.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue comparison */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Receita Média por Noite</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barDataReceita}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 11 }} />
              <YAxis tick={{ fill: '#999', fontSize: 11 }} tickFormatter={formatK} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Receita Média" radius={[6, 6, 0, 0]}>
                {barDataReceita.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket comparison */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Ticket Médio por Noite</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barDataTicket}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 11 }} />
              <YAxis tick={{ fill: '#999', fontSize: 11 }} domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Ticket Médio" radius={[6, 6, 0, 0]}>
                {barDataTicket.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mix de consumo */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Mix de Consumo por Noite (% da Receita)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={mixData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" tick={{ fill: '#999', fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#999', fontSize: 11 }} width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#999' }} />
            {Object.entries(mixColors).map(([key, color]) => (
              <Bar key={key} dataKey={key} stackId="a" fill={color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue evolution over weeks */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Evolução Semanal da Receita por Noite</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={evolucaoSemanal}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="semana"
              tick={{ fill: '#999', fontSize: 10 }}
              tickFormatter={(v) => {
                const d = new Date(v + 'T12:00:00');
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />
            <YAxis tick={{ fill: '#999', fontSize: 11 }} tickFormatter={formatK} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="ritmos" name="Ritmos" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="anos2000" name="Anos 2000" stroke="#EC4899" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="salseiro" name="Salseiro" stroke="#F59E0B" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="flow" name="Flow Like SP" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
