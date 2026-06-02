import { Fragment } from "react";
import styles from "../records-table/RecordsTable.module.css";
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
              (competitor) => competitor.isPrimeTime,
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
                      <td>{i + 1}.</td>
                      <td>
                        {competitor.name} {competitor.lastName}
                        {!!competitor.guestLifter && " (guest lifter)"}
                      </td>
                      <td>{competitor.yearOfBirth}</td>
                      <td>{competitor.club}</td>
                      <td>{competitor.total}</td>
                      {showGroups && (
                        <>
                          <td>
                            {!!competitor?.guestLifter ? "6.6." : group?.date}
                          </td>
                          <td
                            className={
                              competitor.isPrimeTime &&
                              group?.discipline !== "benchOnly"
                                ? styles.primeTimeGroup
                                : ""
                            }
                          >
                            {!!competitor?.guestLifter ? "A" : group?.name}
                          </td>
                          <td>
                            {!!competitor?.guestLifter
                              ? "7:00 - 8:30"
                              : group?.scale}
                          </td>
                          <td>
                            {!!competitor?.guestLifter
                              ? "9:00 - 12:15"
                              : group?.competition}
                          </td>
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
