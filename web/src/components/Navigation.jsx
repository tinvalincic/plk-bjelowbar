import styles from "./Navigation.module.css";
import Link from "next/link";
import { classnames } from "@/lib/util";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Početna" },
  { href: "#about", label: "O nama" },
  // { href: "/", label: "Postani član" },
  { href: "#contact", label: "Kontakt" },
  // { href: "/", label: "Dokumenti" },
];

export const Navigation = ({ navClassname = "" }) => {
  const [mobileNavClasses, setMobileNavClasses] = useState([styles.mobileNav]);

  const toggleMobileNav = () => {
    if (mobileNavClasses.includes(styles.active)) {
      setMobileNavClasses([styles.mobileNav]);
      return;
    }
    setMobileNavClasses([...mobileNavClasses, styles.active]);
  };

  return (
    <>
      <nav className={classnames(styles.navigation, styles[navClassname])}>
        <Link className={styles.logo} href="/">
          <img src="/bjelowbar.png" alt="PLK Bjelowbar" />
        </Link>
        <div className={styles.links}>
          {links.map(({ href, label }) => (
            <Link key={label} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>
        <Link href="/record-breakers" className={styles.menuButton}>
          RB 2025
        </Link>
        <div className={styles.hamburgerWrap}>
          <div className={styles.hamburger} onClick={toggleMobileNav}>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
        </div>
      </nav>
      <div className={classnames(...mobileNavClasses)}>
        <div className={styles.shadow}></div>
        <ul className={classnames(styles.navItems, styles.mobileNavItems)}>
          <li>
            <div
              className={classnames(styles.contentTop, styles.containerFlex)}
            >
              <Link className={styles.topLogo} href="/">
                <Image
                  src="/bjelowbar.png"
                  alt="PLK Bjelowbar logo"
                  width={70}
                  height={47}
                />
              </Link>
              <button className={styles.closeButton} onClick={toggleMobileNav}>
                <Image
                  src="/close-icon.png"
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </li>
          {links.map(({ href, label }) => (
            <li className={styles.navItem} key={href}>
              <Link href={`/${href}`} onClick={toggleMobileNav}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/record-breakers"
              className={classnames(styles.menuButton, styles.mobileMenuButton)}
            >
              Record Breakers 2025
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
