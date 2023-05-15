import { allCompetitors } from "./all-competitors-bj";

function translate(data) {
  const keys = {
    __1: "category",
    __2: "position",
    __3: "name",
    "BJELOVAR POWERLIFTING 03.06-04.06.2023.": "lastName",
    __4: "yearOfBirth",
    __5: "club",
    __6: "total",
  };
  return data.map((entry) => {
    return Object.entries(entry).reduce((acc, [key, value]) => {
      if (!keys[key]) return acc;
      return {
        ...acc,
        [keys[key]]: value,
      };
    }, {});
  });
}

// Function that parses competitors data and organizes it into categories
function parseData(data) {
  // data will have category value "ŽENE" or "MUŠKI", if encountered it will be used to set gender
  const genders = {
    ŽENE: "female",
    MUŠKI: "male",
  };
  let gender = "female";
  // possible values are SUB-JUNIOR, JUNIOR, OPEN, MASTER I, MASTER II and MASTER III. If encountered it will be used to set ageCategory
  let ageCategory = "";
  // possible values are 43, 47, 52, 57, 63, 72, 84, 84+, 59, 66, 74, 83, 93, 105, 120, 120+. If encountered it will be used to set weightCategory
  let weightCategory = "";

  // return an object that will consist of two values, male and female
  // each of those will have a value of an object that will consist of age categories
  // each of those will have a value of an object that will consist of weight categories
  // each of those will have a value of an array of competitors
  return data.reduce(
    (acc, entry) => {
      if (["ŽENE", "MUŠKI"].includes(entry.category)) {
        gender = genders[entry.category];
        return acc;
      }
      if (
        [
          "SUB-JUNIOR",
          "JUNIOR",
          "OPEN",
          "MASTER I",
          "MASTER II",
          "MASTER III",
        ].includes(entry.category)
      ) {
        ageCategory = entry.category;
        return acc;
      }
      if (
        typeof entry.category === "number" ||
        ["84+", "120+"].includes(entry.category)
      ) {
        weightCategory = entry.category;
        return acc;
      }
      if (!acc[gender][ageCategory]) {
        acc[gender][ageCategory] = {};
      }
      if (!acc[gender][ageCategory][weightCategory]) {
        acc[gender][ageCategory][weightCategory] = [];
      }
      acc[gender][ageCategory][weightCategory].push(entry);
      return acc;
    },
    {
      male: {},
      female: {},
    }
  );
}

const translated = translate(allCompetitors);
export const competitors = parseData(translated);

const cat = {
  JUNIOR: "juniors",
  "SUB-JUNIOR": "juniors",
  OPEN: "seniors",
  "MASTER I": "seniors",
  "MASTER II": "seniors",
  "MASTER III": "seniors",
};

const count = Object.values(competitors).reduce(
  (acc, ageCategories) => {
    Object.entries(ageCategories).forEach(([age, weightCategories]) => {
      acc[cat[age]] += Object.values(weightCategories).reduce((a, w) => {
        a += w.length;
        return a;
      }, 0);
      return acc;
    });
    return acc;
  },
  {
    juniors: 0,
    seniors: 0,
  }
);
