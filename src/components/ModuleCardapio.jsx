import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { ArrowUpDown } from 'lucide-react';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const formatK = (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v;

const CORES_CATEGORIA = {
  'Drinks Autorais': '#D4A843',
  'Cervejas': '#F59E0B',
  'Clássicos': '#3B82F6',
  'Doses': '#8B5CF6',
  'Combos': '#EC4899',
  'Food': '#10B981',
  'Soft Drinks': '#6B7280',
  'Espumantes': '#F472B6',
};

const NOITES_INFO = [
  { id: 'ritmos', nome: 'Ritmos', cor: '#10B981' },
  { id: 'anos2000', nome: 'Anos 2000', cor: '#EC4899' },
  { id: 'salseiro', nome: 'Salseiro', cor: '#F59E0B' },
  { id: 'flow', nome: 'Flow Like SP', cor: '#8B5CF6' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white/60 text-xs mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.color || p.fill }}>
          {p.name}: {typeof p.value === 'number' && p.value > 100 ? formatBRL(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function ModuleCardapio({ data }) {
  const { top15Produtos, categoriasChart, heatmapData, top5PorNoite } = data.cardapio;
  const horasLabel = data.horasLabel;

  // Top 15 products bar chart
  const top15Data = top15Produtos.map((p) => ({
    nome: p.nome.length > 20 ? p.nome.substring(0, 20) + '...' : p.nome,
    nomeCompleto: p.nome,
    Receita: Math.round(p.receita),
    Quantidade: p.quantidade,
    fill: CORES_CATEGORIA[p.categoria_grupo] || '#999',
  }));

  // Category pie
  const catPieData = categoriasChart.map((c) => ({
    name: c.nome,
    value: Math.round(c.receita),
    fill: CORES_CATEGORIA[c.nome] || '#999',
  }));

  // Heatmap rendering
  const horasNum = [22, 23, 0, 1, 2, 3, 4];
  const maxHeatVal = Math.max(
    ...heatmapData.flatMap((row) => horasNum.map((h) => row[h] || 0))
  );

  const getHeatColor = (val, maxVal) => {
    if (!val || !maxVal) return 'rgba(212, 168, 67, 0.05)';
    const intensity = val / maxVal;
    return `rgba(212, 168, 67, ${0.1 + intensity * 0.85})`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 15 Products */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Top 15 Produtos por Receita</h3>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={top15Data} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" tick={{ fill: '#999', fontSize: 11 }} tickFormatter={formatK} />
              <YAxis type="category" dataKey="nome" tick={{ fill: '#ccc', fontSize: 10 }} width={150} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
                      <p className="text-white text-sm font-medium mb-1">{d.nomeCompleto}</p>
                      <p className="text-[#D4A843] text-sm">Receita: {formatBRL(d.Receita)}</p>
                      <p className="text-white/60 text-xs">Unidades: {d.Quantidade.toLocaleString('pt-BR')}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="Receita" radius={[0, 6, 6, 0]}>
                {top15Data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Receita por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={catPieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {catPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
                    <p className="text-white text-sm">{payload[0].name}: {formatBRL(payload[0].value)}</p>
                  </div>
                );
              }} />
            </PieChart>
          </ResponsiveContainer>
          {/* Category list */}
          <div className="space-y-2 mt-4">
            {categoriasChart.map((c) => (
              <div key={c.nome} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CORES_CATEGORIA[c.nome] }} />
                  <span className="text-white/60">{c.nome}</span>
                </div>
                <span className="text-white/80 font-medium">{formatBRL(c.receita)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Heatmap de Consumo por Horário</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-white/50 text-xs font-medium w-32">Noite</th>
                {horasLabel.map((h) => (
                  <th key={h} className="py-2 px-3 text-white/50 text-xs font-medium text-center">{h}</th>
                ))}
                <th className="text-right py-2 px-4 text-white/50 text-xs font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row, ri) => {
                const total = horasNum.reduce((s, h) => s + (row[h] || 0), 0);
                return (
                  <tr key={ri}>
                    <td className="py-2 px-4 text-sm font-medium" style={{ color: row.cor }}>{row.noite}</td>
                    {horasNum.map((h) => (
                      <td key={h} className="py-2 px-3 text-center">
                        <div
                          className="rounded-md px-2 py-2 text-xs font-medium mx-auto"
                          style={{
                            backgroundColor: getHeatColor(row[h], maxHeatVal),
                            color: (row[h] || 0) / maxHeatVal > 0.4 ? '#000' : '#fff',
                            minWidth: '60px',
                          }}
                        >
                          {formatK(Math.round(row[h] || 0))}
                        </div>
                      </td>
                    ))}
                    <td className="text-right py-2 px-4 text-white/80 text-sm font-medium">{formatBRL(total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 5 per night */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {NOITES_INFO.map((n) => (
          <div key={n.id} className="bg-[#1a1a1a] rounded-xl p-5 border-t-4" style={{ borderTopColor: n.cor }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: n.cor }}>{n.nome} — Top 5</h3>
            <div className="space-y-3">
              {(top5PorNoite[n.id] || []).map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 text-xs w-4">{i + 1}.</span>
                    <span className="text-white/80 text-xs">{p.nome.length > 22 ? p.nome.substring(0, 22) + '...' : p.nome}</span>
                  </div>
                  <span className="text-white/60 text-xs font-medium">{formatBRL(p.receita)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
