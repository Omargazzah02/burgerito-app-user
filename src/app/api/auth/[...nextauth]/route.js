import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "La variable d'environnement NEXTAUTH_SECRET n'est pas définie. Veuillez la configurer avant de démarrer l'application."
  );
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
  try {
    const res = await fetch(`https://node-eemi.vercel.app/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error("Email ou mot de passe incorrect")
      } else {
        // Erreur serveur ou autre → message générique
        console.error("Erreur serveur login:", await res.text())
        throw new Error("Une erreur est survenue, réessayez plus tard")
      }
    }

    const data = await res.json()

    if (!data.token) {
      throw new Error("Email ou mot de passe incorrect")
    }

    return { ...data.user, token: data.token }

  } catch (err) {
    // Si l’erreur vient du fetch (ex: réseau)
    if (err.message === "Email ou mot de passe incorrect") throw err
    console.error("Erreur login:", err)
    throw new Error("Une erreur est survenue, réessayez plus tard")
  }
}
,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: { signIn: "/login" }, // page de connexion personnalisée
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
