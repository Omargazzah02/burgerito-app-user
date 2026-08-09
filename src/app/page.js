"use client"
import HomeHeader from "@/components/HomeHeader";
import ProductCard from "@/components/ProductCard";
import { useEffect , useState } from "react";
import { useCart } from "@/context/CartContext";
import Loading from "@/components/Loading";

export default function Home() {
  const [products, setProducts] = useState(null);
  const {addToCart} = useCart()

 useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://node-eemi.vercel.app/api/products");
        const data = await res.json();
        setProducts(data.items);
      } catch (error) {
        console.error("Erreur de chargement des produits :", error);
        setProducts([]); 
      }
    }

    fetchProducts();
  }, []);


  if (!products) {
    return <Loading />;
  }


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
