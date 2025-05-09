import { powerlifting2025, benchOnly2025 } from "./bj-2025";

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
  ][id];

const primeTime = [
  "KARLO MIKEŠIĆ",
  "LEONARDO BLAŽEKOVIĆ",
  "MIRO NOVAKOVIĆ",
  "MATEJ ŠALIĆ",
  "LUKA BENŠIĆ",
  "WILLIAM VIČEVIĆ",
  "IVAN LOKAS",
  "ANDREJ ŠVENDA",
  "PETAR RENDULIĆ",
  "LUKA GREŽINA",
  "MATEA BUMBA",
  "LEA ŽUNIĆ",
  "NIKOLINA JOSIPOVIĆ",
  "ANAMARIJA MAMIĆ",
  "JELENA IVANČIĆ",
  "KLARA MENDAŠ",
  "DORA RINČIĆ",
  "VICTORIA OTRILLA",
  "TAMARA MIJATOVIĆ",
  "MELANIJA POMPER",
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
      acc[gender][ageCategory][weightCategory].push(entry);
      return acc;
    },
    {
      male: {},
      female: {},
    }
  );
}

const translated = translate(powerlifting2025, 2);
export const competitors = parseData(translated);
const translatedBench = translate(benchOnly2025, 2);
export const competitorsBench = parseData(translatedBench);

function clearCompetitors(competitors) {
  return Object.entries(competitors).reduce((acc, [gender, categories]) => {
    acc[gender] = Object.entries(categories).reduce(
      (acc, [ageCategory, weights]) => {
        acc[ageCategory] = Object.entries(weights).reduce(
          (acc, [weightCategory]) => {
            acc[weightCategory] = null;
            return acc;
          },
          {}
        );
        return acc;
      },
      {}
    );
    return acc;
  }, {});
}
