import { useState } from "react";
import { HeaderButtons } from "./HeaderButtons";
import { Schedule } from "./Schedule";
import { Nominations } from "./Nominations";

export const Groups = ({ genderTables, showGroups = true, benchOnly }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [activeDiscipline, setActiveDiscipline] = useState("powerlifting");
  const [activeAge, setActiveAge] = useState("OPEN");
  const [activeGender, setActiveGender] = useState("male");
  const [search, setSearch] = useState("");
  const activeData =
    activeDiscipline === "powerlifting" ? genderTables : benchOnly;

  const onGenderClick = (gender) => {
    setActiveGender(gender);
    setActiveAge("OPEN");
    setActiveRow(null);
  };

  const onDisciplineClick = (discipline) => {
    setActiveDiscipline(discipline);
    setActiveGender("male");
    setActiveAge("OPEN");
    setActiveRow(null);
  };

  return (
    <>
      <HeaderButtons
        onDisciplineClick={onDisciplineClick}
        onGenderClick={onGenderClick}
        activeDiscipline={activeDiscipline}
        activeAge={activeAge}
        activeGender={activeGender}
        search={search}
        setSearch={setSearch}
        setActiveAge={setActiveAge}
        activeData={activeData}
      />
      <Nominations
        activeData={activeData}
        showGroups={showGroups}
        activeRow={activeRow}
        setActiveRow={setActiveRow}
        activeDiscipline={activeDiscipline}
        activeAge={activeAge}
        activeGender={activeGender}
        search={search}
      />
      {showGroups && (
        <Schedule genderTables={genderTables} benchOnly={benchOnly} />
      )}
    </>
  );
};
