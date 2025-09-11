import Head from "next/head";
import { Navigation, LandingPage } from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>PLK Bjelowbar</title>
        <meta name="description" content="Powerlifting klub Bjelowbar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation navClassname="rbNav" />
      <LandingPage
        awards={[1000, 700, 500, 200, 100]}
        liveStreamStart="2024-05-30T08:30:00.000Z"
        liveStreamEnd="2024-06-02T00:00:00.000Z"
        showNominations={true}
        showGroups={false}
        subtitle="30.5. - 1.6. 2025."
        pot={7500}
        recordsPot={2500}
        totalPercentageMen={65}
        totalPercentageWomen={60}
        recordsPercentageMen={75}
        recordsPercentageWomen={70}
        recordsEndDate="24.3.2025."
        meetName="Bjelovar Record Breakers 2025"
      />
    </>
  );
}
