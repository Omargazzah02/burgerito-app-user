"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import MiniCart from "./MiniCart";

export default function Nav() {
  const { data: session } = useSession();
  const { cartItems, isMiniCartOpen, setIsMiniCartOpen } = useCart();
  const totalItems = cartItems.length;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMiniCart = () => {
    setIsMiniCartOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black py-4 px-4 md:px-10 shadow-md flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--orange-color)] font-bold text-2xl hover:opacity-90 transition"
        >
          BURGERITO
        </Link>

        {/* ---- Version Bureau ---- */}
        <div className="hidden md:flex gap-4 items-center">
          {session ? (
            <>
              <button
                className="button--red hover:opacity-90 transition"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Me déconnecter
              </button>
              <Link
                href="/me"
                className="button--orange hover:opacity-90 transition"
              >
                Mon profil
              </Link>

              {/* 🛒 Panier (desktop) */}
              <div className="relative">
                <button
                  onClick={toggleMiniCart}
                  className="relative text-2xl hover:opacity-80 transition"
                >
                  🛒
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--orange-color)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* MiniCart Desktop */}
                {isMiniCartOpen && (
                  <div className="absolute right-0 top-10">
                    <MiniCart />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="button--gray hover:opacity-90 transition"
              >
                Inscription
              </Link>
              <Link
                href="/login"
                className="button--orange hover:opacity-90 transition"
              >
                Connexion
              </Link>
            </>
          )}
        </div>

        {/* ---- Bouton Mobile ---- */}
        <div className="flex items-center gap-4 md:hidden">
          {/* 🛒 Panier (mobile) */}
          {session && (
            <div className="relative">
              <button
                onClick={toggleMiniCart}
                className="relative text-2xl hover:opacity-80 transition"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-3 bg-[var(--orange-color)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* ☰ Bouton menu mobile */}
          <button
            className="text-2xl text-white"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        {/* ---- Menu Mobile ---- */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white text-black shadow-lg rounded-lg flex flex-col gap-3 p-4 z-[9999] w-56 md:hidden">
            {session ? (
              <>
                <button
                  className="text-left text-red-600 font-semibold"
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                    setIsMenuOpen(false);
                  }}
                >
                  Me déconnecter
                </button>

                <Link
                  href="/me"
                  className="text-[var(--orange-color)] font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="button--gray text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
                <Link
                  href="/login"
                  className="button--orange text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ---- MiniCart Mobile ---- */}
      {isMiniCartOpen && (
        <div className="fixed top-20 right-4 z-[9999] w-80 md:hidden">
          <MiniCart />
        </div>
      )}

      <div className="pt-24" />
    </>
  );
}
