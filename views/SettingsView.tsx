
import React, { useState } from 'react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  const [interest, setInterest] = useState<string>(settings.defaultInterestRate.toString());
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    const val = parseFloat(interest);
    if (!isNaN(val) && val >= 0) {
      onUpdateSettings({
        ...settings,
        defaultInterestRate: val
      });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-bg-dark">Configurações</h1>
        <p className="text-slate-500 mt-2 font-medium">Personalize os parâmetros de operação do seu negócio de crédito.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-3xl border border-primary/10">
            <span className="material-symbols-outlined text-primary text-3xl">percent</span>
            <div>
              <h3 className="font-black text-slate-900">Juros Padrão de Empréstimo</h3>
              <p className="text-sm text-slate-500 font-medium">Este valor será sugerido automaticamente toda vez que você criar um novo contrato.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest px-2">Taxa Recorrente (% Mensal)</label>
            <div className="relative max-w-[200px]">
              <input 
                type="number"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full h-16 bg-bg-light border-none rounded-2xl px-6 text-slate-900 font-black text-2xl focus:ring-4 focus:ring-primary/20 transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xl">%</span>
            </div>
            <p className="text-xs text-slate-400 font-bold italic px-2">* Recomendamos manter entre 2% e 15% para operações saudáveis.</p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
            <button 
              onClick={handleSave}
              className="bg-bg-dark text-white hover:bg-primary hover:text-bg-dark font-black h-16 px-10 rounded-2xl transition-all shadow-xl flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">save</span> Salvar Preferências
            </button>

            {showSaved && (
              <span className="text-green-600 font-black text-sm flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                <span className="material-symbols-outlined text-base">check_circle</span> Configurações atualizadas!
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm opacity-50 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 text-3xl">notifications</span>
              <div>
                <h3 className="font-black text-slate-400">Lembretes de Cobrança</h3>
                <p className="text-sm text-slate-400 font-medium">Notificar automaticamente via WhatsApp (Em breve na versão Premium).</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative">
              <div className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
