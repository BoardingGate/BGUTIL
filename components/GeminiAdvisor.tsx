import React, { useState } from 'react';
import { SimulationParams } from '../types';
import { getAiAnalysis, generateScenario } from '../services/geminiService';
import { BrainCircuit, Sparkles, ChevronRight } from 'lucide-react';

interface GeminiAdvisorProps {
  params: SimulationParams;
  consumption: number;
  onApplyScenario: (params: SimulationParams) => void;
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ params, consumption, onApplyScenario }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scenarioLoading, setScenarioLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getAiAnalysis(params, consumption);
    setAnalysis(result);
    setLoading(false);
  };

  const handleSurprise = async () => {
    setScenarioLoading(true);
    setAnalysis(null); // Clear previous analysis
    const scenario = await generateScenario();
    if (scenario) {
        onApplyScenario(scenario.params);
        setAnalysis(`**Escenario Cargado: ${scenario.name}**\n\n${scenario.description}`);
    }
    setScenarioLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-3xl p-6 mt-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-300">
                <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">Tesla Neural Core</h3>
                <p className="text-sm text-indigo-200/70">Análisis de energía con IA</p>
            </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
             <button 
                onClick={handleSurprise}
                disabled={scenarioLoading}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 transition-all text-sm font-medium disabled:opacity-50"
            >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                {scenarioLoading ? 'Generando...' : 'Sorpréndeme'}
            </button>

            <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all font-medium disabled:opacity-50"
            >
                {loading ? 'Analizando...' : 'Analizar Eficiencia'}
                {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
        </div>
      </div>

      {/* Analysis Result Area */}
      {(analysis || loading) && (
        <div className="bg-slate-950/50 rounded-xl p-5 border border-indigo-500/20 min-h-[80px] transition-all">
            {loading ? (
                <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-2 bg-indigo-400/20 rounded w-3/4"></div>
                    <div className="h-2 bg-indigo-400/20 rounded w-full"></div>
                    <div className="h-2 bg-indigo-400/20 rounded w-5/6"></div>
                </div>
            ) : (
                <div className="text-indigo-100 leading-relaxed whitespace-pre-wrap text-sm">
                    {analysis}
                </div>
            )}
        </div>
      )}
    </div>
  );
};