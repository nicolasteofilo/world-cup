import Head from "next/head";

type HomeProps = {
  count: number
}

export default function Home({ count }: HomeProps) {
  return (
    <div>
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
