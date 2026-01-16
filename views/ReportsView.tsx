
import React from 'react';
import { Client } from '../types';

interface ReportsViewProps {
  clients: Client[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ clients }) => {
  const lateClients = clients.filter(c => c.status === 'ATRASADO');
  const totalLate = lateClients.reduce((acc, c) => acc + c.totalOpen, 0);

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Relatório de Inadimplência</h1>
          <p className="text-slate-500 mt-2 font-medium">Clientes com parcelas vencidas e saldo em aberto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Valor Total Vencido</p>
          <p className="text-3xl font-black tracking-tight text-danger">R$ {totalLate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Qtd. Clientes em Atraso</p>
          <p className="text-3xl font-black tracking-tight text-slate-900">{lateClients.length} clientes</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4 text-right">Valor em Aberto</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lateClients.map((row) => (
                <tr key={row.id} className="hover:bg-bg-light/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full font-black text-[10px] flex items-center justify-center bg-danger/10 text-danger">
                        {row.initials}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{row.name}</p>
                        <p className="text-[10px] font-bold text-slate-400">{row.document}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-slate-900 text-lg">
                    R$ {row.totalOpen.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="text-[#25D366] font-bold text-xs flex items-center gap-1 justify-center mx-auto border border-[#25D366]/20 px-3 py-1.5 rounded-lg hover:bg-[#25D366]/10 transition-colors">
                      <span className="material-symbols-outlined text-sm">chat</span> Cobrar
                    </button>
                  </td>
                </tr>
              ))}
              {lateClients.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-medium">Parabéns! Nenhuma inadimplência encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
