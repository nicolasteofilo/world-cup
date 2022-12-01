import Image from "next/image";

import playersImg from "../assets/images/players.png";
import logoImg from "../assets/images/logo.svg";
import usersAvatarImg from "../assets/images/users-avatar.png";
import iconCheckImg from "../assets/icons/check.svg";

type HomeProps = {
  poolCount: number;
};

export default function Home({ poolCount }: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center px-4">
      <main>
        <Image src={logoImg} alt="Logo" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarImg} alt="" quality={100} />
          <strong className="text-gray-100 text-xl">
            <span className="text-green-500">+12.592</span> pessoas já estão
            usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual é o nome do seu bolão?"
          />
          <button className="bg-yellow-500 text-gray-900 font-sm font-bold px-6 py-4 rounded hover:bg-yellow-700">
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 text-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Ícone de check" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-[1.5px] h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Ícone de check" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.000</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <div className="flex justify-between h-screen items-end align-bottom aspect-w-16 aspect-h-9">
        <Image
          src={playersImg}
          alt="Imagem do jogador Lionel Messi"
          className="w-full"
          quality={100}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  console.log(data);

  return {
    props: {
      poolCount: data.count,
    },
  };
};
