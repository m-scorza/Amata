import React, { useState, useMemo } from 'react';
import { generateMockData, computeAggregations } from './data/generateMockData';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ModulePerformance from './components/ModulePerformance';
import ModulePublico from './components/ModulePublico';
import ModuleCRM from './components/ModuleCRM';
import ModuleCardapio from './components/ModuleCardapio';

// Generate data once (deterministic)
const rawData = generateMockData();

export default function App() {
  const [filters, setFilters] = useState({ periodo: 90, noite: 'todas' });
  const [activeModule, setActiveModule] = useState('performance');

  const aggregated = useMemo(
    () => computeAggregations(rawData, filters),
    [filters]
  );

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

        {activeModule === 'performance' && <ModulePerformance data={aggregated} />}
        {activeModule === 'publico' && <ModulePublico data={aggregated} />}
        {activeModule === 'crm' && <ModuleCRM data={aggregated} />}
        {activeModule === 'cardapio' && <ModuleCardapio data={aggregated} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 mt-8">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 flex items-center justify-between text-xs text-white/20">
          <span>AMATA SP — Dashboard BI · Dados simulados para demonstração</span>
          <span>Powered by ZigPay Data Pipeline</span>
        </div>
      </footer>
    </div>
  );
}
