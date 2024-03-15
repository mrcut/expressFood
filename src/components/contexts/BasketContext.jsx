/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load items from localStorage
    const savedItems = localStorage.getItem("basketItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Sauvegarde les items dans le localStorage
    localStorage.setItem("basketItems", JSON.stringify(items));
  }, [items]);

  const addToBasket = (product, quantity) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product._id === product._id
      );
      if (existingItemIndex >= 0) {
        // Mettre à jour la quantité
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const decreaseQuantity = (productId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  return (
    <BasketContext.Provider
      value={{
        items,
        addToBasket,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
