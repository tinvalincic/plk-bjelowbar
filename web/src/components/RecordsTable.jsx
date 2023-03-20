import { useState } from "react";
import styles from "./RecordsTable.module.css";

function round(num) {
  return Math.ceil(num / 0.5) * 0.5;
}

function getQualifyingRecord(wr, nr, qualifyingPercentage, addHalfKg = true) {
  const percentageOfWR = round(wr * qualifyingPercentage);
  return percentageOfWR > nr ? percentageOfWR : nr + (addHalfKg ? 0.5 : 0);
}

export const RecordsTable = ({
  records,
  qualifyingPercentage,
  qualifyingTotalPercentage,
}) => {
  const [activeRow, setActiveRow] = useState(null);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Kat</th>
          <th>Disc</th>
          <th>NR</th>
          <th>WR</th>
          <th>%WR</th>
          <th>QR</th>
          <th>QT</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(records).flatMap(([cat, disciplines], i) =>
          Object.entries(disciplines).map(([discipline, [nr, wr]]) => {
            const percentage = ((nr / wr) * 100).toFixed(2);
            const qr = getQualifyingRecord(wr, nr, qualifyingPercentage);
            const [, wrTotal] = disciplines.Total;
            const qt =
              discipline === "Total"
                ? qr
                : round(wrTotal * qualifyingTotalPercentage);
            return (
              <tr
                key={cat + discipline}
                onClick={() => setActiveRow(cat + discipline)}
                className={activeRow === cat + discipline ? styles.active : ""}
              >
                <td className={i % 2 ? styles.yellow : ""}>{cat}</td>
                <td>{discipline}</td>
                <td>{nr}</td>
                <td>{wr}</td>
                <td
                  className={
                    percentage < qualifyingPercentage * 100 ? styles.red : ""
                  }
                >
                  {percentage}%
                </td>
                <td className={styles.yellow}>{qr}</td>
                <td className={styles.yellow}>{qt}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
