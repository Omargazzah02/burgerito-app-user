import Image from "next/image"
import Link from "next/link"
export default function page () {
    return(
        <section className=" flex flex-col gap-5 justify-center items-center">
               <Image
                      src="/images/confirme.png"
                      width={50}
                      height={50}
                      className=" object-cover "
                    />

                    <p className=" text--white text-3xl font-bold">Votre commande est en cuisson</p>

                    <Link href="/" className=" button--orange"> Retour à l’accueil</Link>




        </section>
    )
}