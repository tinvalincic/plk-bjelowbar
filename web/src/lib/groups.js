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
    date: "05-30",
    start: "11:00",
    end: "13:45",
    discipline: "benchOnly",
    session: 1,
  }),
  2: createGroup({
    name: "B",
    date: "05-30",
    start: "11:00",
    end: "13:45",
    discipline: "benchOnly",
    session: 1,
  }),
  3: createGroup({
    name: "C",
    date: "05-30",
    start: "11:00",
    end: "13:45",
    discipline: "benchOnly",
    session: 1,
  }),
  4: createGroup({
    name: "A",
    date: "05-30",
    start: "14:00",
    end: "17:45",
    session: 2,
  }),
  5: createGroup({
    name: "B",
    date: "05-30",
    start: "14:00",
    end: "17:45",
    session: 2,
  }),
  6: createGroup({
    name: "A",
    date: "05-31",
    start: "09:00",
    end: "11:45",
    session: 3,
  }),
  7: createGroup({
    name: "B",
    date: "05-31",
    start: "09:00",
    end: "11:45",
    session: 3,
  }),
  8: createGroup({
    name: "C",
    date: "05-31",
    start: "12:00",
    end: "15:45",
    session: 4,
  }),
  9: createGroup({
    name: "D",
    date: "05-31",
    start: "12:00",
    end: "15:45",
    session: 4,
  }),
  10: createGroup({
    name: "E",
    date: "05-31",
    start: "16:00",
    end: "19:45",
    session: 5,
  }),
  11: createGroup({
    name: "F",
    date: "05-31",
    start: "16:00",
    end: "19:45",
    session: 5,
  }),
  12: createGroup({
    name: "A",
    date: "06-01",
    start: "09:00",
    end: "11:45",
    ceremonyStart: "20:45",
    session: 6,
  }),
  13: createGroup({
    name: "B",
    date: "06-01",
    start: "09:00",
    end: "11:45",
    ceremonyStart: "20:45",
    session: 6,
  }),
  14: createGroup({
    name: "C",
    date: "06-01",
    start: "12:00",
    end: "15:45",
    ceremonyStart: "20:45",
    take: null,
    skip: 2,
    scaleOffset: null,
    flip: true,
    session: 7,
  }),
  15: createGroup({
    name: "D",
    date: "06-01",
    start: "12:00",
    end: "15:45",
    ceremonyStart: "20:45",
    take: 12,
    skip: null,
    scaleOffset: null,
    session: 7,
  }),
  primeTimeF: createGroup({
    name: "PRIME TIME A",
    date: "06-01",
    start: "17:00",
    end: "20:45",
    ceremonyStart: "20:45",
    gender: "female",
    session: 8,
  }),
  primeTimeM: createGroup({
    name: "PRIME TIME B",
    date: "06-01",
    start: "17:00",
    end: "20:45",
    ceremonyStart: "20:45",
    gender: "male",
    session: 8,
  }),
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
        69: 1,
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
