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
