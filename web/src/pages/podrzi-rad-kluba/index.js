import { tShirts } from "@/lib/t-shirts";
import styles from "./PodrziRadKluba.module.css";
import { Page, Paragraph } from "@/components";

export default function Merch() {
  return (
    <Page title="Podrži rad kluba">
      <h1 className="title">Podrži razvoj PLK Bjelowbar</h1>
      <Paragraph>
        Ako ti se sviđa naš rad i želiš nam pomoći u osiguravanju kvalitetnog
        rada kluba, pozivamo te da nas podržiš donacijom.
      </Paragraph>
      <Paragraph>
        Kao znak zahvalnosti, svatko tko podrži klub s donacijom može besplatno
        odabrati jednu od naših promo majica, koju ćemo ti s veseljem poslati.
      </Paragraph>
      <Paragraph>
        Sve što trebaš napraviti jest poslati nam potvrdu o uplati s
        informacijom koju majice ili majice želite, te ćemo vam iste poslati.
        Ukoliko se nalazite na području Bjelovara ili Zagreba, moguće je osobno
        preuzimanje!
      </Paragraph>
      <Paragraph>
        Za informacije o veličinama, dogovor o dostavi ili preuzimanju slobodno
        se javite na naš instagram @plkbjelowbar, ili nam pošaljite mail na
        info@plk-bjelowbar.hr.
      </Paragraph>
      <Paragraph>
        <strong>Podaci za plaćanje:</strong>
        <br />
        Naziv: PLK Bjelowbar
        <br />
        Adresa: Grgura Ninskog 3, 43 000 Bjelovar
        <br />
        OIB: 19494684248
        <br />
        IBAN: HR7524020061101066727
        <br />
        Opis plaćanja: donacija
      </Paragraph>
      <h1 className="title">Kuda idu donacije?</h1>
      <Paragraph>
        Vaše donacije koristimo za održavanje rada klupske teretane, poboljšanje
        uvjeta treniranja, nabavu nove opreme, pružanje financijske potpore
        našim natjecateljima kroz financiranje međunarodnih natjecanja, ali i
        jačanje zajednice kroz organizaciju raznih projekata i klupskih
        druženja.
      </Paragraph>
      <div className={styles.tShirtGrid}>
        {tShirts.map((tShirt, i) => (
          <div key={i} className={styles.tShirtCard}>
            <img
              src={"/t-shirts/" + tShirt.img}
              alt={tShirt.name}
              className={styles.tShirtImage}
            />
            <div className={styles.tShirtName}>{tShirt.name}</div>
            <div className={styles.tShirtPrice}>{tShirt.price} EUR</div>
          </div>
        ))}
      </div>
    </Page>
  );
}
