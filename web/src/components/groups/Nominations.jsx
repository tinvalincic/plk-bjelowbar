import { Fragment } from "react";
import styles from "../RecordsTable.module.css";
import { classnames } from "@/lib/util";
import { getGroup, groupDefinitions } from "@/lib/groups";

export const Nominations = ({
  activeData,
  showGroups = true,
  activeRow,
  setActiveRow,
  activeDiscipline,
  activeAge,
  activeGender,
  search,
}) => {
  const categories = activeData[activeGender];

  return (
    <table className={classnames(styles.table, styles.tableNominations)}>
      <thead>
        <tr>
          <th>#</th>
          <th>Natjecatelj{activeGender === "female" ? "ica" : ""}</th>
          <th>God.</th>
          <th>Klub</th>
          <th>Total</th>
          {showGroups && (
            <>
              <th>Dan</th>
              <th>Grupa</th>
              <th>Vaga</th>
              <th>Natjecanje</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(categories).flatMap(([age, weightCategories]) => {
          if (!search && activeAge !== age) return [null];
          return Object.entries(weightCategories).map(([cat, competitors]) => {
            if (search) {
              competitors = competitors.filter((competitor) => {
                const name = `${competitor.name} ${competitor.lastName}`;
                return name.toLowerCase().includes(search.toLowerCase());
              });
            }
            if (!competitors.length) return null;
            const primeTimeCount = competitors.filter(
              (competitor) => competitor.isPrimeTime
            ).length;
            const tmpGroup = getGroup(activeGender, age, cat, activeDiscipline);
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
                    group = i + 1 - primeTimeCount > a.skip ? a : b;
                  }
                  if (
                    competitor.isPrimeTime &&
                    group?.discipline !== "benchOnly"
                  ) {
                    group =
                      competitor.gender === "male"
                        ? groupDefinitions.primeTimeM
                        : groupDefinitions.primeTimeF;
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
                      {showGroups && (
                        <>
                          <td>{group?.date}</td>
                          <td
                            className={
                              competitor.isPrimeTime &&
                              group?.discipline !== "benchOnly"
                                ? styles.primeTimeGroup
                                : ""
                            }
                          >
                            {group?.name}
                          </td>
                          <td>{group?.scale}</td>
                          <td>{group?.competition}</td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </Fragment>
            );
          });
        })}
      </tbody>
    </table>
  );
};
