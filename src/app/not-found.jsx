import Link from "next/link";

export default function NotFound () {
    return (
        <section className=" flex flex-col items-center gap-10  justify-center ">
            <h1 className="big--title">Page 404</h1>
           <Link href="/" className="button--orange"> Retour à l’accueil</Link>


        </section>
    )
}