"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const { cartItems, removeFromCart, clearCart, PriceOrder } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session?.accessToken) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://node-eemi.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => item.id),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Erreur API:", text);
        throw new Error("Erreur lors de la création de la commande");
      }

      const data = await res.json();
      console.log("Commande créée:", data);

      clearCart();

      router.push(`/confirmation`);
    } catch (err) {
      console.error("Erreur checkout:", err);
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-white p-4">Votre panier est vide.</p>;
  }

  return (
    <section className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
     

       <Link href="/" className="text-[var(--gray-light-color)] flex  gap-2 items-center" >
        
          <Image
      src={"/images/lets-icons_back.png"}
      width={30}
      height={30}
      ></Image>
        Retour à l’accueil

      </Link>

    

      

      <h1 className="big--title">Panier</h1>

      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
        {/* Liste des produits */}
        <div className="flex flex-col gap-3 flex-2">
          {cartItems.map((item) => (
            <div
              className="arounded-gray flex flex-col md:flex-row justify-between items-center p-3 md:p-4 gap-3 md:gap-4"
              key={item.id}
            >
              <div className="flex gap-4 items-center w-full md:w-auto">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-white text-sm md:text-base lg:text-lg">
                    {item.name} x {item.quantity}
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base">
                    €{item.price} 
                  </p>
                </div>
              </div>

              <button
                className="button--red mt-2 md:mt-0"
                onClick={() => removeFromCart(item.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        {/* Récapitulatif */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="arounded-gray flex flex-col gap-5 p-4 md:p-5">
            <p className="text--white font-bold text-lg md:text-xl">
              Récapitulatif
            </p>

            <div className="flex flex-col gap-1">
              <p className="text--white font-bold">Totale</p>
              <p className="text--white text-3xl md:text-4xl font-bold">
                {PriceOrder}€
              </p>
            </div>
          </div>

          <button className="button--orange" onClick={handleCheckout}>
            {loading ? "Commande en cours..." : "Commander"}
          </button>

          {error && <p className="text--error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
