export interface SimulationParams {
  speed: number;       // km/h
  temperature: number; // Celsius
  gradient: number;    // Percentage %
  wind: number;        // km/h (positive = headwind, negative = tailwind)
}

export interface CostParams {
  electricityPrice: number;    // €/kWh
  gasPrice: number;            // €/Liter
  gasConsumptionRef: number;   // L/100km (reference ICE car)
  electricConsumptionRef: number; // kWh/100km (Official rated consumption for calibration)
}

export interface CalculationResult {
  consumption: number; // kWh/100km
  range: number;       // Estimated range in km (based on ~57.5kWh useful battery for RWD or 75kWh for LR)
  costElectric: number; // €/100km
  costGas: number;      // €/100km
  savings: number;      // €/100km
}

export interface ScenarioResponse {
  name: string;
  description: string;
  params: SimulationParams;
}