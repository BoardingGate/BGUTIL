import React from 'react';
import { SimulationParams } from '../types';
import { Wind, Thermometer, Gauge, TrendingUp } from 'lucide-react';

interface VisualizerProps {
  params: SimulationParams;
  consumption: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({ params, consumption }) => {
  // Calculate rotation for gradient visualization
  const rotation = Math.min(Math.max(params.gradient * -1.5, -25), 25);
  
  // Wheel animation speed based on car speed
  const wheelSpeed = params.speed > 0 ? 2000 / params.speed : 0;
  
  // Wind effect opacity
  const windOpacity = Math.min(Math.abs(params.wind) / 50, 1);
  const isHeadwind = params.wind > 0;

  return (
    <div className="relative w-full h-64 md:h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex items-center justify-center perspective-1000 group">
      
      {/* Environmental Background - Sky/Ground */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/2 bg-slate-800/50 w-full relative overflow-hidden">
           {/* Moving Clouds/Sky effect */}
           <div className={`absolute top-4 right-10 w-20 h-20 rounded-full bg-yellow-100/10 blur-3xl transition-opacity duration-1000 ${params.temperature > 25 ? 'opacity-100' : 'opacity-0'}`}></div>
           <div className={`absolute top-0 left-0 w-full h-full bg-blue-500/5 transition-opacity duration-1000 ${params.temperature < 0 ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        <div className="h-1/2 bg-[#1c1c1c] w-full relative overflow-hidden">
            {/* Road lines */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-full flex justify-center">
                <div className={`w-full h-full bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.1)_50%,transparent_51%)] bg-[length:200px_100%] ${params.speed > 0 ? 'animate-road-move' : ''}`} 
                     style={{ animationDuration: `${200/Math.max(params.speed, 1)}s` }}>
                </div>
            </div>
        </div>
      </div>

      {/* Car Container with Physics Transform */}
      <div 
        className="relative z-10 transition-transform duration-500 ease-out"
        style={{ 
            transform: `rotate(${rotation}deg) translateY(${rotation * 2}px)` 
        }}
      >
        {/* Car Image */}
        <div className="relative w-[300px] md:w-[450px]">
             {/* Use a reliable side-view image from Wikimedia Commons */}
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/2018_Tesla_Model_3_Long_Range_%28US_Spec%29_Left_Side.jpg/1200px-2018_Tesla_Model_3_Long_Range_%28US_Spec%29_Left_Side.jpg"
                alt="Tesla Model 3" 
                className="w-full h-auto drop-shadow-2xl object-cover"
                style={{ 
                    // Basic mask to remove some background if the image isn't perfectly transparent (it's a JPG)
                    // Ideally we'd use a transparent PNG, but finding a guaranteed permanent one via URL is tricky.
                    // The 'maskImage' here softens the edges to blend it better with dark mode.
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    filter: 'contrast(1.1) brightness(1.1)'
                }} 
             />
             
             {/* Simple SVG Wheels overlays to simulate spinning - Positioned for the new image */}
             <div className={`absolute bottom-[16%] left-[19%] w-[14%] h-[14%] rounded-full border-2 border-gray-400/30 bg-black/80 ${params.speed > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: `${0.5 * (100/Math.max(params.speed, 1))}s` }}>
                <div className="w-full h-full border-t-2 border-gray-500/50 rounded-full"></div>
             </div>
             <div className={`absolute bottom-[16%] right-[17.5%] w-[14%] h-[14%] rounded-full border-2 border-gray-400/30 bg-black/80 ${params.speed > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: `${0.5 * (100/Math.max(params.speed, 1))}s` }}>
                <div className="w-full h-full border-t-2 border-gray-500/50 rounded-full"></div>
             </div>

             {/* Wind Lines Overlay */}
             {params.wind !== 0 && (
                 <div className="absolute inset-0 pointer-events-none">
                    <div className={`w-full h-full opacity-${Math.floor(windOpacity * 100)} transition-opacity duration-300`}>
                        {/* Simplified CSS Wind Lines */}
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i}
                                className={`absolute h-0.5 bg-white/20 rounded-full ${isHeadwind ? 'animate-wind-flow-head' : 'animate-wind-flow-tail'}`}
                                style={{
                                    top: `${20 + i * 15}%`,
                                    width: `${30 + Math.random() * 40}%`,
                                    left: isHeadwind ? '-50%' : '100%',
                                    animationDuration: `${1 + Math.random()}s`,
                                    animationDelay: `${Math.random()}s`
                                }}
                            />
                        ))}
                    </div>
                 </div>
             )}
        </div>
      </div>

      {/* HUD Overlay on Visualization */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white/80">
            <Gauge className="w-4 h-4 text-blue-400" />
            <span>{params.speed} km/h</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white/80">
            <TrendingUp className={`w-4 h-4 ${params.gradient > 0 ? 'text-red-400' : 'text-green-400'}`} />
            <span>{params.gradient}% Desnivel</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
         <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white/80">
            <Thermometer className={`w-4 h-4 ${params.temperature < 10 ? 'text-blue-300' : params.temperature > 25 ? 'text-red-300' : 'text-green-300'}`} />
            <span>{params.temperature}°C</span>
        </div>
         <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white/80">
            <Wind className={`w-4 h-4 ${params.wind > 0 ? 'text-orange-400' : 'text-emerald-400'}`} />
            <span>{Math.abs(params.wind)} km/h {params.wind > 0 ? 'Contra' : 'Favor'}</span>
        </div>
      </div>

      <style>{`
        @keyframes road-move {
            0% { background-position: 0 0; }
            100% { background-position: -200px 0; }
        }
        .animate-road-move {
            animation: road-move linear infinite;
        }
        @keyframes wind-flow-head {
            0% { transform: translateX(-100%) scaleX(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(300%) scaleX(1.2); opacity: 0; }
        }
        @keyframes wind-flow-tail {
            0% { transform: translateX(100%) scaleX(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(-300%) scaleX(1.2); opacity: 0; }
        }
        .animate-wind-flow-head {
            animation: wind-flow-head linear infinite;
        }
        .animate-wind-flow-tail {
            animation: wind-flow-tail linear infinite;
        }
      `}</style>
    </div>
  );
};