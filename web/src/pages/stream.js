import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { Sponsors } from "@/components/Sponsors";

export default function Stream() {
  const initializedTwitch = useRef(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (initializedTwitch.current) return;
    if (!window.Twitch) {
      setTimeout(() => {
        setRefresh(!refresh);
      }, 100);
      return;
    }
    new Twitch.Embed("twitch-embed", {
      width: 854,
      height: 480,
      channel: "platforma_hr",
      allowfullscreen: true,
    });
    initializedTwitch.current = true;
  }, [refresh]);

  return (
    <>
      <Head>
        <title>1. Bjelovar Record Breakers - Live Stream</title>
        <meta
          name="description"
          content="1. Bjelovar Record Breakers - Live Stream"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section>
          <div id="twitch-embed"></div>
        </section>
        <section className={styles.section}>
          <div className="container">
            <h1 className={styles.sectionTitle}>Sponzori</h1>
            <Sponsors />
            <h1
              className={styles.sectionTitle}
              style={{
                marginTop: "100px",
              }}
            >
              U organizaciji
            </h1>
            <Sponsors group={1} />
          </div>
        </section>
      </main>
    </>
  );
}
