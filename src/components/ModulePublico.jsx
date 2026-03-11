import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const CORES_NOITE = {
  'Ritmos': '#10B981',
  'Anos 2000': '#EC4899',
  'Salseiro': '#F59E0B',
  'Flow Like SP': '#8B5CF6',
};

const CORES_GENERO = {
  Masculino: '#3B82F6',
  Feminino: '#EC4899',
  Outro: '#8B5CF6',
};

const FAIXAS = ['18-21', '22-25', '26-30', '31-35', '36+'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#D4A843]/30 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white/60 text-xs mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function ModulePublico({ data }) {
  const { perfilPorNoite } = data;
  const [selectedNoite, setSelectedNoite] = useState(null);

  // Aggregate faixa etária across all nights or selected night
  const noitesExibir = selectedNoite
    ? perfilPorNoite.filter((n) => n.id === selectedNoite)
    : perfilPorNoite;

  // Faixa etária comparison chart data
  const faixaChartData = FAIXAS.map((f, idx) => {
    const row = { faixa: f };
    for (const n of perfilPorNoite) {
      const item = n.porFaixa.find((p) => p.faixa === f);
      row[n.nome] = item ? item.count : 0;
    }
    return row;
  });

  // Gender donut data for selected or all
  const generoAgg = { Masculino: 0, Feminino: 0, Outro: 0 };
  for (const n of noitesExibir) {
    const total = n.totalClientes;
    generoAgg.Masculino += Math.round((parseFloat(n.genero.masculino) / 100) * total);
    generoAgg.Feminino += Math.round((parseFloat(n.genero.feminino) / 100) * total);
    generoAgg.Outro += Math.round((parseFloat(n.genero.outro) / 100) * total);
  }
  const generoDonut = Object.entries(generoAgg).map(([name, value]) => ({ name, value }));

  // Cross-table data
  const crossTableData = perfilPorNoite.map((n) => ({
    noite: n.nome,
    cor: n.cor,
    total: n.totalClientes,
    masc: n.genero.masculino,
    fem: n.genero.feminino,
    outro: n.genero.outro,
    faixaDominante: n.porFaixa.reduce((max, cur) => (cur.count > max.count ? cur : max), { count: 0 }).faixa,
    faixas: n.porFaixa,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Night filter pills */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedNoite(null)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            !selectedNoite ? 'bg-[#D4A843] text-black' : 'bg-[#1a1a1a] text-white/50 hover:text-white border border-white/10'
          }`}
        >
          Todas as Noites
        </button>
        {perfilPorNoite.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelectedNoite(selectedNoite === n.id ? null : n.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
              selectedNoite === n.id
                ? 'text-black'
                : 'bg-[#1a1a1a] text-white/50 hover:text-white border-white/10'
            }`}
            style={selectedNoite === n.id ? { backgroundColor: n.cor, borderColor: n.cor } : {}}
          >
            {n.nome}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age distribution comparison */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Distribuição por Faixa Etária × Noite</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={faixaChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="faixa" tick={{ fill: '#999', fontSize: 12 }} />
              <YAxis tick={{ fill: '#999', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {perfilPorNoite.map((n) => (
                <Bar key={n.id} dataKey={n.nome} fill={n.cor} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender donut */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">
            Distribuição por Gênero {selectedNoite ? `— ${perfilPorNoite.find((n) => n.id === selectedNoite)?.nome}` : '— Geral'}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={generoDonut}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {generoDonut.map((entry) => (
                  <Cell key={entry.name} fill={CORES_GENERO[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cross table */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Tabela Cruzada: Perfil por Noite Temática</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 font-medium">Noite</th>
                <th className="text-right py-3 px-4 text-white/50 font-medium">Clientes Únicos</th>
                <th className="text-right py-3 px-4 text-white/50 font-medium">Masculino</th>
                <th className="text-right py-3 px-4 text-white/50 font-medium">Feminino</th>
                <th className="text-right py-3 px-4 text-white/50 font-medium">Outro</th>
                <th className="text-right py-3 px-4 text-white/50 font-medium">Faixa Dominante</th>
                {FAIXAS.map((f) => (
                  <th key={f} className="text-right py-3 px-4 text-white/50 font-medium">{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crossTableData.map((row) => (
                <tr key={row.noite} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-medium" style={{ color: row.cor }}>{row.noite}</td>
                  <td className="text-right py-3 px-4 text-white">{row.total.toLocaleString('pt-BR')}</td>
                  <td className="text-right py-3 px-4 text-blue-400">{row.masc}%</td>
                  <td className="text-right py-3 px-4 text-pink-400">{row.fem}%</td>
                  <td className="text-right py-3 px-4 text-purple-400">{row.outro}%</td>
                  <td className="text-right py-3 px-4">
                    <span className="bg-[#D4A843]/20 text-[#D4A843] px-2 py-1 rounded text-xs">{row.faixaDominante}</span>
                  </td>
                  {row.faixas.map((f) => {
                    const pct = row.total > 0 ? (f.count / row.total) * 100 : 0;
                    const opacity = Math.min(pct / 40, 1) * 0.6 + 0.05;
                    return (
                      <td
                        key={f.faixa}
                        className="text-right py-3 px-4 text-white font-medium"
                        style={{ backgroundColor: `rgba(212,168,67,${opacity.toFixed(2)})` }}
                      >
                        {pct.toFixed(0)}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
