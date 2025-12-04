"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products , setProducts] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://node-eemi.vercel.app/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

     async function fetchProducts() {
      const res = await fetch(`https://node-eemi.vercel.app/api/products`);
      const data = await res.json();
      const lastFour = data.items.slice(-4);
      setProducts(lastFour);
    }

    fetchProduct();
    fetchProducts();
  }, [id]);

  if (!product) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <section className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
           <Link href="/" className="text-[var(--gray-light-color)] flex  gap-2 items-center" >
        
          <Image
      src={"/images/lets-icons_back.png"}
      width={30}
      height={30}
      ></Image>
        Retour à l’accueil

      </Link>

      <h1 className="big--title">{product.name}</h1>

      <div className="flex flex-col md:flex-row gap-7">
        {/* Image produit */}
        <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-80 relative rounded-2xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Description et actions */}
        <div className="flex flex-col justify-between py-7 w-full md:w-1/2 lg:w-3/5">
          <h2 className="text--white text-2xl font-bold mb-2">Description</h2>
          <p className="text-gray-500 mb-4">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="p-2 button--white text-center sm:text-left">€{product.price}</div>
            <button
              onClick={() => addToCart(product)}
              className="button--orange w-full sm:w-auto"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-4"
      
      >
        <p className="text--white text-2xl">Nos autres propositions</p>

        <div className=" flex gap-4 flex-wrap">
          {products.map((item , index)=> (<ProductCard  key={index} item={item} addToCart={() => addToCart(item)}/>))}
        </div>
      </div>
    </section>
  );
}
