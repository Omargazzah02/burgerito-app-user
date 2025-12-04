"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function MiniCart() {
  const { cartItems, updateQuantity, removeFromCart, PriceOrder } = useCart();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white text-black p-4 rounded-lg shadow-lg z-50">
      <h2 className="font-bold text-lg mb-3">Votre Panier</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Votre panier est vide</p>
      ) : (
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center border-b border-gray-300 pb-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={50}
                height={50}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">{item.name}</p>
                <p className="text-gray-800 text-sm">€{item.price}</p>

                {/* Quantité modifiable */}
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-600 px-2 rounded hover:bg-gray-500 text-white"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-12 text-black text-center rounded border border-gray-300"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-600 px-2 rounded hover:bg-gray-500 text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:opacity-80 transition"
              >
                ❌
              </button>
            </div>
          ))}

          {/* Total + boutons */}
          <div className="mt-3 border-t border-gray-300 pt-3 flex flex-col gap-2">
            <p className="font-bold flex justify-between text-black">
              Total: <span>€{PriceOrder}</span>
            </p>
            <Link href="/cart" className="button--gray text-center w-full">
              Voir le panier
            </Link>
            <Link href="/checkout" className="button--orange text-center w-full">
              Passer à la commande
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
