import { SimulationParams, CostParams } from '../types';

// Constants for Model 3 Highland (Approximation of RWD/Long Range blend for demo purposes)
const DRAG_COEFFICIENT = 0.219; 
const FRONTAL_AREA = 2.22; // m^2
const MASS = 1765; // kg (RWD Highland + driver)
const ROLLING_RESISTANCE = 0.01; 
const AIR_DENSITY = 1.225; // kg/m^3

// This is the consumption the physics engine outputs at 100km/h, 20C, 0% grade, 0 wind
// Used to normalize the user's "Rated Consumption" input.
const PHYSICS_BASE_100KMH = 13.0; 

/**
 * Calculates energy consumption based on physics approximation.
 * This is a simplified model for real-time UI feedback.
 * @param params Simulation parameters (speed, temp, etc)
 * @param refConsumption The user-provided rated consumption (WLTP) to calibrate the model
 */
export const calculateConsumption = (params: SimulationParams, refConsumption: number = 13.2): number => {
  const { speed, temperature, gradient, wind } = params;
  
  if (speed === 0) return 0;

  // 1. Aerodynamic Drag
  // Relative speed includes wind (Headwind is positive in our UI, adds to resistance)
  const relativeSpeedKmh = speed + wind;
  const relativeSpeedMs = relativeSpeedKmh / 3.6;
  const speedMs = speed / 3.6;

  // Force Aerodynamic = 0.5 * rho * Cd * A * v^2
  // We treat tailwind as reducing relative speed. 
  const aeroForce = 0.5 * AIR_DENSITY * DRAG_COEFFICIENT * FRONTAL_AREA * (relativeSpeedMs * Math.abs(relativeSpeedMs)); 

  // 2. Rolling Resistance
  // F_rr = Crr * m * g * cos(theta)
  const g = 9.81;
  const rollingForce = ROLLING_RESISTANCE * MASS * g;

  // 3. Gravity (Gradient)
  // F_g = m * g * sin(theta)
  const gradeDecimal = gradient / 100;
  const gravityForce = MASS * g * gradeDecimal;

  // Total Force (Newtons)
  const totalForce = aeroForce + rollingForce + gravityForce;

  // Power (Watts) = Force * Velocity
  let powerWatts = totalForce * speedMs;

  // 4. HVAC & Battery Temperature Overhead
  // Simple curve approximation: optimal at 20C.
  let hvacPowerWatts = 0;
  const deltaT = 20 - temperature;
  if (temperature < 20) {
    // Heating is expensive
    hvacPowerWatts = 500 + (Math.pow(Math.abs(deltaT), 1.5) * 50);
  } else {
    // Cooling is moderately expensive
    hvacPowerWatts = 500 + (Math.pow(Math.abs(deltaT), 1.2) * 30);
  }

  // Total Power required from battery
  let totalPowerWatts = powerWatts + hvacPowerWatts;

  // 5. Drivetrain Efficiency
  // Discharge efficiency ~90%, Regen efficiency ~70%
  if (totalPowerWatts > 0) {
    totalPowerWatts = totalPowerWatts / 0.90;
  } else {
    // Regenerative braking
    totalPowerWatts = totalPowerWatts * 0.70;
  }

  // Convert to kWh/100km
  const powerKw = totalPowerWatts / 1000;
  const timeFor100km = 100 / speed;
  
  let consumption = powerKw * timeFor100km;

  // 6. Calibration
  // Apply a scalar based on the user's Reference Consumption (WLTP) vs our Physics Base
  // If user says car is 15kWh/100km rated, we scale up. If 11, we scale down.
  const calibrationScalar = refConsumption / PHYSICS_BASE_100KMH;
  consumption = consumption * calibrationScalar;

  // Clamp regeneration to realistic max and min floor
  if (consumption < -15) consumption = -15;
  
  return parseFloat(consumption.toFixed(2));
};

export const calculateCosts = (kwhPer100: number, params: CostParams) => {
  const costElectric = (kwhPer100 * params.electricityPrice);
  const displayCostElectric = costElectric < 0 ? 0 : costElectric;
  
  const costGas = params.gasConsumptionRef * params.gasPrice;
  
  return {
    costElectric: parseFloat(displayCostElectric.toFixed(2)),
    costGas: parseFloat(costGas.toFixed(2)),
    savings: parseFloat((costGas - displayCostElectric).toFixed(2))
  };
};