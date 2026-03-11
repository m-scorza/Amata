import React, { useState, useMemo } from 'react';
import { generateMockData, computeAggregations } from './data/generateMockData';
import { TrendingUp } from 'lucide-react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ModulePerformance from './components/ModulePerformance';
import ModulePublico from './components/ModulePublico';
import ModuleCRM from './components/ModuleCRM';
import ModuleCardapio from './components/ModuleCardapio';
import ModuleBirthdays from './components/ModuleBirthdays';
import ModuleUniversity from './components/ModuleUniversity';

// Generate data once (deterministic)
const rawData = generateMockData();

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function App() {
  const [filters, setFilters] = useState({ periodo: 90, noite: 'todas', dataInicio: '', dataFim: '' });
  const [activeModule, setActiveModule] = useState('performance');

  const aggregated = useMemo(
    () => computeAggregations(rawData, filters),
    [filters]
  );

  // Receita incremental: delta aniversários + delta lista universitária × quintas no período
  const receitaIncremental = useMemo(() => {
    if (!aggregated.birthdays || !aggregated.university) return 0;
    const deltaAniv = aggregated.birthdays.comparativo.delta;
    const uniLista = aggregated.university.cenarios.lista;
    const uniNormal = aggregated.university.cenarios.normal;
    const deltaUniPorNoite = (uniLista.receitaBar + uniLista.receitaEntrada) - (uniNormal.receitaBar + uniNormal.receitaEntrada);
    const quintasNoPeriodo = aggregated.porNoite?.find((n) => n.id === 'flow')?.numNoites || 12;
    return deltaAniv + (deltaUniPorNoite * quintasNoPeriodo);
  }, [aggregated]);

  const showIncremental = activeModule === 'birthdays' || activeModule === 'university';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FAFAFA]">
      <Header
        filters={filters}
        setFilters={setFilters}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      <main className="max-w-[1920px] mx-auto px-4 lg:px-8 py-6">
        <KPICards kpis={aggregated.kpis} />

        {showIncremental && (
          <div className="mb-6 bg-[#1a1a1a] border border-[#D4A843]/40 rounded-xl p-5 flex items-center gap-4 animate-fade-in">
            <div className="bg-[#D4A843]/10 rounded-lg p-2.5">
              <TrendingUp size={22} className="text-[#D4A843]" />
            </div>
            <div>
              <div className="text-white/50 text-xs uppercase tracking-wider">Receita Incremental Estimada</div>
              <div className="text-2xl lg:text-3xl font-bold text-[#D4A843]">{formatBRL(receitaIncremental)}</div>
              <div className="text-white/30 text-xs mt-0.5">soma do delta de aniversários + delta da lista universitária no período</div>
            </div>
          </div>
        )}

        {activeModule === 'performance' && <ModulePerformance data={aggregated} />}
        {activeModule === 'publico' && <ModulePublico data={aggregated} />}
        {activeModule === 'crm' && <ModuleCRM data={aggregated} />}
        {activeModule === 'cardapio' && <ModuleCardapio data={aggregated} />}
        {activeModule === 'birthdays' && <ModuleBirthdays data={aggregated} />}
        {activeModule === 'university' && <ModuleUniversity data={aggregated} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 mt-8">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 flex items-center justify-between text-xs text-white/20">
          <span>AMATA SP — Dashboard BI</span>
          <span>Powered by ZigPay Data Pipeline</span>
        </div>
      </footer>
    </div>
  );
}
