import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { DonationItem, Appeal } from "@shared/api";

interface CartState {
  items: DonationItem[];
  total: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        appeal: Appeal;
        amount: number;
        frequency: "onetime" | "monthly" | "yearly";
      };
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        appealId: string;
        amount: number;
        frequency: "onetime" | "monthly" | "yearly";
      };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        appealId: string;
        amount: number;
        frequency: "onetime" | "monthly" | "yearly";
        quantity: number;
      };
    }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  addItem: (
    appeal: Appeal,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
  ) => void;
  removeItem: (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
  ) => void;
  updateQuantity: (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
    quantity: number,
  ) => void;
  clearCart: () => void;
  getItemCount: () => number;
  recentlyAdded: boolean;
  setRecentlyAdded: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { appeal, amount, frequency } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.appealId === appeal.id &&
          item.amount === amount &&
          item.frequency === frequency,
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.amount * item.quantity,
            0,
          ),
        };
      }

      const newItems = [
        ...state.items,
        { appealId: appeal.id, amount, quantity: 1, frequency, appeal },
      ];
      return {
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.amount * item.quantity,
          0,
        ),
      };
    }

    case "REMOVE_ITEM": {
      const { appealId, amount, frequency } = action.payload;
      const newItems = state.items.filter(
        (item) =>
          !(
            item.appealId === appealId &&
            item.amount === amount &&
            item.frequency === frequency
          ),
      );
      return {
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.amount * item.quantity,
          0,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { appealId, amount, frequency, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          payload: { appealId, amount, frequency },
        });
      }

      const updatedItems = state.items.map((item) =>
        item.appealId === appealId &&
        item.amount === amount &&
        item.frequency === frequency
          ? { ...item, quantity }
          : item,
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + item.amount * item.quantity,
          0,
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const [recentlyAdded, setRecentlyAdded] = React.useState(false);

  const addItem = (
    appeal: Appeal,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
  ) => {
    dispatch({ type: "ADD_ITEM", payload: { appeal, amount, frequency } });
    setRecentlyAdded(true);
    setTimeout(() => setRecentlyAdded(false), 100);
  };

  const removeItem = (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
  ) => {
    dispatch({ type: "REMOVE_ITEM", payload: { appealId, amount, frequency } });
  };

  const updateQuantity = (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
    quantity: number,
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { appealId, amount, frequency, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemCount = () => {
    return state.items.length;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        recentlyAdded,
        setRecentlyAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
