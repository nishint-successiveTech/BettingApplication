import axios from "axios";
import CricketMatchModel,{ICricketMatch} from "../models/cricketMatchModel";

class CricketMatchSeed {
  public static async run() {
    try {
      // Fetch data from API
      const response = await axios.get(
        "https://api.cricapi.com/v1/cricScore?apikey=1cb8e527-9ac1-45cc-a1a2-e2a83cf2d318"
      );

      const matchesData = response.data.data; // Use `data` array

      for (const match of matchesData) {
        // Skip if match already exists
        const existing = await CricketMatchModel.findOne({ id: match.id });
        if (existing) continue;

        // Map fields to model
        const newMatch: Partial<ICricketMatch> = {
          id: match.id,
          dateTimeGMT: new Date(match.dateTimeGMT),
          matchType: match.matchType,
          status: match.status,
          ms: match.ms,
          t1: match.t1,
          t2: match.t2,
          t1s: match.t1s || "",
          t2s: match.t2s || "",
          t1img: match.t1img || "",
          t2img: match.t2img || "",
          series: match.series || "",
        };

        await CricketMatchModel.create(newMatch);
      }

      console.log("✅ Cricket matches seeded successfully!");
    } catch (error: any) {
      console.error("❌ Error seeding cricket matches:", error.message);
    }
  }
}

export default CricketMatchSeed;


// import axios from "axios";
// import CricketMatchModel, { ICricketMatch } from "../models/cricketMatchModel";

// class CricketMatchSeed {
//   public static async run() {
//     try {
//       // Step 1: Fetch all live/upcoming matches
//       const response = await axios.get(
//         "https://api.cricapi.com/v1/cricScore?apikey=1cb8e527-9ac1-45cc-a1a2-e2a83cf2d318"
//       );
// console.log("Raw API Response:", JSON.stringify(response.data, null, 2));
//       // Safe check for array
//       const matchesData = Array.isArray(response.data.data)
//         ? response.data.data
//         : [];

//       if (matchesData.length === 0) {
//         console.log("⚠️ No matches found or invalid API response");
//         return;
//       }

//       // Step 2: Loop through matches
//       for (const match of matchesData) {
//         // Step 3: Fetch squad for this match
//         let teams: any[] = [];
//         try {
//           const squadRes = await axios.get(
//             `https://api.cricapi.com/v1/match_squad?apikey=1cb8e527-9ac1-45cc-a1a2-e2a83cf2d318&id=${match.id}`
//           );
//           teams = Array.isArray(squadRes.data.data) ? squadRes.data.data : [];
//         } catch (squadErr) {
//           console.error(`⚠️ Could not fetch squad for match ${match.id}`);
//         }

//         // Step 4: Map data to schema
//         const matchData: Partial<ICricketMatch> = {
//           id: match.id,
//           dateTimeGMT: new Date(match.dateTimeGMT),
//           matchType: match.matchType,
//           status: match.status,
//           ms: match.ms,
//           t1: match.t1,
//           t2: match.t2,
//           t1s: match.t1s || "",
//           t2s: match.t2s || "",
//           t1img: match.t1img || "",
//           t2img: match.t2img || "",
//           series: match.series || "",
//           teams: teams.map((team: any) => ({
//             teamName: team.teamName,
//             shortname: team.shortname,
//             img: team.img || "",
//             players: (team.players || []).map((p: any) => ({
//               id: p.id,
//               name: p.name,
//               role: p.role,
//               battingStyle: p.battingStyle || "",
//               bowlingStyle: p.bowlingStyle || "",
//               country: p.country || "",
//               playerImg: p.playerImg || "",
//             })),
//           })),
//         };

//         // Step 5: Insert or Update in DB
//         await CricketMatchModel.findOneAndUpdate(
//           { id: match.id }, // find by match id
//           { $set: matchData }, // update fields
//           { upsert: true, new: true } // create if not exist
//         );
//       }

//       console.log("✅ Cricket matches + squads seeded/updated successfully!");
//     } catch (error: any) {
//       console.error("❌ Error seeding cricket matches:", error.message);
//     }
//   }
// }

// export default CricketMatchSeed;
