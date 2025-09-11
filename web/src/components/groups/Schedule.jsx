import { Fragment, useState } from "react";
import styles from "../records-table/RecordsTable.module.css";
import { classnames } from "@/lib/util";
import { schedule } from "@/lib/groups";

const maleCategories = [
  "59",
  "66",
  "74",
  "83",
  "93",
  "105",
  "120",
  "120+",
  "120+ EQ",
];
const femaleCategories = ["47", "52", "57", "63", "69", "76", "84", "84+"];

export const Schedule = ({ genderTables, benchOnly }) => {
  const dataSets = {
    powerlifting: genderTables,
    benchOnly,
  };

  const getCompetitors = (group) => {
    if (group.name.startsWith("PRIME TIME")) {
      return Object.values(dataSets.powerlifting[group.gender].OPEN).flatMap(
        (competitors) => competitors.filter((c) => c.isPrimeTime)
      );
    }
    const dataSet = dataSets[group.discipline];
    let competitors = (group.weight ?? [])
      .flatMap((w, i) => {
        const g = maleCategories.includes(w) ? "male" : "female";
        return dataSet[g][group.age[i]]?.[w];
      })
      .filter(Boolean);
    if (group.discipline !== "benchOnly") {
      competitors = competitors.filter((c) => !c.isPrimeTime);
    }

    if (group.take) {
      competitors = competitors.slice(0, group.take);
    }
    if (group.skip) {
      competitors = competitors.slice(group.skip);
    }
    if (group.discipline !== "benchOnly") {
      competitors = competitors.filter((c) => !c.isPrimeTime);
    }
    return competitors;
  };

  return (
    <div className={styles.schedule}>
      {Object.entries(schedule).map(([day, timeSchedule]) => (
        <Fragment key={day}>
          <h3>{day} - Grupe i satnica</h3>
          {Object.entries(timeSchedule).map(([time, groups]) => (
            <div key={day + time} className={styles.timeGroup}>
              {groups.map((group) => {
                const competitors = getCompetitors(group);
                return (
                  <Group
                    key={
                      group.name +
                      group.gender +
                      group.age?.[0] +
                      group.weight?.[0]
                    }
                    group={group}
                    competitors={competitors}
                  />
                );
              })}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

const Group = ({ group, competitors }) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  const grupa = group.name.startsWith("PRIME TIME") ? "" : "GRUPA ";
  const benchOnly = group.discipline === "benchOnly" ? " - BENCH PRESS" : "";
  const isFemale = group.weight?.some((w) => femaleCategories.includes(w))
    ? "Žene"
    : "";
  const isMale = group.weight?.some((w) => maleCategories.includes(w))
    ? "Muškarci"
    : "";
  let gender = [isFemale, isMale].filter((v) => v).join(" / ");
  if (!gender) {
    gender = group.name === "PRIME TIME A" ? "Žene" : "Muškarci";
  }
  return (
    <div className={styles.group}>
      <h4>
        {grupa}
        {group.name} - {gender}
        {benchOnly}
      </h4>
      <div className={styles.attributes}>
        <div>Provjera opreme i vaganje</div>
        <div>{group.scale}</div>
        <div>Natjecanje:</div>
        <div>{group.competition}</div>
        <div>Podjela medalja i pehara:</div>
        <div>{group.ceremony}</div>
        {!!group.age && (
          <>
            <div>Kategorije</div>
            <div className={styles.groupCategories}>
              {group.age.map((a, i) => `${a} ${group.weight[i]}`).join(", ")}
            </div>
          </>
        )}
      </div>
      <button
        className={classnames(
          styles.showCompetitors,
          showCompetitors ? styles.active : ""
        )}
        onClick={() => setShowCompetitors(!showCompetitors)}
      >
        {showCompetitors ? "Sakrij" : "Prikaži"} natjecatelje
      </button>
      {showCompetitors && (
        <div className={styles.competitors}>
          {competitors.map((competitor, i) => (
            <div
              className={styles.competitor}
              key={competitor.name + competitor.lastName}
            >
              {i + 1}. {competitor.name} {competitor.lastName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
