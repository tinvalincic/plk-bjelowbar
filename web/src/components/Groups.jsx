import { Fragment, useState } from "react";
import styles from "./RecordsTable.module.css";
import { classnames } from "@/lib/util";
import { getGroup, schedule } from "@/lib/groups";

const genders = {
  female: "Žene",
  male: "Muškarci",
};

export const Groups = ({ genderTables }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [activeAge, setActiveAge] = useState("OPEN");
  const [activeGender, setActiveGender] = useState("male");
  const [search, setSearch] = useState("");
  const categories = genderTables[activeGender];

  const onGenderClick = (gender) => {
    setActiveGender(gender);
    setActiveAge("OPEN");
    setActiveRow(null);
  };

  return (
    <>
      <button
        className={classnames(
          styles.genderButton,
          activeGender === "male" ? styles.active : ""
        )}
        onClick={() => onGenderClick("male")}
      >
        Muškarci
      </button>
      <button
        className={classnames(
          styles.genderButton,
          activeGender === "female" ? styles.active : ""
        )}
        onClick={() => onGenderClick("female")}
      >
        Žene
      </button>
      <div className={styles.ageTabs}>
        {Object.keys(categories).map((age) => (
          <button
            key={age}
            className={classnames(
              styles.ageTab,
              activeAge === age ? styles.active : "",
              !search ? "" : styles.disabled
            )}
            onClick={() => !search && setActiveAge(age)}
          >
            {age}
          </button>
        ))}
      </div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pretraži"
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={`/${!search ? "search" : "close"}-icon.png`}
          className={styles.searchIcon}
          alt="search"
          onClick={() => !!search && setSearch("")}
        />
      </div>
      <table className={classnames(styles.table, styles.tableNominations)}>
        <thead>
          <tr>
            <th>#</th>
            <th>Natjecatelj{activeGender === "female" ? "ica" : ""}</th>
            <th>God.</th>
            <th>Klub</th>
            <th>Total</th>
            <th>Dan</th>
            <th>Grupa</th>
            <th>Vaga</th>
            <th>Natjecanje</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(categories).flatMap(([age, weightCategories]) => {
            if (!search && activeAge !== age) return [null];
            return Object.entries(weightCategories).map(
              ([cat, competitors]) => {
                if (search) {
                  competitors = competitors.filter((competitor) => {
                    const name = `${competitor.name} ${competitor.lastName}`;
                    return name.toLowerCase().includes(search.toLowerCase());
                  });
                }
                if (!competitors.length) return null;
                const tmpGroup = getGroup(activeGender, age, cat);
                return (
                  <Fragment key={cat + age}>
                    <tr>
                      <td colSpan={9} className={styles.yellow}>
                        <strong>
                          {cat}
                          {search ? ` - ${age}` : ""}
                        </strong>
                      </td>
                    </tr>
                    {competitors.map((competitor, i) => {
                      const key =
                        competitor.name +
                        competitor.lastName +
                        competitor.yearOfBirth;
                      let group = tmpGroup;
                      if (Array.isArray(group)) {
                        const [a, b] = group;
                        group = i + 1 <= a.take ? a : b;
                      }
                      return (
                        <tr
                          key={key}
                          onClick={() => setActiveRow(key)}
                          className={activeRow === key ? styles.active : ""}
                        >
                          <td>{competitor.position}</td>
                          <td>
                            {competitor.name} {competitor.lastName}
                          </td>
                          <td>{competitor.yearOfBirth}</td>
                          <td>{competitor.club}</td>
                          <td>{competitor.total}</td>
                          <td>{group.date}</td>
                          <td>{group.name}</td>
                          <td>{group.scale}</td>
                          <td>{group.competition}</td>
                        </tr>
                      );
                    })}
                  </Fragment>
                );
              }
            );
          })}
        </tbody>
      </table>
      <div className={styles.schedule}>
        {Object.entries(schedule).map(([day, timeSchedule]) => (
          <Fragment key={day}>
            <h3>{day} - Grupe i satnica</h3>
            {Object.entries(timeSchedule).map(([time, groups]) => (
              <div key={day + time} className={styles.timeGroup}>
                {groups.map((group) => {
                  let competitors = group.weight.flatMap(
                    (w, i) => genderTables[group.gender][group.age[i]][w]
                  );
                  if(group.take) {
                    competitors = competitors.slice(0, group.take);
                  }
                  if(group.skip) {
                    competitors = competitors.slice(group.skip);
                  }
                  return (
                    <Group
                      key={
                        group.name +
                        group.gender +
                        group.age[0] +
                        group.weight[0]
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
    </>
  );
};

const Group = ({ group, competitors }) => {
  const [showCompetitors, setShowCompetitors] = useState(false);
  return (
    <div>
      <h4>
        Grupa {group.name} - {genders[group.gender]}
      </h4>
      <div className={styles.attributes}>
        <div>Provjera opreme i vaganje</div>
        <div>{group.scale}</div>
        <div>Natjecanje:</div>
        <div>{group.competition}</div>
        <div>Podjela medalja i pehara:</div>
        <div>{group.ceremony}</div>
        <div>Kategorije</div>
        <div className={styles.groupCategories}>
          {group.age.map((a, i) => `${a} ${group.weight[i]}`).join(", ")}
        </div>
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
