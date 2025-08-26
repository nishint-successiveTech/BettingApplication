import AppServer from "./server";
import { seedPlayers } from "./seed/playerSeed";

console.log("Hello, Betting 1.0!");

(async () => {
  // seed data
  await AppServer.run(); 
  await seedPlayers(); // then start server
})();
