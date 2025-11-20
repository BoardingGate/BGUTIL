import React from 'react';
import { SimulationParams, CostParams } from '../types';
import { Wind, Thermometer, Zap, Activity, Euro, Fuel } from 'lucide-react';

interface ControlPanelProps {
  params: SimulationParams;
  costParams: CostParams;
  onParamChange: (newParams: SimulationParams) => void;
  onCostParamChange: (newParams: CostParams) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  params,
  costParams,
  onParamChange,
  onCostParamChange,
}) => {
  const handleParamChange = (key: keyof SimulationParams, value: number) => {
    onParamChange({ ...params, [key]: value });
  };

  const handleCostChange = (key: keyof CostParams, value: number) => {
    onCostParamChange({ ...costParams, [key]: value });
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg p-6 rounded-3xl border border-slate-800 shadow-xl">
      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-red-500" /> Condiciones de Conducción
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Speed */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4" /> Velocidad</label>
            <span className="text-white font-mono">{params.speed} km/h</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={params.speed}
            onChange={(e) => handleParamChange('speed', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-colors"
          />
        </div>

        {/* Temperature */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="text-slate-400 flex items-center gap-2"><Thermometer className="w-4 h-4" /> Temperatura</label>
            <span className="text-white font-mono">{params.temperature}°C</span>
          </div>
          <input
            type="range"
            min="-20"
            max="45"
            value={params.temperature}
            onChange={(e) => handleParamChange('temperature', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-slate-600 px-1">
            <span>-20°C</span>
            <span>20°C (Opt)</span>
            <span>45°C</span>
          </div>
        </div>

        {/* Gradient */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="text-slate-400 flex items-center gap-2">Desnivel / Pendiente</label>
            <span className="text-white font-mono">{params.gradient > 0 ? '+' : ''}{params.gradient}%</span>
          </div>
          <input
            type="range"
            min="-15"
            max="15"
            step="0.5"
            value={params.gradient}
            onChange={(e) => handleParamChange('gradient', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
           <div className="flex justify-between text-xs text-slate-600 px-1">
            <span>Bajada</span>
            <span>Llano</span>
            <span>Subida</span>
          </div>
        </div>

        {/* Wind */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <label className="text-slate-400 flex items-center gap-2"><Wind className="w-4 h-4" /> Viento</label>
            <span className="text-white font-mono">{Math.abs(params.wind)} km/h {params.wind > 0 ? '(Contra)' : '(Favor)'}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={params.wind}
            onChange={(e) => handleParamChange('wind', Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
           <div className="flex justify-between text-xs text-slate-600 px-1">
            <span>A favor</span>
            <span>Calma</span>
            <span>En contra</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-800 my-8" />

      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
        <Euro className="w-5 h-5 text-yellow-500" /> Configuración de Costes y Vehículo
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase font-bold">Luz (€/kWh)</label>
            <div className="relative">
                <input 
                    type="number" 
                    step="0.01"
                    value={costParams.electricityPrice}
                    onChange={(e) => handleCostChange('electricityPrice', parseFloat(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase font-bold">Gasolina (€/L)</label>
             <div className="relative">
                <input 
                    type="number" 
                    step="0.01"
                    value={costParams.gasPrice}
                    onChange={(e) => handleCostChange('gasPrice', parseFloat(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Fuel className="w-3 h-3"/> Ref. Gasolina (L/100)</label>
             <div className="relative">
                <input 
                    type="number" 
                    step="0.1"
                    value={costParams.gasConsumptionRef}
                    onChange={(e) => handleCostChange('gasConsumptionRef', parseFloat(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
         <div className="space-y-2">
            <label className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Zap className="w-3 h-3"/> Ref. Eléctrico (kWh/100)</label>
             <div className="relative">
                <input 
                    type="number" 
                    step="0.1"
                    value={costParams.electricConsumptionRef}
                    onChange={(e) => handleCostChange('electricConsumptionRef', parseFloat(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
      </div>
    </div>
  );
};