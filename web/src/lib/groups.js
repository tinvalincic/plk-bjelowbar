export const groupDefinitions = {
  1: {
    name: "A",
    date: "3.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 13:00",
    ceremony: "13:00 - 13:30",
  },
  2: {
    name: "B",
    date: "3.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 13:00",
    ceremony: "13:00 - 13:30",
  },
  3: {
    name: "C",
    date: "3.6.",
    scale: "12:00 - 13:30",
    competition: "14:00 - 16:00",
    ceremony: "16:00 - 16:30",
    take: 7,
  },
  4: {
    name: "D",
    date: "3.6.",
    scale: "12:00 - 13:30",
    competition: "14:00 - 16:00",
    ceremony: "16:00 - 16:30",
    skip: 7,
  },
  5: {
    name: "E",
    date: "3.6.",
    scale: "14:30 - 16:00",
    competition: "16:30 - 20:00",
    ceremony: "20:00 - 20:30",
  },
  6: {
    name: "F",
    date: "3.6.",
    scale: "14:30 - 16:00",
    competition: "16:30 - 20:00",
    ceremony: "20:00 - 20:30",
  },
  7: {
    name: "A",
    date: "4.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 12:00",
    ceremony: "12:00 - 12:30",
  },
  8: {
    name: "B",
    date: "4.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 12:00",
    ceremony: "12:00 - 12:30",
  },
  9: {
    name: "C",
    date: "4.6.",
    scale: "10:30 - 12:00",
    competition: "12:30 - 15:30",
    ceremony: "15:30 - 16:00",
  },
  10: {
    name: "D",
    date: "4.6.",
    scale: "10:30 - 12:00",
    competition: "12:30 - 15:30",
    ceremony: "15:30 - 16:00",
  },
  11: {
    name: "E",
    date: "4.6.",
    scale: "14:00 - 15:30",
    competition: "16:00 - 19:00",
    ceremony: "19:00 - 19:30",
  },
  12: {
    name: "F",
    date: "4.6.",
    scale: "14:00 - 15:30",
    competition: "16:00 - 19:00",
    ceremony: "19:00 - 19:30",
  },
  primeTimeM: {
    name: "PRIME TIME",
    date: "1.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 12:00",
    ceremony: "12:00 - 12:30",
    gender: "male",
  },
  primeTimeW: {
    name: "PRIME TIME",
    date: "1.6.",
    scale: "07:00 - 08:30",
    competition: "09:00 - 12:00",
    ceremony: "12:00 - 12:30",
    gender: "female",
  },
  13: {
    name: "A",
    date: "31.5.",
    scale: "14:00 - 15:00",
    competition: "16:00 - 18:00",
    ceremony: "18:00 - 18:30",
    discipline: "benchOnly",
  },
  14: {
    name: "B",
    date: "31.5.",
    scale: "14:00 - 15:00",
    competition: "16:00 - 18:00",
    ceremony: "18:00 - 18:30",
    discipline: "benchOnly",
  },
  15: {
    name: "C",
    date: "31.5.",
    scale: "16:00 - 17:00",
    competition: "18:00 - 20:00",
    ceremony: "20:00 - 20:30",
    discipline: "benchOnly",
  },
  16: {
    name: "D",
    date: "31.5.",
    scale: "16:00 - 17:00",
    competition: "18:00 - 20:00",
    ceremony: "20:00 - 20:30",
    discipline: "benchOnly",
  },
};

const groupsByDiscipline = {
  powerlifting: {
    male: {
      "SUB-JUNIOR": {
        // 59: 8,
        74: 8,
        83: 9,
        93: 9,
        105: 12,
        "120+": 12,
      },
      JUNIOR: {
        66: 8,
        // 74: 8,
        83: 10,
        93: 11,
        105: 12,
        "120+": 12,
      },
      OPEN: {
        66: 5,
        74: 5,
        83: 5,
        93: [3, 4],
        105: 6,
        120: 6,
        "120+": 6,
      },
      "MASTER I": {
        83: 6,
        93: 6,
        105: 6,
        120: 6,
        "120+": 6,
      },
    },
    female: {
      "SUB-JUNIOR": {
        // 47: 7,
        52: 7,
        57: 7,
        69: 7,
        // 76: 7,
        "84+": 7,
      },
      JUNIOR: {
        57: 7,
        63: 7,
        69: 7,
        76: 7,
        84: 7,
      },
      OPEN: {
        47: 1,
        // 52: 1,
        57: 1,
        63: 1,
        69: 1,
        // 76: 2,
        84: 2,
        "84+": 2,
      },
      "MASTER I": {
        52: 2,
        63: 2,
        69: 2,
        "84+": 2,
      },
      "MASTER II": {
        63: 2,
      },
    },
  },
  benchOnly: {
    male: {
      "SUB-JUNIOR": {
        74: 13,
        93: 13,
      },
      JUNIOR: {
        93: 13,
      },
      OPEN: {
        66: 13,
        74: 13,
        83: 13,
        93: 14,
        105: 14,
        120: 14,
        "120+": 14,
      },
      "MASTER I": {
        93: 14,
        120: 14,
      },
      "MASTER II": {
        93: 14,
      },
    },
    female: {
      "SUB-JUNIOR": {
        52: 15,
        84: 15,
      },
      JUNIOR: {
        57: 15,
        63: 16,
      },
      OPEN: {
        52: 16,
        69: 16,
      },
    },
  },
};

const setAtributes = (group, age, weight, gender) => {
  if (!group.age) group.age = [];
  group.age.push(age);
  if (!group.weight) group.weight = [];
  group.weight.push(weight);
  group.gender = gender;
  if (!group.discipline) group.discipline = "powerlifting";
};

Object.entries(groupsByDiscipline).forEach(([_, genderGroup]) => {
  Object.entries(genderGroup).forEach(([gender, ageCategories]) => {
    Object.entries(ageCategories).forEach(([age, weightCategories]) => {
      Object.entries(weightCategories).forEach(([weight, group]) => {
        if (Array.isArray(group)) {
          group.forEach((g) => {
            setAtributes(groupDefinitions[g], age, weight, gender);
          });
          return;
        }
        setAtributes(groupDefinitions[group], age, weight, gender);
      });
    });
  });
});

export const schedule = Object.values(groupDefinitions).reduce((acc, group) => {
  if (!acc[group.date]) {
    acc[group.date] = [];
  }
  if (!acc[group.date][group.scale]) {
    acc[group.date][group.scale] = [];
  }
  acc[group.date][group.scale].push(group);
  return acc;
}, {});

console.log(schedule);

export function getGroup(gender, age, weight, discipline = "powerlifting") {
  const group = groupsByDiscipline[discipline][gender][age]?.[weight];
  if (Array.isArray(group)) {
    return group.map((g) => groupDefinitions[g]);
  }
  return groupDefinitions[group];
}
