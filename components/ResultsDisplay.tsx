import React from 'react';
import { CalculationResult } from '../types';
import { BatteryCharging, Car, PiggyBank } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Consumption Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-colors"></div>
        <div className="flex items-start justify-between mb-4">
            <div>
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Consumo</h4>
                <div className="text-4xl font-display font-bold text-white mt-1">
                    {results.consumption} <span className="text-lg font-sans font-normal text-slate-400">kWh/100km</span>
                </div>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                <BatteryCharging className="w-6 h-6" />
            </div>
        </div>
        <div className="text-sm text-slate-500">
             Autonomía Est.: <span className="text-blue-400 font-bold">{results.range > 999 ? '>999' : results.range.toFixed(0)} km</span>
        </div>
      </div>

      {/* EV Cost Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-600/20 rounded-full blur-3xl group-hover:bg-green-600/30 transition-colors"></div>
        <div className="flex items-start justify-between mb-4">
             <div>
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Coste Eléctrico</h4>
                <div className="text-4xl font-display font-bold text-white mt-1">
                    €{results.costElectric} <span className="text-lg font-sans font-normal text-slate-400">/100km</span>
                </div>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-green-400">
                <Car className="w-6 h-6" />
            </div>
        </div>
        <div className="text-sm text-slate-500">
            Basado en tarifa eléctrica
        </div>
      </div>

      {/* Savings Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-yellow-900/30 relative overflow-hidden">
         <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-600/10 rounded-full blur-3xl"></div>
         <div className="flex items-start justify-between mb-4">
             <div>
                <h4 className="text-yellow-500/80 text-sm font-medium uppercase tracking-wider">Ahorro vs Gasolina</h4>
                <div className="text-4xl font-display font-bold text-yellow-500 mt-1">
                    €{results.savings} <span className="text-lg font-sans font-normal text-yellow-500/60">/100km</span>
                </div>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-yellow-500">
                <PiggyBank className="w-6 h-6" />
            </div>
        </div>
        <div className="text-sm text-slate-500">
            Equivalente Gasolina: <span className="text-slate-300">€{results.costGas}/100km</span>
        </div>
      </div>
    </div>
  );
};