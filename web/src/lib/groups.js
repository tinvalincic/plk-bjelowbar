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
  scaleOffset = 0,
  flip = false
) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const scaleStart = new Date("2025-" + date);
  const scaleEnd = new Date("2025-" + date);
  scaleStart.setHours(startHour - 2, startMinute + scaleOffset);
  scaleEnd.setTime(scaleStart.getTime() + 1000 * 60 * 90);
  const competitionStart = new Date("2025-" + date + "T" + start + "");
  const competitionEnd = new Date("2025-" + date + "T" + end);
  let ceremony;
  if (ceremonyStart) {
    ceremony = ceremonyStart;
  } else {
    const ceremonyDate = new Date(competitionEnd);
    // ceremonyDate.setMinutes(ceremonyDate.getMinutes() + 15);
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
  if (flip) group.flip = flip;
  return group;
}

export const groupDefinitions = {
  1: createGroup("A", "05-30", "11:00", "13:45", "", "benchOnly"),
  2: createGroup("B", "05-30", "11:00", "13:45", "", "benchOnly"),
  3: createGroup("C", "05-30", "11:00", "13:45", "", "benchOnly"),
  4: createGroup("A", "05-30", "14:00", "17:45"),
  5: createGroup("B", "05-30", "14:00", "17:45"),
  6: createGroup("A", "05-31", "09:00", "11:45"),
  7: createGroup("B", "05-31", "09:00", "11:45"),
  8: createGroup("C", "05-31", "12:00", "15:45"),
  9: createGroup("D", "05-31", "12:00", "15:45"),
  10: createGroup("E", "05-31", "16:00", "19:45"),
  11: createGroup("F", "05-31", "16:00", "19:45"),
  12: createGroup("A", "06-01", "09:00", "11:45", "20:45"),
  13: createGroup("B", "06-01", "09:00", "11:45", "20:45"),
  14: createGroup(
    "C",
    "06-01",
    "12:00",
    "15:45",
    "20:45",
    null,
    null,
    null,
    2,
    null,
    true
  ),
  15: createGroup(
    "D",
    "06-01",
    "12:00",
    "15:45",
    "20:45",
    null,
    null,
    12,
    null,
    null
  ),
  primeTimeF: createGroup(
    "PRIME TIME A",
    "06-01",
    "17:00",
    "20:45",
    "20:45",
    null,
    "female"
  ),
  primeTimeM: createGroup(
    "PRIME TIME B",
    "06-01",
    "17:00",
    "20:45",
    "20:45",
    null,
    "male"
  ),
};

const groupsByDiscipline = {
  powerlifting: {
    male: {
      "SUB-JUNIOR": {
        74: 4,
        83: 4,
        93: 4,
        105: 4,
        "120+": 4,
      },
      JUNIOR: {
        74: 4,
        83: 5,
        93: 8,
        105: 5,
        120: 8,
      },
      OPEN: {
        66: 10,
        74: 10,
        83: 14,
        93: 15,
        105: 11,
        120: [14, 15],
        "120+": 10,
      },
      "MASTER I": {
        93: 9,
        105: 9,
        120: 9,
      },
      "MASTER II": {
        105: 9,
        120: 9,
      },
    },
    female: {
      "SUB-JUNIOR": {
        57: 6,
        63: 6,
        69: 6,
        76: 6,
      },
      JUNIOR: {
        52: 6,
        63: 6,
        69: 6,
        76: 6,
      },
      OPEN: {
        52: 12,
        57: 12,
        63: 12,
        69: 13,
        76: 13,
        84: 13,
        "84+": null,
      },
      "MASTER I": {
        52: 7,
        63: 7,
        76: 7,
        "84+": 7,
      },
      "MASTER II": {
        63: 7,
        69: 7,
        "84+": 7,
      },
    },
  },
  benchOnly: {
    male: {
      "SUB-JUNIOR": {
        93: 2,
        105: 2,
        "120+": 2,
      },
      JUNIOR: {
        93: 2,
        105: 2,
      },
      OPEN: {
        83: 3,
        93: 3,
        105: 3,
        120: 3,
      },
      "MASTER I": {
        93: 2,
        105: 2,
        120: 2,
      },
      "MASTER III": {
        120: 2,
      },
    },
    female: {
      "SUB-JUNIOR": {
        52: 1,
        57: 1,
        69: 1,
      },
      JUNIOR: {
        52: 1,
        57: 1,
        76: 1,
      },
      OPEN: {
        52: 1,
        57: 1,
        63: 1,
        69: 1,
        76: 1,
        "84+": 1,
      },
    },
  },
};

const setAtributes = (group, age, weight, gender) => {
  if (!group.age) group.age = [];
  group.age.push(age);
  if (!group.weight) group.weight = [];
  if (group.flip) {
    group.weight.unshift(weight);
  } else {
    group.weight.push(weight);
  }
  group.gender = gender;
  if (!group.discipline) group.discipline = "powerlifting";
};

Object.entries(groupsByDiscipline).forEach(([_, genderGroup]) => {
  Object.entries(genderGroup).forEach(([gender, ageCategories]) => {
    Object.entries(ageCategories).forEach(([age, weightCategories]) => {
      Object.entries(weightCategories).forEach(([weight, group]) => {
        if (Array.isArray(group)) {
          group.forEach((g) => {
            try {
              setAtributes(groupDefinitions[g], age, weight, gender);
            } catch (error) {
              console.log("Greška 2", genderGroup, gender, age, weight, g);
            }
          });
          return;
        }
        try {
          setAtributes(groupDefinitions[group], age, weight, gender);
        } catch (error) {
          console.error("Error", genderGroup, gender, age, weight, group);
        }
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
