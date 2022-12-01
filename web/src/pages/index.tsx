import { FormEvent, useRef } from "react";
import { toast } from "react-hot-toast";

import Image from "next/image";

import playersImg from "../assets/images/players.png";
import logoImg from "../assets/images/logo.svg";
import usersAvatarImg from "../assets/images/users-avatar.png";
import iconCheckImg from "../assets/icons/check.svg";
import { api } from "../lib/axios";

type HomeProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
};

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputPoolTitleRef = useRef<HTMLInputElement>(null);

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("pools", {
        title: inputPoolTitleRef.current?.value,
      });
      const { code } = response.data; 
      await navigator.clipboard.writeText(code);

      toast("🎉 Bolão criado com sucesso! \n\nO código do bolão foi copiado para a área de tranferência", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 7000
      });
      formRef.current?.reset();
    } catch {
      toast.error("Error ao criar o bolão. Tente novamente mais tarde!");
    }
  }

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
            <span className="text-green-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form ref={formRef} onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual é o nome do seu bolão?"
            ref={inputPoolTitleRef}
          />
          <button className="bg-yellow-500 text-gray-900 font-sm font-bold px-6 py-4 rounded hover:bg-yellow-700 cursor-pointer disabled:cursor-not-allowed">
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
              <span className="font-bold text-2xl">+{guessCount}</span>
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
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
