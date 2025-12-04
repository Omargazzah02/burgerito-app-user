"use client"

import SessionProvider from "./SessionProvider"
import { CartProvider } from "@/context/CartContext"

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  )
}
