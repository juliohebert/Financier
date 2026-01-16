
import React from 'react';
import { Transaction } from '../types';

interface CashFlowViewProps {
  transactions: Transaction[];
}

const CashFlowView: React.FC<CashFlowViewProps> = ({ transactions }) => {
  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'ENTRADA') acc.in += t.value;
    else acc.out += t.value;
    return acc;
  }, { in: 0, out: 0 });

  return (
    <div className="p-8 space-y-8 animate-in zoom-in-95 duration-500">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-black tracking-tight">Fluxo de Caixa Detalhado</h2>
        <button className="flex items-center gap-2 px-4 h-11 bg-white border rounded-xl font-bold text-slate-700 hover:bg-bg-light transition-all shadow-sm">
          <span className="material-symbols-outlined text-xl">ios_share</span> Exportar
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase mb-1">Total Entradas</p>
          <p className="text-3xl font-black text-primary tracking-tight">R$ {totals.in.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase mb-1">Total Saídas</p>
          <p className="text-3xl font-black text-red-500 tracking-tight">R$ {totals.out.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-bg-dark p-6 rounded-2xl border border-bg-dark shadow-sm">
          <p className="text-slate-400 text-xs font-black uppercase mb-1">Saldo Líquido</p>
          <p className="text-3xl font-black text-white tracking-tight">R$ {(totals.in - totals.out).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-900">Histórico de Movimentações</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4 text-center">Tipo</th>
                <th className="px-6 py-4 text-right">Valor</th>
                <th className="px-6 py-4 text-center">Status Financeiro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-bg-light/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{t.date}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">{t.description}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${t.type === 'ENTRADA' ? 'bg-primary/20 text-primary' : 'bg-red-100 text-red-600'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-black text-sm ${t.type === 'ENTRADA' ? 'text-primary' : 'text-red-500'}`}>
                    R$ {t.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                      t.status === 'AGUARDANDO' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                      t.status === 'LIQUIDADO' ? 'bg-green-50 text-green-700 border-green-200' :
                      'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {t.status === 'AGUARDANDO' ? 'EM ABERTO' : t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlowView;
