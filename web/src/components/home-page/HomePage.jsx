import { classnames } from "@/lib/util";
import styles from "./HomePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { BjelowbarImageGallery } from "../image-gallery";
import { Form } from "../form";

export const HomePage = () => {
  return (
    <>
      <section className={styles.banner}>
        <div className={styles.bannerBackdrop}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>PLK Bjelowbar</h1>
            <p className={styles.bannerSubtitle}>
              Posvećeni razvoju snage, discipline i zajedništva
            </p>
            <div className={styles.bannerButtons}>
              <Link
                className={classnames(styles.button, styles.buttonSecondary)}
                href="#contact"
              >
                Učlani se
              </Link>
              <Link
                className={classnames(styles.button, styles.buttonPrimary)}
                href="/record-breakers"
              >
                Record Breakers 2025
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={classnames(styles.section, styles.socialNetworks)}>
        <div className={styles.socialContent}>
          <h1 className={styles.socialTitle}>Ostanite u toku</h1>
          <div className={styles.socialIcons}>
            <Link
              href="https://www.instagram.com/plkbjelowbar/"
              target="_blank"
            >
              <Image
                src="/icons8-instagram.svg"
                alt="Instagram"
                width={50}
                height={50}
              />
            </Link>
            <Link
              href="https://www.facebook.com/share/19ERb1455E/?mibextid=wwXIfr"
              target="_blank"
            >
              <Image
                src="/icons8-facebook.svg"
                alt="Facebook"
                width={50}
                height={50}
              />
            </Link>
            <Link href="https://www.youtube.com/@plkbjelowbar" target="_blank">
              <Image
                src="/icons8-youtube.svg"
                alt="YouTube"
                width={50}
                height={50}
              />
            </Link>
          </div>
        </div>
      </section>
      <section className={classnames(styles.section, styles.about)} id="about">
        <div className={styles.aboutBackdrop}></div>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionTitle}>O nama</h1>
          <p className={styles.sectionText}>
            PLK Bjelowbar osnovan je 2021. godine, u skučenim garažnim uvjetima
            od strane trojice powerlifting entuzijasta. U samo nekoliko godina
            izrasli smo u ozbiljan sportski klub s više od 30 aktivnih članova i
            jedinom specijaliziranom powerlifting teretanom u našoj županiji.
            Naši članovi postavili su mnoge državne rekorde, osvojili medalje u
            različitim kategorijama te zabilježili nastupe na međunarodnim
            prvenstvima. Uz treninge i natjecanja, aktivno surađujemo s lokalnom
            zajednicom kroz edukativne i promotivne sportske aktivnosti.
            <br />
            <br />
            Također smo ponosni na organizaciju natjecanja Bjelovar Record
            Breakers, koje od 2023. godine održavamo u našem gradu i kojim smo
            podigli standard organizacije natjecanja u Hrvatskoj. Bjelovar
            Record Breakers je jedino natjecanje u Hrvatskoj s novčanim
            nagradama za plasman, kao i za oborene rekorde.
            <br />
            <br />
            Ako želiš postati dio naše priče ili se samo informirati o
            powerliftingu, slobodno nam se javi putem kontakt forme ili
            društvenih mreža.
          </p>
          <BjelowbarImageGallery />
        </div>
      </section>
      <section
        className={classnames(styles.section, styles.contact)}
        id="contact"
      >
        <div className={styles.sectionContent}>
          <h1 className={classnames(styles.sectionTitle, styles.noMargin)}>
            Postani član
          </h1>
          <p className={styles.subtitle}>
            Pošalji nam upit i javit ćemo ti se sa detaljima za učlanjenje u
            klub
          </p>
          <Form />
        </div>
      </section>
    </>
  );
};
