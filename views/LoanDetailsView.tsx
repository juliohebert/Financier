
import React, { useState, useEffect } from 'react';
import { Loan, AppView, PaymentEntry } from '../types';

interface LoanDetailsViewProps {
  loan: Loan;
  onNavigate: (view: AppView) => void;
  onPayment: (loanId: string, value: number, isInterestOnly: boolean) => void;
}

const LoanDetailsView: React.FC<LoanDetailsViewProps> = ({ loan, onNavigate, onPayment }) => {
  const [payValue, setPayValue] = useState<string>('');
  const [paymentType, setPaymentType] = useState<'TOTAL' | 'INTEREST'>('INTEREST');

  const totalInterestPaid = loan.payments
    .filter(p => p.type === 'JUROS')
    .reduce((acc, p) => acc + p.value, 0);

  const totalAmortized = loan.payments
    .filter(p => p.type === 'AMORTIZACAO')
    .reduce((acc, p) => acc + p.value, 0);

  const remainingBalance = loan.totalToReceive - loan.amountPaid;
  const progressPercent = Math.min(100, (loan.amountPaid / loan.totalToReceive) * 100);

  useEffect(() => {
    if (paymentType === 'INTEREST') {
      const suggested = (loan.amount * (loan.interestRate / 100));
      setPayValue(suggested.toFixed(2));
    } else {
      setPayValue(remainingBalance.toFixed(2));
    }
  }, [paymentType, loan, remainingBalance]);

  const handleConfirm = () => {
    const val = parseFloat(payValue);
    if (val > 0) {
      onPayment(loan.id, val, paymentType === 'INTEREST');
      setPayValue('');
    }
  };

  // Calcula o saldo histórico para cada linha da tabela
  const paymentsSorted = [...loan.payments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let runningAmortization = 0;
  const historyWithSaldo = paymentsSorted.map(p => {
    if (p.type === 'AMORTIZACAO') runningAmortization += p.value;
    return { ...p, saldoApos: (loan.totalToReceive - (loan.payments.filter(prev => prev.type === 'JUROS' && new Date(prev.date).getTime() <= new Date(p.date).getTime()).reduce((sum, curr) => sum + 0, 0))) - runningAmortization };
  }).reverse();

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto animate-in slide-in-from-right-4 duration-500">
      <header className="mb-8">
        <button 
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="flex items-center gap-2 text-slate-400 hover:text-primary font-black text-xs uppercase tracking-widest mb-6 transition-colors"
        >
          <span className="material-symbols-outlined text-sm font-bold">arrow_back</span> Voltar para Gestão
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">{loan.clientName}</h1>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                loan.status === 'QUITADO' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-primary/10 text-primary-dark border-primary/20 animate-pulse'
              }`}>
                {loan.status}
              </span>
              <div className="bg-slate-100 h-8 px-3 rounded-full flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="text-[10px] font-black text-slate-500">{progressPercent.toFixed(0)}% Pago</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-500 font-bold text-sm">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">fingerprint</span> ID: {loan.id}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">event</span> Início: {new Date(loan.startDate).toLocaleDateString('pt-BR')}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">percent</span> Taxa: {loan.interestRate}% am</span>
            </div>
          </div>
          
          <div className="bg-bg-dark text-white p-6 rounded-[2rem] min-w-[280px] shadow-xl shadow-bg-dark/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-6xl">account_balance</span>
            </div>
            <div className="flex items-center gap-1 mb-1 relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saldo Devedor Atual</p>
              <span className="material-symbols-outlined text-[12px] text-slate-500 cursor-help" title="Capital + Juros pendentes.">info</span>
            </div>
            <p className="text-4xl font-black text-primary relative z-10">R$ {remainingBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">insights</span> Performance
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 bg-green-50 rounded-3xl border border-green-100">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Seu Lucro (Juros)</p>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-black text-green-700">R$ {totalInterestPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className="material-symbols-outlined text-green-400">trending_up</span>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Principal Recuperado</p>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-black text-blue-700">R$ {totalAmortized.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className="material-symbols-outlined text-blue-400">keyboard_double_arrow_down</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Resumo do Contrato</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Valor Inicial</span>
                  <span className="text-slate-900">R$ {loan.amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Total com Juros</span>
                  <span className="text-slate-900">R$ {loan.totalToReceive.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>

          {loan.status !== 'QUITADO' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 text-lg">Receber Pagamento</h3>
              
              <div className="flex p-1.5 bg-bg-light rounded-2xl gap-1">
                <button 
                  onClick={() => setPaymentType('INTEREST')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                    paymentType === 'INTEREST' ? 'bg-white text-primary-dark shadow-sm' : 'text-slate-400'
                  }`}
                >
                  Só Juros
                </button>
                <button 
                  onClick={() => setPaymentType('TOTAL')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                    paymentType === 'TOTAL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
                  }`}
                >
                  Amortizar
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">R$</span>
                  <input 
                    type="number"
                    value={payValue}
                    onChange={(e) => setPayValue(e.target.value)}
                    className="w-full h-16 bg-bg-light border-none rounded-2xl pl-14 pr-4 text-slate-900 font-black text-2xl focus:ring-4 focus:ring-primary/20 transition-all"
                  />
                </div>
                
                <button 
                  onClick={handleConfirm}
                  className="w-full bg-primary hover:bg-primary-dark text-bg-dark font-black h-16 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  Registrar Entrada
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full min-h-[600px]">
            <div className="px-8 py-7 border-b bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Histórico de Pagamentos</h3>
                <p className="text-xs text-slate-500 font-bold italic">Acompanhe cada centavo que entrou deste contrato.</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full">
                  <div className="size-2 bg-green-500 rounded-full"></div>
                  <span className="text-[9px] font-black text-green-700 uppercase">Lucro</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full">
                  <div className="size-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[9px] font-black text-blue-700 uppercase">Capital</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b bg-bg-light/30">
                    <th className="px-8 py-5">Data Pagto.</th>
                    <th className="px-8 py-5">Registro em</th>
                    <th className="px-8 py-5">Natureza</th>
                    <th className="px-8 py-5 text-right">Valor Pago</th>
                    <th className="px-8 py-5 text-right">Saldo Restante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {historyWithSaldo.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900">{new Date(payment.date).toLocaleDateString('pt-BR')}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Doc: #{payment.id.substr(0,8).toUpperCase()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-600">
                             {new Date(payment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-[9px] text-slate-400 font-black uppercase tracking-tight">Horário do Sistema</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <span className={`material-symbols-outlined text-lg ${payment.type === 'JUROS' ? 'text-green-500' : 'text-blue-500'}`}>
                             {payment.type === 'JUROS' ? 'payments' : 'account_balance'}
                           </span>
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                            payment.type === 'JUROS' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                          }`}>
                            {payment.type === 'JUROS' ? 'Juros (Lucro)' : 'Principal (Capital)'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <p className={`font-black text-lg ${payment.type === 'JUROS' ? 'text-green-600' : 'text-slate-900'}`}>
                          R$ {payment.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="inline-flex flex-col items-end">
                           <span className="text-xs font-black text-slate-500">R$ {payment.saldoApos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                           <span className="text-[9px] font-bold text-slate-300 uppercase">Após Lançamento</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {historyWithSaldo.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <span className="material-symbols-outlined text-slate-200 text-5xl">history</span>
                          <p className="text-slate-400 font-bold uppercase text-xs">Nenhum pagamento registrado ainda.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-slate-50/50 border-t flex items-center justify-between">
              <div className="flex flex-col">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Resumo Total</p>
                 <p className="text-sm font-bold text-slate-700">O cliente já pagou um total de <span className="text-primary-dark">R$ {loan.amountPaid.toLocaleString('pt-BR')}</span></p>
              </div>
              <div className="flex gap-4">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Capital</p>
                    <p className="text-xs font-bold text-blue-600">R$ {totalAmortized.toLocaleString('pt-BR')}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Lucro</p>
                    <p className="text-xs font-bold text-green-600">R$ {totalInterestPaid.toLocaleString('pt-BR')}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsView;
