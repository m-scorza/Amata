import React, { useState, useEffect } from 'react';
import { Star, Wine, MessageCircle } from 'lucide-react';

const formatBRL = (v) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const STATUS_STYLES = {
  Identificado: 'bg-white/10 text-white/60',
  Contatado: 'bg-[#F59E0B]/20 text-[#F59E0B]',
  Confirmado: 'bg-[#10B981]/20 text-[#10B981]',
};

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a1a] border border-[#D4A843]/40 text-white text-sm px-5 py-3 rounded-xl shadow-2xl animate-fade-in">
      {message}
    </div>
  );
}

export default function ModuleBirthdays({ data }) {
  const { birthdays } = data;
  const [toast, setToast] = useState(null);

  if (!birthdays) return null;

  const { aniversariantes, receitaPotencialSemana, receitaConfirmada, taxaConversao, comparativo, ocupacaoSemanas } = birthdays;

  const showToast = (msg) => setToast(msg);

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#D4A843]/30">
          <span className="text-white/50 text-xs uppercase tracking-wider">Receita Potencial da Semana</span>
          <div className="text-3xl font-bold mt-2" style={{ color: '#D4A843' }}>
            {formatBRL(receitaPotencialSemana)}
          </div>
          <p className="text-white/40 text-xs mt-1">aniversariantes × convidados × gasto médio</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#10B981]/30">
          <span className="text-white/50 text-xs uppercase tracking-wider">Reservas Confirmadas</span>
          <div className="text-3xl font-bold mt-2 text-[#10B981]">
            {formatBRL(receitaConfirmada)}
          </div>
          <p className="text-white/40 text-xs mt-1">valor já garantido</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <span className="text-white/50 text-xs uppercase tracking-wider">Taxa de Conversão</span>
          <div className="text-3xl font-bold mt-2 text-white">{taxaConversao}%</div>
          <p className="text-white/40 text-xs mt-1">confirmados / total prospectados</p>
        </div>
      </div>

      {/* Ocupação próximas 4 semanas */}
      {ocupacaoSemanas && (
        <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Ocupação — Próximas 4 Semanas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-white/50 font-medium w-20">Semana</th>
                  <th className="text-center py-2 px-3 text-white/50 font-medium">Quinta</th>
                  <th className="text-center py-2 px-3 text-white/50 font-medium">Sexta</th>
                  <th className="text-center py-2 px-3 text-white/50 font-medium">Sábado</th>
                </tr>
              </thead>
              <tbody>
                {ocupacaoSemanas.map((sem, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-3 text-white/60 text-xs">{sem.label}</td>
                    {['quinta', 'sexta', 'sabado'].map((dia) => {
                      const cell = sem[dia];
                      let bgColor, textColor;
                      if (cell.reservas === 0) {
                        bgColor = 'rgba(239,68,68,0.15)';
                        textColor = '#EF4444';
                      } else if (cell.reservas === 1) {
                        bgColor = 'rgba(245,158,11,0.15)';
                        textColor = '#F59E0B';
                      } else {
                        bgColor = 'rgba(16,185,129,0.15)';
                        textColor = '#10B981';
                      }
                      return (
                        <td key={dia} className="py-3 px-3 text-center">
                          <div
                            className="rounded-lg px-3 py-2 mx-auto max-w-[120px]"
                            style={{ backgroundColor: bgColor }}
                          >
                            <div className="text-xs font-medium" style={{ color: textColor }}>
                              {cell.data}
                            </div>
                            <div className="text-sm font-bold mt-0.5" style={{ color: textColor }}>
                              {cell.reservas === 0 ? '0' : `${cell.reservas} reserva${cell.reservas > 1 ? 's' : ''}`}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabela de aniversariantes */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Aniversariantes do Período</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-3 text-white/50 font-medium w-8">#</th>
                <th className="text-left py-3 px-3 text-white/50 font-medium">Cliente</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Aniversário</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Visitas</th>
                <th className="text-right py-3 px-3 text-white/50 font-medium">Gasto Total</th>
                <th className="text-left py-3 px-3 text-white/50 font-medium">Noite Favorita</th>
                <th className="text-center py-3 px-3 text-white/50 font-medium">Ações</th>
                <th className="text-center py-3 px-3 text-white/50 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {aniversariantes.map((a, i) => {
                const parts = a.data_nascimento.split('-');
                return (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white/30 text-xs">{i + 1}</td>
                    <td className="py-3 px-3 text-white font-medium">{a.nome}</td>
                    <td className="text-right py-3 px-3 text-white/80">{parts[2]}/{parts[1]}</td>
                    <td className="text-right py-3 px-3 text-white/80">{a.visitas}</td>
                    <td className="text-right py-3 px-3 text-white/80">{formatBRL(a.gasto)}</td>
                    <td className="py-3 px-3">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">{a.noiteFavorita}</span>
                    </td>
                    <td className="text-center py-3 px-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="Liberar VIP"
                          onClick={() => showToast('Funcionalidade em breve')}
                          className="p-1 rounded hover:bg-white/10 transition-all hover:scale-110"
                        >
                          <Star size={16} className="text-[#D4A843]" />
                        </button>
                        <button
                          title="Enviar Voucher Drink"
                          onClick={() => showToast('Funcionalidade em breve')}
                          className="p-1 rounded hover:bg-white/10 transition-all hover:scale-110"
                        >
                          <Wine size={16} className="text-[#EC4899]" />
                        </button>
                        <button
                          title="Enviar WhatsApp"
                          onClick={() => showToast('Funcionalidade em breve')}
                          className="p-1 rounded hover:bg-white/10 transition-all hover:scale-110"
                        >
                          <MessageCircle size={16} className="text-[#25D366]" />
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_STYLES[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparativo de impacto */}
      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#D4A843]/20">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Impacto de Aniversários na Receita</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center">
            <div className="text-xs text-white/40 mb-2">Receita média COM aniversário reservado</div>
            <div className="text-2xl font-bold text-[#10B981]">{formatBRL(comparativo.comAniversario)}</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center">
            <div className="text-xs text-white/40 mb-2">Receita média SEM aniversário reservado</div>
            <div className="text-2xl font-bold text-white/60">{formatBRL(comparativo.semAniversario)}</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-5 text-center border border-[#D4A843]/20">
            <div className="text-xs text-white/40 mb-2">Delta</div>
            <div className="text-2xl font-bold text-[#D4A843]">
              +{formatBRL(comparativo.delta)} (+{comparativo.deltaPct}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
