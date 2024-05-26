// import { powerlifting2024 } from "./all-competitors-bj";
import { powerlifting2024, benchOnly2024 } from "./bj-2024";

const getKeys = (id) =>
  [
    {
      __1: "category",
      __2: "position",
      __3: "name",
      "BJELOVAR POWERLIFTING": "lastName",
      __4: "yearOfBirth",
      __5: "club",
      __6: "total",
    },
    {
      "BJELOVAR BENCH PRESS": "category",
      __1: "position",
      __2: "name",
      __3: "lastName",
      __4: "yearOfBirth",
      __5: "club",
      __6: "total",
    },
  ][id];

const primeTime = [
  "KARLO MIKEŠIĆ",
  "WALTER SMAJLOVIĆ",
  "GORDAN KLASIĆ",
  "LEONARDO BLAŽEKOVIĆ",
  "VALENTINO MARAŠ",
  "BORNA KRALJEVIĆ",
  "ILIJA PETROVIĆ",
  "LUKA GREŽINA",
  "TEUTA JAKUPOVIĆ",
  "MATEA BUMBA",
  "MARINELA FRAS",
  "JELENA IVANČIĆ",
  "MARIA MAGDALENA GORIČANEC",
  "MELISA MATULIN",
  "DORA RINČIĆ",
  "TARA BAĆE",
].map((name) => name.toLowerCase());

function translate(data, version) {
  const keys = getKeys(version);
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
      if (!entry.name && !entry.lastName && !entry.category) return acc;
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
        ["84+", "120+", "120+ EQ"].includes(entry.category)
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
      if (
        primeTime.includes(
          `${entry.name.toLowerCase()} ${entry.lastName.toLowerCase()}`
        )
      ) {
        entry.isPrimeTime = true;
      }
      entry.gender = gender;
      acc[gender][ageCategory][weightCategory].push(entry);
      return acc;
    },
    {
      male: {},
      female: {},
    }
  );
}

const translated = translate(powerlifting2024, 0);
export const competitors = parseData(translated);
const translatedBench = translate(benchOnly2024, 1);
export const competitorsBench = parseData(translatedBench);
