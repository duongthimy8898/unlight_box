// import dayjs from "dayjs";
// import type { Commentator } from "../types/Commentator";
// import type { Fixture } from "../types/Fixture";
// import type { League } from "../types/League";
// import type { Sport } from "../types/Sport";
// import type { Team } from "../types/Team";

// // ----------------- Helpers -----------------
// const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
// const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

// // ----------------- Base sports -----------------
// export const fakeSports: Sport[] = [
//   {
//     id: 1,
//     index: 0,
//     referenceId: "spt1",
//     slug: "bong-da",
//     iconUrl: "https://picsum.photos/40?random=1",
//     name: "Football",
//     hasLive: true,
//     fixtures: [],
//     leagues: [],
//   },
//   {
//     id: 2,
//     index: 1,
//     referenceId: "spt2",
//     slug: "bong-ro",
//     iconUrl: "https://picsum.photos/40?random=2",
//     name: "Basketball",
//     hasLive: true,
//     fixtures: [],
//     leagues: [],
//   },
//   {
//     id: 3,
//     index: 2,
//     referenceId: "spt3",
//     slug: "bong-chuyen",
//     iconUrl: "https://picsum.photos/40?random=3",
//     name: "Volleyball",
//     hasLive: false,
//     fixtures: [],
//     leagues: [],
//   },
//   {
//     id: 4,
//     index: 3,
//     referenceId: "spt4",
//     slug: "bong-chay",
//     iconUrl: "https://picsum.photos/40?random=4",
//     name: "Baseball",
//     hasLive: false,
//     fixtures: [],
//     leagues: [],
//   },
//   {
//     id: 5,
//     index: 4,
//     referenceId: "spt5",
//     slug: "khuc-con-cau",
//     iconUrl: "https://picsum.photos/40?random=5",
//     name: "Hockey",
//     hasLive: true,
//     fixtures: [],
//     leagues: [],
//   },
// ];

// // ----------------- Pool teams -----------------
// export const fakeTeams: Team[] = [
//   "Lions FC",
//   "Thunder United",
//   "Rapid Jets",
//   "Crimson Sharks",
//   "Desert Scorpions",
//   "Northern Titans FC",
//   "Black Panthers United",
//   "Sunrise Falcons Gaming",
//   "The Wild Mustangs of Nevada",
//   "The Steel Hornets of the West",
//   "Golden Bulls United",
//   "Night Raiders FC",
//   "Phoenix Squad",
//   "Vortex Gaming",
//   "Dune Stalkers Esports",
//   "Jungle Rhinos Club",
//   "Ocean Raiders United",
//   "Skybreak Warriors",
//   "Firestorm FC",
//   "Echo Wolves Pro",
//   "Mystic Lions Team",
//   "Ironclad Champions",
//   "Stone Titans FC",
//   "Solar Eagles Club",
//   "Dark Phoenix Team",
//   "Ghost Wolves Esports",
//   "Blizzard Bears United",
//   "Inferno Hawks Club",
//   "Galaxy FC",
//   "Wild Mustangs",
//   "Emerald Dragons",
// ].map((name, i) => ({
//   id: i + 1,
//   referenceId: `t${i + 1}`,
//   name,
//   logoUrl: `https://picsum.photos/32?random=${20 + i}`,
// }));

// // ----------------- Commentators pool -----------------
// const nicknames = ["Leo", "Tí", "Bin", "Bé", "Cò"];
// const names = ["Hoàng", "Minh", "Thành", "Sơn", "Tuấn"];
// const commentaryWords = ["Esports", "Gaming", "TV", "Studio"];
// const getRandomNickname = () => `${pick(nicknames)} ${pick(names)} ${pick(commentaryWords)} ${randInt(10, 99)}`;

// export const fakeCommentators: Commentator[] = Array.from({ length: 15 }, (_, i) => ({
//   id: i + 1,
//   avatarUrl: `https://picsum.photos/40?random=${100 + i}`,
//   nickname: getRandomNickname(),
//   streams: [],
// }));

// // ----------------- Generate leagues per sport (2-5 each) -----------------
// export const fakeLeagues: League[] = [];
// let leagueAutoId = 1;

// for (const sport of fakeSports) {
//   const leagueCount = randInt(2, 5);
//   for (let i = 0; i < leagueCount; i++) {
//     const id = leagueAutoId++;
//     const league: League = {
//       id,
//       referenceId: `lg${id}`,
//       name: `${sport.name}${i + 1}`,
//       slug: `${(sport.name + " League " + (i + 1)).toLowerCase().replace(/\s+/g, "")}`,
//       shortName: `${sport.name.slice(0, 3).toUpperCase()}${i + 1}`,
//       logoUrl: `https://picsum.photos/30?random=${200 + id}`,
//       fixtures: [],
//       sport,
//     };
//     fakeLeagues.push(league);
//     sport.leagues.push(league);
//   }
// }

// // ----------------- Generate fixtures per league (2-7 each) -----------------
// export const fakeFixtures: Fixture[] = [];
// let fixtureAutoId = 1;

// for (const league of fakeLeagues) {
//   const fixtureCount = randInt(2, 7);

//   for (let m = 0; m < fixtureCount; m++) {
//     const home = pick(fakeTeams);
//     let away = pick(fakeTeams);
//     while (away.id === home.id) away = pick(fakeTeams);

//     const daysAhead = randInt(0, 7);
//     const hour = randInt(9, 23);
//     const minute = randInt(0, 59);
//     const startTime = dayjs().startOf("day").add(daysAhead, "day").add(hour, "hour").add(minute, "minute").toDate();

//     const isToday = dayjs(startTime).isSame(dayjs(), "day");
//     const isLive = isToday && Math.random() < 0.5;

//     const score = isLive ? { home: randInt(0, 3), away: randInt(0, 3) } : null;

//     const commentators = [...fakeCommentators]
//       .sort(() => Math.random() - 0.5)
//       .slice(0, randInt(1, 3))
//       .map((c, idx) => ({ index: idx, commentator: c }));

//     const fixture: Fixture = {
//       id: fixtureAutoId,
//       referenceId: `f${fixtureAutoId}`,
//       slug: `${home.name.toLowerCase().replace(/\s+/g, "")}-vs-${away.name.toLowerCase().replace(/\s+/g, "")}-${fixtureAutoId}`,
//       title: `${home.name} vs ${away.name}`,
//       sport: league.sport,
//       league,
//       homeTeam: home,
//       awayTeam: away,
//       startTime,
//       score,
//       status: isLive ? { code: 1, description: "Live" } : { code: 0, description: "Upcoming" },
//       fixtureCommentators: commentators,
//       isPinned: Math.random() > 0.95,
//       isHot: Math.random() > 0.85,
//       isLive,
//     };

//     fakeFixtures.push(fixture);
//     league.fixtures.push(fixture);
//     fixtureAutoId++;
//   }
// }

// // ----------------- Attach fixtures to leagues & sports -----------------
// for (const league of fakeLeagues) {
//   league.fixtures = fakeFixtures.filter((f) => f.league.id === league.id);
// }
// for (const sport of fakeSports) {
//   sport.fixtures = fakeFixtures.filter((f) => f.sport.id === sport.id);
// }

// for (const c of fakeCommentators) {
//   c.streams = [
//     {
//       id: Date.now(),
//       commentator: c,
//       name: "HD",
//       // isDefault: true,
//       sourceUrl: "https://cakhiapro.cdnlive.pro/live/_definst_/stream_9_f915e9e2@nungsd1/playlist.m3u8",
//       referenceId: null,
//       // flv: undefined,
//     },
//     {
//       id: Date.now() + 1,
//       commentator: c,
//       name: "Full HD",
//       // isDefault: true,
//       sourceUrl: "https://cakhiapro.cdnlive.pro/live/_definst_/stream_9_f915e9e2@bomsd1/playlist.m3u8",
//       referenceId: null,
//       // flv: undefined,
//     },
//   ];
// }

// // ----------------- Live score updater -----------------
// export function startUpdatingFixtures(intervalMs = 3000) {
//   return setInterval(() => {
//     fakeFixtures.forEach((f) => {
//       if (f.isLive && f.score) {
//         // tăng điểm theo xác suất nhỏ
//         if (Math.random() > 0.7) f.score.home += 1;
//         if (Math.random() > 0.75) f.score.away += 1;
//       }
//     });
//   }, intervalMs);
// }
