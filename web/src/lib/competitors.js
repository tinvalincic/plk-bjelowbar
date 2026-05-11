import { powerlifting2026, benchOnly2026 } from "./bj-2026";

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
    {
      __0: "category",
      __1: "position",
      __2: "name",
      __3: "lastName",
      __4: "yearOfBirth",
      __5: "club",
      __6: "total",
    },
    {
      __1: "category",
      "BJELOVAR RECORD BREAKERS 2026": "name",
      __2: "lastName",
      __3: "yearOfBirth",
      __4: "club",
      __5: "total",
    },
  ][id];

const primeTime = [
  "LEONARDO BLAŽEKOVIĆ",
  "JANKO SVETLIK",
  "LEON PISKAČ",
  "MATEJ ŠALIĆ",
  "MIRO NOVAKOVIĆ",
  "DORIAN MUTAK",
  "OLIVER OZVAČIĆ",
  "WALTER SMAJLOVIĆ",
  "TEUTA JAKUPOVIĆ",
  "TARA BAĆE",
  "LEA ŽUNIĆ",
  "ANTONELA MAHNET",
  "MELISA MATULIN",
  "NIKOLINA JOSIPOVIĆ",
  "KARLA BALIČEVAC",
  "ANAMARIJA MAMIĆ",
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

function parseData(data) {
  const genders = {
    ŽENE: "female",
    MUŠKI: "male",
  };
  let gender = "female";
  let ageCategory = "";
  let weightCategory = "";

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
      entry.category = weightCategory;
      acc[gender][ageCategory][weightCategory].push(entry);
      return acc;
    },
    {
      male: {},
      female: {},
    }
  );
}

const translated = translate(powerlifting2026, 3);
export const competitors = parseData(translated);
const translatedBench = translate(benchOnly2026, 3);
export const competitorsBench = parseData(translatedBench);

function countClubs(competitors, defaulAcc = {}) {
  return Object.values(competitors).reduce((acc, genders) => {
    Object.values(genders).forEach((age) => {
      Object.values(age).forEach((weight) => {
        weight.forEach((competitor) => {
          if (!acc[competitor.club]) {
            acc[competitor.club] = 0;
          }
          acc[competitor.club]++;
        });
      });
    });
    return acc;
  }, defaulAcc);
}

const count = countClubs(competitors);
const countSum = countClubs(competitorsBench, count);
// console.log(countSum);
