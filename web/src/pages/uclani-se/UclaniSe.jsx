import styles from "./UclaniSe.module.css";
import { Page, Paragraph, Title } from "@/components";

const DocsLink = ({ href, children }) => (
  <a
    className="page-link"
    href={"/docs/" + href}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);

export default function UclaniSe() {
  return (
    <Page title="Postani član">
      <Title>Učlani se u PLK Bjelowbar</Title>
      <Paragraph>
        Hvala ti što si se odlučio učlaniti u PLK Bjelowbar. Na ovoj stranici
        ćeš saznati što trebaš napraviti kako bi postao član.
      </Paragraph>
      <Title className="subtitle">Uvjeti za učlanjenje</Title>
      <Paragraph>
        Prije učlanjenja u klub potrebno je odraditi trening u klubu. U slučaju
        da nisi iz Bjelovara, dogovor možemo odraditi i preko instagrama ili
        whatsappa, gdje ćeš nam se predstaviti, poslati svoje video snimke
        izvođenja vježbi i reći koliko si upoznat/a s pravilima.
      </Paragraph>
      <Paragraph>
        Jedini uvjet za učlanjenje je da ne koristiš, niti si koristio/la
        nedopuštena sredstva od strane WADA-e.
      </Paragraph>
      <Paragraph>
        Za upis u klub plaća se jednokratna upisnina od 10€, a zauzvrat dobivate
        besplatnu PLK Bjelowbar majicu. Godišnja članarina iznosi 15€ te ju je
        potrebno uplatiti prije nastupa na prvom natjecanju u godini. Oboje se
        uplaćuje na račun kluba: HR7524020061101066727
      </Paragraph>
      <Title className="subtitle">Dokumenti</Title>
      <Paragraph>
        Kako bismo te registrirali u klub moraš ispuniti pristupnicu, koju možeš
        preuzeti <DocsLink href="pristupnica.pdf">ovdje</DocsLink>.
      </Paragraph>
      <Paragraph>
        Osim registracije u klub, članove koji se žele natjecati moramo
        registrirati u Hrvatski powerlifting savez. Za registraciju u savez
        potrebno je dostaviti:
      </Paragraph>
      <ul>
        <li>
          <DocsLink href="izjava.doc">Izjava natjecatelja</DocsLink>
        </li>
        <li>
          <DocsLink href="registracija-hpls.doc">
            Zahtjev za registracijom
          </DocsLink>
        </li>
        <li>Kopija domovnice (može i sa egrađani)</li>
        <li>Fotografija (format osobne iskaznice, može u digitalnom obliku)</li>
      </ul>
      <Paragraph>
        Sve dokumente možeš popuniti digitalno. Prikupljene dokumente dostavi na
        info@plk-bjelowbar.hr
      </Paragraph>
      <Title>Informacije o natjecanjima</Title>
      <Paragraph>
        Nakon uspješnog učlanjenja u klub i savez možeš se početi natjecati.
        Obavijesti o budućim natjecanjima pristizat će ti na mail. Za svako
        natjecanje moraš imati valjani liječnički pregled koji ćeš dostaviti na
        mail prije natjecanja. Također, moraš uplatiti kotizaciju za natjecanje
        na račun kluba, koja iznosi 40€.
      </Paragraph>
      <Title className="subtitle">Liječnički pregled</Title>
      <Paragraph>
        Kako bi se mogao natjecati moraš odraditi liječnički pregled. Liječnički
        pregled je važeć 6 mjeseci od datuma pregleda. Pregled možeš odraditi u
        Feniksu u Bjelovaru, te ju dostaviti na već navedeni mail
        info@plk-bjelowbar.hr.
        <br />
        Važno je da na liječničkoj potvrdi piše da je osoba sposobna za sport
        powerlifting.
      </Paragraph>
      <Title className="subtitle">Oprema</Title>
      <Paragraph>
        Od obavezne opreme moraš imati tenisice, duge čarape za mrtvo dizanje,
        singlet i pamučnu kratku majicu (ne smije biti oversized).
      </Paragraph>
      <Paragraph>
        Od neobavezne opreme smiješ koristiti: pojas, knee sleeves, wrist wraps.
      </Paragraph>
      <Title className="subtitle">Komande</Title>
      <Paragraph>
        Svako dizanje ima sudačke komande koje moraš pratiti, ukoliko ih ne
        pratiš pokušaj se smatra neuspješnim.
      </Paragraph>
      <Paragraph>Na čučnju postoje dvije komande:</Paragraph>
      <ul>
        <li>
          Squat - Nakon što ishodaš šipku i namjestiš se u početnu poziciju,
          sudac spušta ruku i izgovara squat, što signalizira dopuštenje za
          početak čučnja. Nakon toga možeš uzeti udah i odraditi pokušaj. Nakon
          signala nema žurbe, možeš si uzeti vremena koliko treba.
        </li>
        <li>
          Rack - Nakon uspješno izvršenog pokušaja moraš zauzeti zaključanu
          poziciju, jednaku početnoj. Kada se sudac uvjeri da je pozicija
          stabilna, dobit ćeš rack komandu, što bi značilo da možeš vratiti
          šipku na stalke
        </li>
      </ul>
      <Paragraph>Na benchu postoje tri komande:</Paragraph>
      <ul>
        <li>
          Start - Sudac daje start komandu kada ti se šipka nalazi u rukama,
          pete su na podu a stražnjica na klupici. Laktovi također moraju biti
          zaključani. Nakon dobivene start komande možeš započeti spuštati šipku
          na prsa.
        </li>
        <li>
          Press - Sudac daje press komandu kada procjeni da je šipka mirna na
          prsima. Ne postoji konkretno vrijeme koliko šipka mora biti na prsima,
          to može biti pola sekunde ako kontroliraš spuštanje, ili 3-4 sekunde
          ako šipka skače po prsima. Na press možeš krenuti gurati šipku
        </li>
        <li>
          Rack - Nakon uspješno podignutog pokušaja moraš zadržati šipku prije
          nego kreneš vraćati na stalke. Kada čuješ rack, možeš vratiti šipku
        </li>
      </ul>
      <Paragraph>
        Na mrtvom dizanju je samo jedna komanda - down. Nakon podignutog
        pokušaja, sudac izgovara down i spušta ruku, što znači da i ti možeš
        spustiti šipku. Šipku moraš kontrolirati do dolje, ne smije ti ispasti
        iz ruke.
      </Paragraph>
    </Page>
  );
}
