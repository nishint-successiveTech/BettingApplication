import AppServer from "./server";
import { seedPlayers } from "./seed/playerSeed";
import CricketMatchSeed from "./seed/cricketMatchSeed";

console.log("Hello, Betting 1.0!");

(async () => {
  await AppServer.run();
  await CricketMatchSeed.run();
  await seedPlayers();
})();
