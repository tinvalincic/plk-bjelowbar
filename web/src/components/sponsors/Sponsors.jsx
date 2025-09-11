import { classnames } from "@/lib/util";
import styles from "./Sponsors.module.css";

const sponsors = [
  [
    // ["eluir.png", "Eluir"],
    ["supersport_logo.svg", "SuperSport"],
    // ["dynema-power.png", "Dynema Power"],
    ["4rce.png", "4RCE"],
    // ["biteme.png", "BiteMe Nutrition"],
    // ["nutricionizam.hr.png", "Nutricionizam.hr"],
    // ["treneraj.png", "Treneraj"],
    ["buildup-digital.svg", "Buildup Digital"],
    // ["informal-systems.svg", "Informal Systems"],
  ],
  [
    ["bjelowbar.png", "Bjelowbar"],
    ["hpls.png", "HPLS"],
    ["ipf.png", "IPF"],
    ["epf.png", "EPF"],
  ],
];

export const Sponsors = ({ group = 0 }) => (
  <div
    className={classnames(
      styles.sponsors,
      group === 1 ? styles.organizers : ""
    )}
  >
    {sponsors[group].map(([logo, name]) => (
      <div key={name} className={styles.sponsor}>
        <img src={`/${logo}`} alt={name} />
      </div>
    ))}
  </div>
);
