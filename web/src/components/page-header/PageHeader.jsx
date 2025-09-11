import Link from "next/link";
import styles from "./PageHeader.module.css";

export const PageHeader = ({ title }) => (
  <div className={styles.header}>
    <div className={styles.overlay}></div>
    <div className={styles.overlayYellow}></div>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.bread}>
      <Link href="/">Početna</Link> /{" "}
      <span className={styles.activeLink}>{title}</span>
    </div>
  </div>
);
