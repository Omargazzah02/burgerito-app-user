"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    console.log(session)
    if (!session) return;


    const fetchProfileAndOrders = async () => {
      try {
        // 1️⃣ Récupérer l'utilisateur
        const resUser = await fetch("https://node-eemi.vercel.app/api/auth/me", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        const dataUser = await resUser.json();
        setUser(dataUser.user);

        // 2️⃣ Récupérer les commandes
        const resOrders = await fetch("https://node-eemi.vercel.app/api/orders/me", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        const dataOrders = await resOrders.json();

        // 3️⃣ Pour chaque order, récupérer les items
        const ordersWithItems = await Promise.all(
          dataOrders.items.map(async (order) => {
            const resOrderDetail = await fetch(
              `https://node-eemi.vercel.app/api/orders/${order.id}`,
              {
                headers: { Authorization: `Bearer ${session.accessToken}` },
              }
            );
            const dataOrderDetail = await resOrderDetail.json();
            return {
              ...order,
              items: dataOrderDetail.items,
            };
          })
        );

        setOrders(ordersWithItems);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération profil ou commandes :", error);
        setLoading(false);
      }
    };

    fetchProfileAndOrders();
  }, [session]);

  if (loading) return <p>Chargement...</p>;
  if (!user) return null;

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

    
      <h1 className="big--title">{user.name}</h1>

      <div className="flex flex-col gap-10">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-col gap-3">
            <p className="text--white">{formatDate(order.createdAt)}</p>

            <div className="flex flex-wrap gap-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 arounded-gray flex gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text--white font-bold text-sm md:text-base">
                      {item.product.name}
                    </p>
                    <p className="text--gray text-sm md:text-base">
                      {item.product.price} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
