

import ChatSupport from "@/components/ChatSupport";
import "./globals.css";
import Nav from "@/components/Nav";
import ClientProviders from "@/providers/ClientProviders";


export const metadata = {
  title: "Burgerito",
  description: "Application de commande",
}


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body     className=" p-2 px-14 flex flex-col gap-4">

        <ClientProviders>
                <Nav></Nav>

        {children}

        <ChatSupport/>

        
        
      </ClientProviders>

      </body>
    </html>
  );
}
