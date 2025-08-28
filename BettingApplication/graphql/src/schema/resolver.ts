import axios from "axios";

const BACKEND_URL = "http://localhost:8787/api";

export const resolvers = {
  Query: {
    // Fetch all cricket matches
    cricketMatches: async () => {
      const res = await axios.get(`${BACKEND_URL}/cricketMatch/all`);
      return res.data.map((match: any) => ({
        id: match.id,
        dateTimeGMT: match.dateTimeGMT,
        matchType: match.matchType,
        status: match.status,
        ms: match.ms,
        t1: match.t1,
        t2: match.t2,
        t1s: match.t1s,
        t2s: match.t2s,
        t1img: match.t1img,
        t2img: match.t2img,
        series: match.series,
      }));
    },

    // Fetch a single cricket match by ID
    cricketMatch: async (_: any, args: { id: string }) => {
      const res = await axios.get(`${BACKEND_URL}/cricketMatch/${args.id}`);
      const match = res.data;
      return {
        id: match.id,
        dateTimeGMT: match.dateTimeGMT,
        matchType: match.matchType,
        status: match.status,
        ms: match.ms,
        t1: match.t1,
        t2: match.t2,
        t1s: match.t1s,
        t2s: match.t2s,
        t1img: match.t1img,
        t2img: match.t2img,
        series: match.series,
      };
    },

    // Existing players query
    players: async () => {
      const res = await axios.get(`${BACKEND_URL}/players/all`);
      return res.data.map((player: any) => ({
        id: player._id,
        name: player.name,
        role: player.role,
        team: player.team,
        odds: player.odds,
      }));
    },

    // Optional: existing REST matches query
    matches: async () => {
      const res = await axios.get(`${BACKEND_URL}/matches/all`);
      return res.data.map((match: any) => ({
        id: match._id,
        teamA: match.teamA,
        teamB: match.teamB,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        status: match.status,
        startTime: match.startTime,
      }));
    },

    getUserMoney: async (_: any, args: { email: string }) => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/users/getMoney/${args.email}`
        );
        return {
          email: args.email,
          money: res.data.money,
        };
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch user money"
        );
      }
    },
  },

  Mutation: {
    // Create cricket match
    createCricketMatch: async (_: any, args: any) => {
      const res = await axios.post(
        `${BACKEND_URL}/cricketMatches/createMatch`,
        args
      );
      return res.data;
    },

    // Update cricket match
    updateCricketMatch: async (
      _: any,
      args: { id: string; updateData: any }
    ) => {
      const res = await axios.put(
        `${BACKEND_URL}/cricketMatches/updateMatch/${args.id}`,
        args.updateData
      );
      return res.data;
    },

    // Delete cricket match
    deleteCricketMatch: async (_: any, args: { id: string }) => {
      const res = await axios.delete(
        `${BACKEND_URL}/cricketMatches/deleteMatch/${args.id}`
      );
      return res.data; // should return { message: "Cricket match deleted successfully" }
    },

    // Existing user registration
    createUser: async (
      _: any,
      args: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
      }
    ) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/createUser`, args);
        return {
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
        };
      } catch (error: any) {
        if (error.response && error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong while creating user");
      }
    },

    // Existing user login
    loginUser: async (_: any, args: { email: string; password: string }) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/loginUser`, {
          email: args.email,
          password: args.password,
        });

        return {
          token: res.data.token,
          user: {
            id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            phoneNumber: res.data.user.phoneNumber,
          },
        };
      } catch (error: any) {
        if (error.response && error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error("Invalid email or password");
      }
    },
     // Deposit money
    depositMoney: async (_: any, args: { email: string; amount: number }) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/deposit`, args);
        return {
          email: res.data.email,
          balance: res.data.money,
          deposited: args.amount,
        };
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to deposit money");
      }
    },

    // Withdraw money
    withdrawMoney: async (_: any, args: { email: string; amount: number }) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/withdraw`, args);
        return {
          email: res.data.email,
          balance: res.data.money,
          withdrawn: args.amount,
        };
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to withdraw money");
      }
    },
    
  },
};
