import axios from 'axios';

// Use localhost for web, or specific IP for device if needed. 
// For Android Emulator use 'http://10.0.2.2:8000'
// For iOS Simulator use 'http://localhost:8000'
const API_URL = 'http://localhost:8000'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CalculationResponse {
  emissions_kg: number;
  category: string;
}

export const calculatorApi = {
  calculateTransport: async (transportType: string, distanceKm: number): Promise<CalculationResponse> => {
    const response = await api.post<CalculationResponse>('/api/calculate/transport', {
      transport_type: transportType,
      distance_km: distanceKm,
    });
    return response.data;
  },

  calculateEnergy: async (energyType: string, consumption: number): Promise<CalculationResponse> => {
    const response = await api.post<CalculationResponse>('/api/calculate/energy', {
      energy_type: energyType,
      consumption: consumption,
    });
    return response.data;
  },

  calculateFood: async (dietType: string, days: number): Promise<CalculationResponse> => {
    const response = await api.post<CalculationResponse>('/api/calculate/food', {
      diet_type: dietType,
      days: days,
    });
    return response.data;
  },
};

export const authApi = {
  login: async (email: string, password: string): Promise<{ access_token: string }> => {
    const response = await api.post<{ access_token: string }>('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<{ access_token: string }> => {
    const response = await api.post<{ access_token: string }>('/api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },
};
