
import React from 'react';
import { Client, AppView } from '../types';

interface ClientsViewProps {
  onNavigate: (view: AppView, clientId?: string) => void;
  clients: Client[];
}

const ClientsView: React.FC<ClientsViewProps> = ({ onNavigate, clients }) => {
  return (
    <div className="p-8 max-w-[1200px] mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-bg-dark">Gestão de Clientes</h1>
          <p className="text-slate-500 mt-1 font-medium">Visualize e gerencie a saúde financeira de sua base de clientes.</p>
        </div>
        <button 
          onClick={() => onNavigate(AppView.CLIENT_FORM)}
          className="bg-primary hover:bg-primary-dark text-[#102216] font-black h-12 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <span className="material-symbols-outlined">person_add</span> Adicionar Novo Cliente
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-bg-light border-none h-12 rounded-lg pl-12 pr-4 focus:ring-primary font-medium" placeholder="Buscar por nome, CPF ou CNPJ..." />
        </div>
        <button className="flex items-center gap-2 px-6 h-12 bg-white border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-bg-light transition-colors">
          <span className="material-symbols-outlined text-xl">filter_list</span> Filtros
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Nome do Cliente</th>
                <th className="px-6 py-4">CPF / CNPJ</th>
                <th className="px-6 py-4 text-center">Total em Aberto</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-full flex items-center justify-center font-bold text-xs ${client.status === 'EM DIA' ? 'bg-primary/10 text-primary' : 'bg-red-50 text-red-400'}`}>
                        {client.initials}
                      </div>
                      <span className="font-bold text-slate-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500 font-mono">{client.document}</td>
                  <td className={`px-6 py-5 font-black text-center ${client.totalOpen > 0 && client.status === 'ATRASADO' ? 'text-red-500' : 'text-slate-900'}`}>
                    R$ {client.totalOpen.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 ${
                        client.status === 'EM DIA' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        <span className={`size-1.5 rounded-full ${client.status === 'EM DIA' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                        {client.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Ver Perfil"><span className="material-symbols-outlined">visibility</span></button>
                      <button 
                        onClick={() => onNavigate(AppView.LOANS, client.id)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors" 
                        title="Novo Empréstimo para este cliente"
                      >
                        <span className="material-symbols-outlined">payments</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors" title="Editar"><span className="material-symbols-outlined">edit</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">Nenhum cliente cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsView;
