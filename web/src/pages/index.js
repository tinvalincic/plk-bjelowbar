import Head from "next/head";
import { Navigation, HomePage } from "@/components";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>PLK Bjelowbar</title>
        <meta name="description" content="Powerlifting klub Bjelowbar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <HomePage />
      <Footer />
    </>
  );
}
