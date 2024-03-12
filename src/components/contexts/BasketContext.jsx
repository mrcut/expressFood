import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevBasket.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevBasket, { ...product, quantity: 1 }];
    });
  };

  const removeFromBasket = (productId) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((p) => p._id === productId);
      if (!existingProduct) return prevBasket;
      if (existingProduct.quantity > 1) {
        return prevBasket.map((p) =>
          p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
      return prevBasket.filter((p) => p._id !== productId);
    });
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
