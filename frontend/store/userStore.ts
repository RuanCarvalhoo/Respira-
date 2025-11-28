import { create } from 'zustand';

interface UserState {
  transportEmission: number;
  energyEmission: number;
  foodEmission: number;
  totalPoints: number;
  activeMission: {
    title: string;
    progress: number;
  } | null;
  ownedItems: string[];
  equippedItems: {
    accessory: string | null;
    bg: string;
  };
  addEmission: (category: 'transport' | 'energy' | 'food', amount: number) => void;
  addPoints: (amount: number) => void;
  buyItem: (itemId: string, price: number) => boolean;
  equipItem: (itemId: string, type: 'accessory' | 'bg') => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  transportEmission: 0,
  energyEmission: 0,
  foodEmission: 0,
  totalPoints: 1250,
  activeMission: {
    title: "Segunda sem Carne",
    progress: 0.75,
  },
  ownedItems: ['bg_default'],
  equippedItems: {
    accessory: null,
    bg: 'bg_default',
  },
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
}));
