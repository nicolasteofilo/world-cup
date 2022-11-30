import Head from "next/head";

type HomeProps = {
  count: number
}

export default function Home({ count }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Bolão da Copa | 2022</title>
        <meta
          name="description"
          content="Façam suas apostas, pois o bolão vai começar"
        />
      </Head>

      <h1>Bolão da Copa</h1>
      <p>Número de bolões: {count}</p>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count"); 
  const data = await response.json();

  console.log(data)

  return {
    props: {
      count: data.count
    }
  };
};
