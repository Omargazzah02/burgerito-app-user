export default function HomeHeader () {
    return (
    <div className=" h-80 relative p-5  flex   items-end">

        <img src="/images/header-home.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-2xl"/>
        
    <div className="absolute z-10 ">
                <p className="text--white -mb-8 ">Lorem ipsum dolor sit amet consectetur. Velit nisl tempus mattis sit mauris <br/> nunc adipiscing sit massa. Maecenas vel facilisis arcu turpis nunc.</p>

                <h1 className="big--title--orange -mb-15 ">BURGERITO</h1>

                
</div>        

    </div>)
}