import React, { useState, useEffect } from 'react';
import { Visualizer } from './components/Visualizer';
import { ControlPanel } from './components/ControlPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { calculateConsumption, calculateCosts } from './utils/physics';
import { SimulationParams, CostParams, CalculationResult } from './types';

const App: React.FC = () => {
  // Default State
  const [params, setParams] = useState<SimulationParams>({
    speed: 120,
    temperature: 20,
    gradient: 0,
    wind: 0,
  });

  const [costParams, setCostParams] = useState<CostParams>({
    electricityPrice: 0.08, // Precio usuario
    gasPrice: 1.45, // Precio usuario
    gasConsumptionRef: 6.5, // L/100km referencia usuario
    electricConsumptionRef: 13.2, // kWh/100km (WLTP Model 3 Highland)
  });

  const [results, setResults] = useState<CalculationResult>({
    consumption: 0,
    range: 0,
    costElectric: 0,
    costGas: 0,
    savings: 0,
  });

  // Recalculate whenever inputs change
  useEffect(() => {
    // Pass the user's reference consumption to calibrate the physics model
    const consumption = calculateConsumption(params, costParams.electricConsumptionRef);
    
    // Battery size approx 57.5kWh (RWD LFP) for the range calc
    const batterySize = 57.5; 
    
    // Avoid division by zero or infinite range
    const calculatedRange = consumption > 0 ? (batterySize / consumption) * 100 : (consumption < 0 ? 999 : 0);
    
    const costs = calculateCosts(consumption, costParams);

    setResults({
      consumption,
      range: calculatedRange,
      ...costs
    });
  }, [params, costParams]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 pb-12">
      {/* Header */}
      <header className="pt-8 pb-6 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                Boarding<span className="text-red-600">Gate</span>
                </h1>
                <p className="text-slate-400 text-sm mt-1">Real-time Efficiency Simulator</p>
            </div>
             <div className="text-xs text-slate-500 text-right hidden md:block">
                Tesla Model 3 Highland RWD<br/>
                Coeficiente Aerodinámico: 0.219 Cd
            </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Top Section: Visualization & Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
           <Visualizer params={params} consumption={results.consumption} />
        </div>

        {/* Key Metrics */}
        <ResultsDisplay results={results} />

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <ControlPanel 
                    params={params}
                    costParams={costParams}
                    onParamChange={setParams}
                    onCostParamChange={setCostParams}
                />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Quick Info Box could go here, but replaced with Gemini Advisor below */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 h-full flex flex-col justify-center">
                     <h3 className="font-display font-bold text-lg mb-4 text-white">Notas de Física</h3>
                     <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                            La velocidad tiene un efecto cuadrático en la resistencia. Pasar de 100 a 120 km/h aumenta el consumo significativamente.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></span>
                            El clima frío (-10°C) activa la calefacción de la batería, añadiendo una gran carga inicial.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></span>
                            Una pendiente descendente del 1% a menudo puede regenerar energía incluso a velocidades de autopista.
                        </li>
                     </ul>
                </div>
            </div>
        </div>

        {/* AI Section */}
        <GeminiAdvisor 
            params={params} 
            consumption={results.consumption}
            onApplyScenario={setParams}
        />

      </main>
      
      <footer className="max-w-6xl mx-auto px-8 mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
        <p>Simulador no oficial. No afiliado a Tesla, Inc. Los cálculos son aproximaciones basadas en física.</p>
      </footer>
    </div>
  );
};

export default App;