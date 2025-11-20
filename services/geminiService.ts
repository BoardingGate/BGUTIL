import { GoogleGenAI, Type } from "@google/genai";
import { SimulationParams, ScenarioResponse } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy' });

export const getAiAnalysis = async (params: SimulationParams, consumption: number) => {
  try {
    const prompt = `
      Actúa como un ingeniero de Tesla y experto en "Hypermiling".
      Analiza las siguientes condiciones de conducción para un Model 3 Highland:
      - Velocidad: ${params.speed} km/h
      - Temperatura: ${params.temperature}°C
      - Desnivel de carretera: ${params.gradient}%
      - Viento: ${params.wind} km/h (Positivo es Viento en contra)
      - Consumo Estimado: ${consumption} kWh/100km.

      Proporciona una visión profesional breve e impactante (máximo 3 frases) en ESPAÑOL sobre cómo estas variables específicas están afectando la autonomía ahora mismo.
      Después, proporciona un consejo práctico para mejorar la eficiencia bajo estas condiciones específicas.
      
      Devuelve texto plano, sin negritas markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "No se puede contactar con la Red Neuronal de Tesla (API Gemini) en este momento.";
  }
};

export const generateScenario = async (): Promise<ScenarioResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a challenging or interesting driving scenario for an electric vehicle simulation. Return the Name and Description in SPANISH.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of scenario in Spanish" },
            description: { type: Type.STRING, description: "Description in Spanish" },
            params: {
              type: Type.OBJECT,
              properties: {
                speed: { type: Type.NUMBER, description: "Speed in km/h (0-200)" },
                temperature: { type: Type.NUMBER, description: "Temp in Celsius (-20 to 45)" },
                gradient: { type: Type.NUMBER, description: "Road grade percentage (-10 to 20)" },
                wind: { type: Type.NUMBER, description: "Wind speed km/h (-50 to 50)" }
              },
              required: ["speed", "temperature", "gradient", "wind"]
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as ScenarioResponse;
  } catch (error) {
    console.error("Gemini Scenario Error:", error);
    return null;
  }
};