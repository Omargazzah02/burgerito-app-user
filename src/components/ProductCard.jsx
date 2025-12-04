import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ item, addToCart }) {
  return (
    <div className="p-5 w-full sm:w-64 md:w-72 lg:w-80 h-fit flex flex-col gap-5 arounded-gray relative">
      {/* ✅ Conteneur relatif pour positionner la bande */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* 🚫 Bande rouge si produit indisponible */}
        {!item.isAvailable && (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            Produit indisponible
          </div>
        )}
      </div>

      {/* 🔹 Infos produit */}
      <div className="flex flex-col">
        <p className="text--white font-bold">{item.name}</p>
        <p className="text--gray">€{item.price}</p>
      </div>

      {/* 🔹 Boutons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Link href={`/products/${item.id}`} className="button--gray flex-1 w-full sm:w-auto text-center">
          Détails
        </Link>

        {item.isAvailable ? (
          <button
            onClick={addToCart}
            className="button--orange flex-1 sm:flex-2 w-full sm:w-auto"
          >
            Ajouter au panier
          </button>
        ) : (
          <button className="button--notvailable flex-1 sm:flex-2 w-full sm:w-auto" disabled>
            Ajouter au panier
          </button>
        )}
      </div>
    </div>
  );
}
