import { create } from 'zustand';
import { Mission } from '../constants/missions';

interface UserState {
  transportEmission: number;
  energyEmission: number;
  foodEmission: number;
  totalPoints: number;
  activeMission: (Mission & { progress: number }) | null;
  ownedItems: string[];
  equippedItems: {
    accessory: string | null;
    bg: string;
  };
  addEmission: (category: 'transport' | 'energy' | 'food', amount: number) => void;
  addPoints: (amount: number) => void;
  buyItem: (itemId: string, price: number) => boolean;
  equipItem: (itemId: string, type: 'accessory' | 'bg') => void;
  name: string | null;
  setName: (name: string) => void;
  acceptMission: (mission: Mission) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  transportEmission: 0,
  energyEmission: 0,
  foodEmission: 0,
  totalPoints: 1250,
  activeMission: null,
  ownedItems: ['bg_default'],
  equippedItems: {
    accessory: null,
    bg: 'bg_default',
  },
  name: null,
  addEmission: (category, amount) => set((state) => {
    const key = `${category}Emission` as keyof UserState;
    return { ...state, [key]: (state[key] as number) + amount };
  }),
  addPoints: (amount) => set((state) => ({ totalPoints: state.totalPoints + amount })),
  buyItem: (itemId, price) => {
    const { totalPoints, ownedItems } = get();
    if (ownedItems.includes(itemId)) return true; // Already owned
    if (totalPoints >= price) {
      set({
        totalPoints: totalPoints - price,
        ownedItems: [...ownedItems, itemId],
      });
      return true;
    }
    return false;
  },
  equipItem: (itemId, type) => set((state) => ({
    equippedItems: {
      ...state.equippedItems,
      [type]: itemId === state.equippedItems[type] ? null : itemId, // Toggle if same (optional, but good for accessories)
    }
  })),
  setName: (name) => set({ name }),
  acceptMission: (mission) => set({
    activeMission: { ...mission, progress: 0 }
  }),
}));
