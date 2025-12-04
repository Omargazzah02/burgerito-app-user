"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  // ✅ Charger le panier depuis localStorage au montage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  // ✅ Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ✅ Ajouter au panier
  const addToCart = (product) => {
    if (!session) {
      router.push("/login");
      return;
    }

    const exist = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (exist) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    setIsMiniCartOpen(true);
  };

  // ✅ Supprimer du panier
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // ✅ Modifier quantité
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // ✅ Vider le panier
  const clearCart = () => {
    setCartItems([]);
    setIsMiniCartOpen(false);
    localStorage.removeItem("cartItems");
  };

 const PriceOrder = parseFloat(
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(3)
);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        PriceOrder,
        isMiniCartOpen,
        setIsMiniCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
