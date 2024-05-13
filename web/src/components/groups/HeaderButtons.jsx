import styles from "../RecordsTable.module.css";
import { classnames } from "@/lib/util";

export const HeaderButtons = ({
  onDisciplineClick,
  onGenderClick,
  activeDiscipline,
  activeAge,
  activeGender,
  search,
  setSearch,
  setActiveAge,
  activeData,
}) => {
  const categories = activeData[activeGender];

  return (
    <>
      <div className={styles.disciplineWrap}>
        <button
          className={classnames(
            styles.genderButton,
            styles.disciplineButton,
            activeDiscipline === "powerlifting" ? styles.active : ""
          )}
          onClick={() => onDisciplineClick("powerlifting")}
        >
          Powerlifting
        </button>
        <button
          className={classnames(
            styles.genderButton,
            styles.disciplineButton,
            activeDiscipline === "benchOnly" ? styles.active : ""
          )}
          onClick={() => onDisciplineClick("benchOnly")}
        >
          Bench press
        </button>
      </div>
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
    </>
  );
};
