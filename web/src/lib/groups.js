const groups = {
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
};

const groupsByCategory = {
  male: {
    "SUB-JUNIOR": {
      59: 8,
      74: 8,
      83: 9,
      93: 9,
      105: 12,
    },
    JUNIOR: {
      66: 8,
      74: 8,
      83: 10,
      93: 11,
      105: 12,
    },
    OPEN: {
      74: 5,
      83: 5,
      93: [3, 4],
      105: 6,
      120: 6,
      "120+": 6,
    },
    "MASTER I": {
      93: 6,
      105: 6,
      "120+": 6,
    },
  },
  female: {
    "SUB-JUNIOR": {
      47: 7,
      52: 7,
      69: 7,
      76: 7,
      "84+": 7,
    },
    JUNIOR: {
      57: 7,
      63: 7,
      69: 7,
      76: 7,
    },
    OPEN: {
      52: 1,
      57: 1,
      63: 1,
      69: 1,
      76: 2,
      84: 2,
      "84+": 2,
    },
    "MASTER I": {
      63: 2,
      69: 2,
    },
    "MASTER II": {
      84: 2,
    },
  },
};

const setAtributes = (group, age, weight, gender) => {
  if (!group.age) group.age = [];
  group.age.push(age);
  if (!group.weight) group.weight = [];
  group.weight.push(weight);
  group.gender = gender;
};

Object.entries(groupsByCategory).forEach(([gender, ageCategories]) => {
  Object.entries(ageCategories).forEach(([age, weightCategories]) => {
    Object.entries(weightCategories).forEach(([weight, group]) => {
      if (Array.isArray(group)) {
        group.forEach((g) => {
          setAtributes(groups[g], age, weight, gender);
        });
        return;
      }
      setAtributes(groups[group], age, weight, gender);
    });
  });
});

export const schedule = Object.values(groups).reduce((acc, group) => {
  if (!acc[group.date]) {
    acc[group.date] = [];
  }
  if (!acc[group.date][group.scale]) {
    acc[group.date][group.scale] = [];
  }
  acc[group.date][group.scale].push(group);
  return acc;
}, {});

export function getGroup(gender, age, weight) {
  const group = groupsByCategory[gender][age][weight];
  if (Array.isArray(group)) {
    return group.map((g) => groups[g]);
  }
  return groups[group];
}
