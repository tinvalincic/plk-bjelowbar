import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.container}>
      <div>
        <span>© {new Date().getFullYear()} PLK Bjelowbar</span>
      </div>
      <div className={styles.socialIcons}>
        <Link href="https://www.instagram.com/plkbjelowbar/" target="_blank">
          <Image
            src="/instagram-gray.svg"
            alt="Instagram"
            width={30}
            height={30}
          />
        </Link>
        <Link
          href="https://www.facebook.com/share/19ERb1455E/?mibextid=wwXIfr"
          target="_blank"
        >
          <Image
            src="/facebook-gray.svg"
            alt="Facebook"
            width={30}
            height={30}
          />
        </Link>
        <Link href="https://www.youtube.com/@plkbjelowbar" target="_blank">
          <Image src="/youtube-gray.svg" alt="YouTube" width={30} height={30} />
        </Link>
      </div>
    </div>
  </div>
);
