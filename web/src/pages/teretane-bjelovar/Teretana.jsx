import { Page, Paragraph, Title } from "@/components";
import styles from "./Teretana.module.css";
import Link from "next/link";

export default function ONama() {
  return (
    <Page title="Teretana" smaller>
      <Title>Specijalizirana powerlifting teretana</Title>
      <Paragraph>
        Bjelowbar powerlifting teretana nalazi se u Dvorani Europskih prvaka u
        Bjelovaru. Teretana je opremljena vrhunskom opremom potrebnom za
        ozbiljan trening snage u sigurnim uvjetima. Osim mnoštva opreme, u
        teretani ćete biti okruženi iskusnim powerlifterima s međunarodnim
        iskustvom, koji vam mogu pomoći svojim iskustvom i primjerom.
      </Paragraph>
      <Paragraph>
        Teretana je otvorena za sve powerliftere i osobe zainteresirane za
        powerlifting trening, bilo da ste iskusni dizač ili tek početnik.
      </Paragraph>
      <Paragraph>
        Za učlanjenje u teretanu ili dolazak na probni trening, javite nam se na
        instagram stranicu kluba ili{" "}
        <Link href="/#contact" className={styles.link}>
          pošaljite mail
        </Link>
        .
      </Paragraph>
      <Paragraph>
        <br />
        Dostupna oprema u teretani:
      </Paragraph>
      <div className={styles.grid}>
        <div>
          <ul>
            <li>4x combo rack</li>
            <li>6x IPF approved powerlifting bar</li>
            <li>2x deadlift platforma</li>
            <li>~1700kg utega, ~1300kg kalibriranih</li>
            <li>
              <span>Specialty šipke</span>
              <ul>
                <li>Strengthshop SSB</li>
                <li>Fat bar</li>
                <li>Swiss bar</li>
                <li>Trap bar</li>
                <li>Triceps bar</li>
                <li>Fat EZ bar</li>
                <li>Cambered bar</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Podesiva klupica</li>
            <li>Bučice 2.5-40 kg</li>
            <li>Cable cross machine</li>
            <li>Lat pulldown/cable row</li>
            <li>Leg extension/leg curl</li>
            <li>Hyperextension</li>
            <li>Rogue Echo bike</li>
          </ul>
        </div>
      </div>
      <br />
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.190343229129!2d16.848731376470404!3d45.90750410375139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47663769a671c6ad%3A0x7f8b22a86c8a1ea6!2sPowerlifting%20klub%20Bjelowbar!5e0!3m2!1shr!2shr!4v1788526546030!5m2!1shr!2shr"
          width="600"
          height="450"
          style={{
            border: 0,
            width: "100%",
            height: "auto",
            aspectRatio: "4/3",
            display: "block",
          }}
          // style="border:0; width:100%; height:auto; aspect-ratio:4/3; display:block;"
          allowFullScreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </Page>
  );
}
