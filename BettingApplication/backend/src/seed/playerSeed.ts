// seed/playerSeed.ts
import playerModel, { IPlayer } from "../models/playerModel";

const players: Partial<IPlayer>[] = [
  // India
  { name: "Rohit Sharma", role: "Batsman", team: "India", odds: 1.8 },
  { name: "Virat Kohli", role: "Batsman", team: "India", odds: 1.9 },
  { name: "Shubman Gill", role: "Batsman", team: "India", odds: 2.0 },
  { name: "KL Rahul", role: "Batsman", team: "India", odds: 1.7 },
  { name: "Hardik Pandya", role: "All-Rounder", team: "India", odds: 2.1 },
  { name: "Ravindra Jadeja", role: "All-Rounder", team: "India", odds: 2.2 },
  { name: "Jasprit Bumrah", role: "Bowler", team: "India", odds: 1.6 },
  { name: "Mohammed Shami", role: "Bowler", team: "India", odds: 1.7 },
  { name: "Ravichandran Ashwin", role: "Bowler", team: "India", odds: 1.9 },
  { name: "Yuzvendra Chahal", role: "Bowler", team: "India", odds: 2.0 },
  { name: "Ishan Kishan", role: "Wicket-Keeper", team: "India", odds: 1.8 },

  // Australia
  { name: "David Warner", role: "Batsman", team: "Australia", odds: 1.8 },
  { name: "Steve Smith", role: "Batsman", team: "Australia", odds: 1.9 },
  { name: "Marnus Labuschagne", role: "Batsman", team: "Australia", odds: 2.0 },
  { name: "Pat Cummins", role: "All-Rounder", team: "Australia", odds: 2.2 },
  { name: "Glenn Maxwell", role: "All-Rounder", team: "Australia", odds: 2.1 },
  { name: "Mitchell Starc", role: "Bowler", team: "Australia", odds: 1.7 },
  { name: "Josh Hazlewood", role: "Bowler", team: "Australia", odds: 1.8 },
  { name: "Adam Zampa", role: "Bowler", team: "Australia", odds: 2.0 },
  { name: "Marcus Stoinis", role: "All-Rounder", team: "Australia", odds: 1.9 },
  { name: "Alex Carey", role: "Wicket-Keeper", team: "Australia", odds: 1.8 },
  { name: "Cameron Green", role: "All-Rounder", team: "Australia", odds: 2.0 },
];

export const seedPlayers = async () => {
  try {
    const exist = await playerModel.exists({});
    if (exist) {
      console.log("Players already present in DB");
      return;
    }

    await playerModel.insertMany(players);
    console.log("Players seeded successfully!");
  } catch (e: any) {
    console.log("FAILED TO STORE PLAYERS IN DB", e);
    return new Error(e.message);
  }
};
