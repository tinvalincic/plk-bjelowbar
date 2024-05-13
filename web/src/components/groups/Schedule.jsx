import { Fragment, useState } from "react";
import styles from "../RecordsTable.module.css";
import { classnames } from "@/lib/util";
import { schedule } from "@/lib/groups";

const genders = {
  female: "Žene",
  male: "Muškarci",
};

export const Schedule = ({ genderTables, benchOnly }) => {
  const dataSets = {
    powerlifting: genderTables,
    benchOnly,
  };

  const getCompetitors = (group) => {
    if (group.name === "PRIME TIME") {
      return Object.values(dataSets.powerlifting[group.gender].OPEN).flatMap(
        (competitors) => competitors.filter((c) => c.isPrimeTime)
      );
    }
    const dataSet = dataSets[group.discipline];
    let competitors = (group.weight ?? [])
      .flatMap((w, i) => {
        return dataSet[group.gender][group.age[i]]?.[w];
      })
      .filter(Boolean);
    if (group.take) {
      competitors = competitors.slice(0, group.take);
    }
    if (group.skip) {
      competitors = competitors.slice(group.skip);
    }
    competitors = competitors.filter((c) => !c.isPrimeTime);
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
  const grupa = group.name === "PRIME TIME" ? "" : "GRUPA ";
  return (
    <div>
      <h4>
        {grupa}
        {group.name} - {genders[group.gender]}
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
              {i + 1}. {competitor.name.toLowerCase()}{" "}
              {competitor.lastName.toLowerCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
