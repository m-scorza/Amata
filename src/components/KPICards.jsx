import React from 'react';
import { TrendingUp, Users, DollarSign, UserCheck } from 'lucide-react';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const formatNum = (v) => (v || 0).toLocaleString('pt-BR');

const KPI_CONFIG = [
  { key: 'receitaTotal', varKey: 'receitaTotalVariacao', label: 'Receita Total', icon: DollarSign, format: formatBRL },
  { key: 'ticketMedio', varKey: 'ticketMedioVariacao', label: 'Ticket Médio', icon: TrendingUp, format: formatBRL },
  { key: 'totalPublico', varKey: 'totalPublicoVariacao', label: 'Total de Público', icon: Users, format: formatNum },
  { key: 'clientesUnicos', varKey: 'clientesUnicosVariacao', label: 'Clientes Únicos', icon: UserCheck, format: formatNum },
];

export default function KPICards({ kpis }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {KPI_CONFIG.map(({ key, varKey, label, icon: Icon, format }) => {
        const variacao = kpis[varKey];
        const isPositive = variacao > 0;
        const varPct = Math.abs(variacao * 100).toFixed(1);

        return (
          <div
            key={key}
            className="bg-[#1a1a1a] border border-[#D4A843]/20 rounded-xl p-5 animate-fade-in hover:border-[#D4A843]/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-xs uppercase tracking-wider">{label}</span>
              <Icon size={18} className="text-[#D4A843]" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white">{format(kpis[key])}</div>
            {variacao !== 0 && (
              <div className="mt-2 flex items-center gap-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{
                    color: isPositive ? '#10B981' : '#EF4444',
                    backgroundColor: isPositive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  }}
                >
                  {isPositive ? '▲' : '▼'} {varPct}% vs período anterior
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
