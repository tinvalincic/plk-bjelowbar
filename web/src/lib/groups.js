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

function createGroup({
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
  flip = false,
  session,
}) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const scaleStart = new Date("2026-" + date);
  const scaleEnd = new Date("2026-" + date);
  scaleStart.setHours(startHour - 2, startMinute + scaleOffset);
  scaleEnd.setTime(scaleStart.getTime() + 1000 * 60 * 90);
  const competitionStart = new Date("2026-" + date + "T" + start + "");
  const competitionEnd = new Date("2026-" + date + "T" + end);
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
    session,
  };
  if (gender) group.gender = gender;
  if (take) group.take = take;
  if (skip) group.skip = skip;
  if (flip) group.flip = flip;
  return group;
}

export const groupDefinitions = {
  1: createGroup({
    name: "A",
    date: "06-05",
    start: "10:00",
    end: "10:45",
    ceremonyStart: "12:30",
    discipline: "benchOnly",
    session: 1,
  }),
  2: createGroup({
    name: "B",
    date: "06-05",
    start: "10:45",
    end: "11:30",
    ceremonyStart: "12:30",
    discipline: "benchOnly",
    session: 1,
  }),
  3: createGroup({
    name: "C",
    date: "06-05",
    start: "11:30",
    end: "12:15",
    ceremonyStart: "12:30",
    discipline: "benchOnly",
    session: 1,
  }),
  4: createGroup({
    name: "A",
    date: "06-05",
    start: "13:00",
    end: "16:45",
    session: 2,
  }),
  5: createGroup({
    name: "B",
    date: "06-05",
    start: "13:00",
    end: "16:45",
    session: 2,
  }),
  6: createGroup({
    name: "A",
    date: "06-05",
    start: "17:00",
    end: "20:45",
    skip: 8,
    flip: true,
    session: 3,
  }),
  7: createGroup({
    name: "B",
    date: "06-05",
    start: "17:00",
    end: "20:45",
    take: 8,
    session: 3,
  }),
  8: createGroup({
    name: "A",
    date: "06-06",
    start: "09:00",
    end: "12:15",
    session: 4,
  }),
  9: createGroup({
    name: "B",
    date: "06-06",
    start: "09:00",
    end: "12:15",
    session: 4,
  }),
  10: createGroup({
    name: "D",
    date: "06-06",
    start: "12:30",
    end: "16:00",
    ceremonyStart: "20:45",
    session: 5,
  }),
  11: createGroup({
    name: "E",
    date: "06-06",
    start: "12:30",
    end: "16:00",
    ceremonyStart: "20:45",
    session: 5,
  }),
  primeTimeF: createGroup({
    name: "PRIME TIME A",
    date: "06-06",
    start: "17:00",
    end: "20:45",
    ceremonyStart: "20:45",
    gender: "female",
    session: 6,
  }),
  primeTimeM: createGroup({
    name: "PRIME TIME B",
    date: "06-06",
    start: "17:00",
    end: "20:45",
    ceremonyStart: "20:45",
    gender: "male",
    session: 6,
  }),
  12: createGroup({
    name: "A",
    date: "06-07",
    start: "09:00",
    end: "12:45",
    session: 7,
  }),
  13: createGroup({
    name: "B",
    date: "06-07",
    start: "09:00",
    end: "12:45",
    session: 7,
  }),
  14: createGroup({
    name: "C",
    date: "06-07",
    start: "13:00",
    end: "16:45",
    session: 8,
  }),
  15: createGroup({
    name: "D",
    date: "06-07",
    start: "13:00",
    end: "16:45",
    session: 8,
  }),
  16: createGroup({
    name: "C",
    date: "06-07",
    start: "17:00",
    end: "20:45",
    session: 9,
  }),
  17: createGroup({
    name: "F",
    date: "06-07",
    start: "17:00",
    end: "20:45",
    session: 9,
  }),
};

const groupsByDiscipline = {
  powerlifting: {
    male: {
      "SUB-JUNIOR": {
        74: 14,
        83: 14,
        93: 14,
      },
      JUNIOR: {
        66: 14,
        74: 14,
        83: 15,
        93: 16,
        105: 15,
        120: 15,
      },
      OPEN: {
        74: 8,
        83: [6, 7],
        93: 9,
        105: 10,
        120: 11,
        "120+": 8,
      },
      "MASTER I": {
        93: 17,
        105: 17,
        120: 17,
      },
      "MASTER II": {
        83: 17,
        120: 17,
      },
    },
    female: {
      "SUB-JUNIOR": {
        63: 12,
      },
      JUNIOR: {
        57: 12,
        63: 12,
        69: 12,
        76: 12,
        84: 12,
      },
      OPEN: {
        52: 4,
        57: 4,
        63: 4,
        69: 4,
        76: 5,
        84: 5,
        "84+": 5,
      },
      "MASTER I": {
        52: 13,
        57: 13,
        63: 13,
        84: 13,
      },
      "MASTER II": {
        69: 13,
        76: 13,
      },
    },
  },
  benchOnly: {
    male: {
      "SUB-JUNIOR": {
        83: 2,
        93: 2,
      },
      JUNIOR: {
        83: 2,
        93: 2,
        105: 2,
        "120+": 2,
      },
      OPEN: {
        74: 3,
        83: 3,
        93: 3,
        105: 3,
        120: 3,
      },
      "MASTER I": {
        83: 3,
        93: 3,
        105: 3,
      },
    },
    female: {
      JUNIOR: {
        57: 1,
        63: 1,
        69: 1,
        76: 1,
      },
      OPEN: {
        57: 1,
        63: 1,
        84: 1,
        "84+": 1,
      },
      "MASTER II": {
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
