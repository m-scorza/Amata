import React from 'react';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const CENARIO_STYLES = {
  normal: { borderColor: 'rgba(255,255,255,0.1)', badge: null },
  lista: { borderColor: '#D4A843', badge: null },
  evento: { borderColor: '#10B981', badge: 'Potencial Máximo' },
};

export default function ModuleUniversity({ data }) {
  const { university } = data;
  if (!university) return null;

  const { cenarios, faculdades, projecao } = university;
  const cenariosArr = [
    { key: 'normal', ...cenarios.normal },
    { key: 'lista', ...cenarios.lista },
    { key: 'evento', ...cenarios.evento },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Comparativo triplo */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-4">Comparativo de Cenários — Quinta-feira</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cenariosArr.map((c) => {
            const style = CENARIO_STYLES[c.key];
            const receitaTotal = c.receitaBar + c.receitaEntrada;
            return (
              <div
                key={c.key}
                className="bg-[#1a1a1a] rounded-xl p-6 border-2 relative"
                style={{ borderColor: style.borderColor }}
              >
                {style.badge && (
                  <div className="absolute -top-3 left-4 bg-[#10B981] text-black text-xs font-bold px-3 py-1 rounded-full">
                    {style.badge}
                  </div>
                )}
                <h4 className="text-base font-bold text-white mb-4">{c.label}</h4>
                <div className="space-y-3">
                  <Row label="Público" value={c.publico.toLocaleString('pt-BR')} />
                  <Row label="Receita de Bar" value={formatBRL(c.receitaBar)} />
                  <Row label="Receita de Entrada" value={`${formatBRL(c.receitaEntrada)}`} sub={c.descEntrada} />
                  <div className="border-t border-white/10 pt-3">
                    <Row label="Receita Total" value={formatBRL(receitaTotal)} bold />
                  </div>
                  <Row label="Ticket Médio (bar)" value={formatBRL(c.ticketBar)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Base de alunos por faculdade */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Base de Alunos por Faculdade/Atlética</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-3 text-white/50 font-medium w-8">#</th>
                <th className="text-left py-3 px-3 text-white/50 font-medium">Faculdade/Atlética</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Alunos na Base</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Presenças Acumuladas</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Última Presença</th>
                <th className="text-left py-3 px-3 text-white/50 font-medium" style={{ minWidth: 200 }}>Maturidade</th>
              </tr>
            </thead>
            <tbody>
              {faculdades.map((f, i) => {
                const d = new Date(f.ultimaPresenca + 'T12:00:00');
                const dateStr = `${d.getDate()}/${d.getMonth() + 1}`;
                const isReady = f.maturidade >= 75;
                return (
                  <tr key={f.nome} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white/30 text-xs">{i + 1}</td>
                    <td className="py-3 px-3 text-white font-medium">{f.nome}</td>
                    <td className="text-right py-3 px-3 text-white/80">{f.alunos.toLocaleString('pt-BR')}</td>
                    <td className="text-right py-3 px-3 text-white/80">{f.presencas.toLocaleString('pt-BR')}</td>
                    <td className="text-right py-3 px-3 text-white/80">{dateStr}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${f.maturidade}%`,
                              backgroundColor: isReady ? '#10B981' : '#D4A843',
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/60 w-8 text-right">{f.maturidade}%</span>
                        {isReady && (
                          <span className="text-xs text-[#10B981] font-medium whitespace-nowrap">Pronto para evento</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projeção de evento fechado */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#10B981]/20">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Projeção de Evento Fechado</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center">
            <div className="text-xs text-white/40 mb-2">Receita projetada de 1 evento fechado</div>
            <div className="text-3xl font-bold text-[#10B981]">{formatBRL(projecao.receitaEvento)}</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center">
            <div className="text-xs text-white/40 mb-2">Equivale a</div>
            <div className="text-3xl font-bold text-[#D4A843]">{projecao.equivaleQuintas}x</div>
            <div className="text-xs text-white/40 mt-1">quintas normais</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center">
            <div className="text-xs text-white/40 mb-2">Faculdades prontas para proposta</div>
            <div className="text-3xl font-bold text-white">{projecao.faculdadesProntas}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, sub, bold }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-white/50 text-sm">{label}</span>
      <div className="text-right">
        <span className={`text-white ${bold ? 'text-lg font-bold' : 'font-medium'}`}>{value}</span>
        {sub && <div className="text-white/30 text-xs">{sub}</div>}
      </div>
    </div>
  );
}
