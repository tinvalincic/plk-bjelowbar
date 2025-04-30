import Head from "next/head";
import { LandingPage } from "@/components/MeetLandingPage";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";

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
    </>
  );
}
