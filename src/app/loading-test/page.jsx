async function getData() {
  // Simule un délai de 3 secondes
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { message: "Hello depuis la page !" };
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="big--title">{data.message}</h1>
    </main>
  );
}
