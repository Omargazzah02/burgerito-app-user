import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;


  // 🔹 Si l'utilisateur est connecté et essaie d'accéder à /login ou /register → redirection vers /
  if (token && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔹 Si l'utilisateur n'est pas connecté et essaie d'accéder à /me ou /cart → redirection vers /login
  if (!token && ["/me", "/cart" , "/confirmation"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔹 Tout le reste → laisser passer
  return NextResponse.next();
}

// On exclut les routes internes à NextAuth et les fichiers statiques
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth/).*)",
  ],
};
