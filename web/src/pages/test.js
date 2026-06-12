import Head from "next/head";

export default function Test() {
  return (
    <>
      <Head>
        <title>PLK Bjelowbar</title>
        <meta name="description" content="Powerlifting klub Bjelowbar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          width: 300,
          height: 600,
        }}
      >
        <iframe
          src="https://www.supersport.hr/widget/hnl_2024_bb_300x600"
          width={300}
          height={600}
        ></iframe>
      </div>
    </>
  );
}
