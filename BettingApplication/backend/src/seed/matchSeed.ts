import mongoose from "mongoose";
import Match from "../models/matchModel";

const seedMatches = async () => {
  await mongoose.connect("mongodb://localhost:27017/dream11");

  const matches = [
    {
      id: "1",
      teamA: "India",
      teamB: "Australia",
      status: "live",
      startTime: new Date(),
    },
    {
      id: "2",
      teamA: "England",
      teamB: "Pakistan",
      status: "upcoming",
      startTime: new Date(Date.now() + 3600000),
    },
    {
      id: "3",
      teamA: "South Africa",
      teamB: "New Zealand",
      status: "completed",
      startTime: new Date(Date.now() - 7200000),
    },
  ];

  await Match.insertMany(matches);
  console.log("Seeded match data!");
  mongoose.disconnect();
};

seedMatches();
