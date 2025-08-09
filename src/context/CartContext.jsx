import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initial = (() => {
  try {
    const raw = localStorage.getItem("cart_v1");
    return raw ? JSON.parse(raw) : { items: [] };
  } catch { return { items: [] }; }
})();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      const exists = state.items.find(i => i.id === product.id);
      let items;
      if (exists) {
        items = state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      } else {
        items = [...state.items, { ...product, qty }];
      }
      return { ...state, items };
    }
    case "REMOVE": {
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i) };
    }
    case "CLEAR": return { items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(state));
  }, [state]);

  const total = state.items.reduce((acc, i) => acc + (i.precio || 0) * i.qty, 0);
  const count = state.items.reduce((acc, i) => acc + i.qty, 0);

  const value = {
    items: state.items,
    count,
    total,
    add: (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } }),
    remove: (id) => dispatch({ type: "REMOVE", payload: { id } }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
    clear: () => dispatch({ type: "CLEAR" })
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
