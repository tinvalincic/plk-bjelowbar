function prependZero(number) {
  return number < 10 ? `0${number}` : number;
}

function formatTime(startDate, endDate) {
  const startHours = startDate.getHours();
  const startMinutes = prependZero(startDate.getMinutes());
  const endHours = endDate.getHours();
  const endMinutes = prependZero(endDate.getMinutes());
  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
}

function createGroup(
  name,
  date,
  start,
  end,
  ceremonyStart = "",
  discipline = "powerlifting",
  gender,
  take,
  skip,
  scaleOffset = 0
) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const scaleStart = new Date("2024-" + date);
  const scaleEnd = new Date("2024-" + date);
  scaleStart.setHours(startHour - 2, startMinute + scaleOffset);
  scaleEnd.setTime(scaleStart.getTime() + 1000 * 60 * 90);
  const competitionStart = new Date("2024-" + date + "T" + start + "");
  const competitionEnd = new Date("2024-" + date + "T" + end);
  let ceremony;
  if (ceremonyStart) {
    ceremony = ceremonyStart;
  } else {
    const ceremonyDate = new Date(competitionEnd);
    ceremonyDate.setMinutes(ceremonyDate.getMinutes() + 15);
    const hours = prependZero(ceremonyDate.getHours());
    const minutes = prependZero(ceremonyDate.getMinutes());
    ceremony = `${hours}:${minutes}`;
  }
  const group = {
    name,
    date: `${scaleStart.getDate()}.${scaleStart.getMonth() + 1}.`,
    scale: formatTime(scaleStart, scaleEnd),
    competition: formatTime(competitionStart, competitionEnd),
    ceremony: ceremony,
    discipline,
  };
  if (gender) group.gender = gender;
  if (take) group.take = take;
  if (skip) group.skip = skip;
  return group;
}

export const groupDefinitions = {
  1: createGroup("A", "05-31", "11:00", "15:30"),
  2: createGroup("B", "05-31", "11:00", "15:30"),
  3: createGroup("A", "05-31", "16:00", "16:45", "", "benchOnly"),
  4: createGroup(
    "B",
    "05-31",
    "16:45",
    "17:30",
    "",
    "benchOnly",
    null,
    null,
    null,
    -45
  ),
  5: createGroup("A", "06-01", "09:00", "12:30", "22:00"),
  6: createGroup("B", "06-01", "09:00", "12:30", "22:00"),
  7: createGroup("C", "06-01", "12:30", "15:45", "22:00"),
  8: createGroup("D", "06-01", "12:30", "15:45", "22:00"),
  9: createGroup("E", "06-01", "15:45", "19:45", "22:00"),
  10: createGroup("F", "06-01", "15:45", "19:45", "22:00"),
  primeTimeF: createGroup(
    "PRIME TIME A",
    "06-01",
    "19:45",
    "22:00",
    "22:00",
    null,
    "female"
  ),
  primeTimeM: createGroup(
    "PRIME TIME B",
    "06-01",
    "19:45",
    "22:00",
    "22:00",
    null,
    "male"
  ),
  13: createGroup("A", "06-02", "10:00", "13:00", "13:00"),
  14: createGroup("B", "06-02", "10:00", "13:00", "13:00"),
  15: createGroup("C", "06-02", "13:15", "16:15", "16:15"),
  16: createGroup("D", "06-02", "13:15", "16:15", "16:15"),
  17: createGroup("E", "06-02", "16:15", "18:15", "18:15", null, null, null, 7),
  18: createGroup("F", "06-02", "16:15", "18:15", "18:15", null, null, 7, null),
};

const groupsByDiscipline = {
  powerlifting: {
    male: {
      "SUB-JUNIOR": {
        74: 13,
        83: 13,
        93: 14,
        105: 14,
        "120+": 14,
      },
      JUNIOR: {
        66: 16,
        83: 16,
        93: [17, 18],
        105: 16,
        "120+": 16,
      },
      OPEN: {
        66: 7,
        74: 7,
        83: 8,
        93: 9,
        105: 10,
        120: 8,
        "120+": 9,
        "120+ EQ": 10,
      },
      "MASTER I": {
        83: 15,
        93: 15,
        105: 15,
        120: 15,
        "120+": 15,
      },
    },
    female: {
      "SUB-JUNIOR": {
        52: 1,
        57: 1,
        69: 1,
        "84+": 1,
      },
      JUNIOR: {
        57: 1,
        63: 1,
        69: 2,
        76: 2,
        84: 2,
      },
      OPEN: {
        47: 5,
        57: 5,
        63: 5,
        69: 6,
        84: 6,
        "84+": 6,
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
        74: 3,
        93: 3,
      },
      JUNIOR: {
        93: 3,
      },
      OPEN: {
        66: 4,
        74: 4,
        83: 4,
        93: 4,
        105: 4,
        120: 4,
      },
      "MASTER I": {
        93: 4,
        120: 4,
      },
      "MASTER II": {
        93: 4,
      },
    },
    female: {
      "SUB-JUNIOR": {
        52: 3,
        84: 3,
      },
      JUNIOR: {
        57: 3,
        63: 3,
      },
      OPEN: {
        52: 3,
        69: 3,
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

export function getGroup(gender, age, weight, discipline = "powerlifting") {
  const group = groupsByDiscipline[discipline][gender][age]?.[weight];
  if (Array.isArray(group)) {
    return group.map((g) => groupDefinitions[g]);
  }
  return groupDefinitions[group];
}
