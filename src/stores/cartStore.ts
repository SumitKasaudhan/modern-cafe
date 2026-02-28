import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (menuItem: MenuItem, quantity?: number, size?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (menuItem, quantity = 1, size) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.menuItem._id === menuItem._id && item.size === size
          );
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }
          return { items: [...state.items, { menuItem, quantity, size }] };
        });
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItem._id !== itemId),
        }));
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: quantity === 0
            ? state.items.filter((item) => item.menuItem._id !== itemId)
            : state.items.map((item) =>
                item.menuItem._id === itemId ? { ...item, quantity } : item
              ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const sizePrice = item.size
            ? item.menuItem.sizes?.find((s) => s.name === item.size)?.price
            : undefined;
          const unitPrice = sizePrice ?? item.menuItem.price;
          return total + unitPrice * item.quantity;
        }, 0);
      },
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
