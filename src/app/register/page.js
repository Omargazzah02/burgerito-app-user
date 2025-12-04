"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(
        "https://node-eemi.vercel.app/api/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      )

      const data = await res.json()
      if (res.status ==  409 ) {
          throw new Error("Utilisateur déjà existant ")

      }
      else if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription")
      }
      

      setSuccess(
        "Compte créé avec succès ! Redirection vers la page de connexion..."
      )
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="flex flex-col gap-4 items-center px-4 sm:px-6 md:px-0">
      <h1 className="big--title text-center">Je m’inscris</h1>

      <form
        className="flex flex-col gap-6 items-center w-full sm:w-3/4 md:w-1/2 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <input
            className="arounded-gray col-span-1 sm:col-span-2 text-center text-white w-full"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
          <input
            className="arounded-gray text-center text-white w-full"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="arounded-gray text-center text-white w-full"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <button className="button--orange w-full sm:w-1/2 mx-auto">Connexion</button>

        {error && <p className="text--error text-center">{error}</p>}
        {success && <p className="text--success text-center">{success}</p>}
      </form>
    </section>
  )
}
