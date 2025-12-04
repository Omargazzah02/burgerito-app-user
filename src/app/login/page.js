"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (res.error) {
      setError(res.error)
    } else window.location.href = "/" // redirige vers l'accueil
  }

  return (
    <section className="flex flex-col gap-4 items-center px-4 sm:px-6 md:px-0">
      <h1 className="big--title text-center">Je me connecte</h1>

      <form
        className="flex flex-col gap-6 w-full sm:w-3/4 md:w-1/2 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
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

        <button className="button--orange w-full sm:w-1/2 mx-auto">Confirmer</button>
        {error && <p className="text--error text-center">{error}</p>}
      </form>
    </section>
  )
}
