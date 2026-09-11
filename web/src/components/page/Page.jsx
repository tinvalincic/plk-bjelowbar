import Head from "next/head";
import { Navigation } from "../navigation";
import { PageHeader } from "../page-header";
import styles from "./Page.module.css";
import { Footer } from "../footer";
import classNames from "classnames";

export const Page = ({ title, children, smaller }) => (
  <>
    <Head>
      <title>{title} - PLK Bjelowbar</title>
      <meta name="description" content="Powerlifting klub Bjelowbar" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navigation />
    <PageHeader title={title} />
    <div className={styles.content}>
      <div
        className={classNames(styles.container, { [styles.smaller]: smaller })}
      >
        {children}
      </div>
    </div>
    <Footer />
  </>
);
