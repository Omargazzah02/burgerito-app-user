"use client"
import HomeHeader from "@/components/HomeHeader";
import ProductCard from "@/components/ProductCard";
import { useEffect , useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [products , setProducts ] = useState([]);
  const {addToCart} = useCart()

  useEffect(()=> {
    async function fetchProducts () {
      const res = await fetch("https://node-eemi.vercel.app/api/products");
      const data = await res.json();
      setProducts(data.items);
    }

    fetchProducts();
  },[]);

  return (
    <div className="flex flex-col gap-8">
      {/* HomeHeader uniquement visible sur desktop */}
      <div className="hidden md:block">
        <HomeHeader />
      </div>

      {/* Liste des produits */}
      <div className="flex flex-wrap gap-6 justify-center"> 
        {products.map((item , index) => (
          <ProductCard key={index} item={item} addToCart={() => addToCart(item)} />
        ))}
      </div>
    </div>
  );
}
