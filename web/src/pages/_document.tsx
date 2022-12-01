import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head title="Bolão da Copa | 2022">
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>Bolão da Copa | 2022</title>
        <meta
          name="description"
          content="Façam suas apostas, pois o bolão vai começar"
        />

        {/* FONTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
