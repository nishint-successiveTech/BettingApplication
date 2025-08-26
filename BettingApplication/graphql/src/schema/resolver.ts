// import axios from "axios";

// const BACKEND_URL = "http://localhost:8787/api";

// export const resolvers = {
//   Query: {
//     // Fetch all live matches
//     matches: async () => {
//       const res = await axios.get(`${BACKEND_URL}/matches/all`);
//       return res.data;
//     },
    
//     // Fetch a single match by ID
//     match: async (_: any, args: { id: string }) => {
//       const res = await axios.get(`${BACKEND_URL}/matches/${args.id}`);
//       return res.data;
//     },
//   },

//   Mutation: {
//     // User registration
//     createUser: async (
//       _: any,
//       args: {
//         name: string;
//         email: string;
//         phoneNumber: string;
//         password: string;
//       }
//     ) => {
//       try {
//         const res = await axios.post(`${BACKEND_URL}/users/createUser`, args);
//         return {
//           id: res.data._id,
//           name: res.data.name,
//           email: res.data.email,
//           phoneNumber: res.data.phoneNumber,
//         };
//       } catch (error: any) {
//         if (error.response && error.response.data?.message) {
//           throw new Error(error.response.data.message);
//         }
//         throw new Error("Something went wrong while creating user");
//       }
//     },

//     // User login
//     loginUser: async (_: any, args: { email: string; password: string }) => {
//       try {
//         const res = await axios.post(`${BACKEND_URL}/users/loginUser`, {
//           email: args.email,
//           password: args.password,
//         });

//         return {
//           token: res.data.token,
//           user: {
//             id: res.data.user._id,
//             name: res.data.user.name,
//             email: res.data.user.email,
//             phoneNumber: res.data.user.phoneNumber,
//           },
//         };
//       } catch (error: any) {
//         if (error.response && error.response.data?.message) {
//           throw new Error(error.response.data.message);
//         }
//         throw new Error("Invalid email or password");
//       }
//     },
//   },
// };

import axios from "axios";

const BACKEND_URL = "http://localhost:8787/api";

export const resolvers = {
  Query: {
    // Fetch all matches
    matches: async () => {
      const res = await axios.get(`${BACKEND_URL}/matches/all`);
      return res.data.map((match: any) => ({
        id: match._id,      // map MongoDB _id to GraphQL id
        teamA: match.teamA,
        teamB: match.teamB,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        status: match.status,
        startTime: match.startTime,
      }));
    },

    // Fetch a single match by ID
    match: async (_: any, args: { id: string }) => {
      const res = await axios.get(`${BACKEND_URL}/matches/${args.id}`);
      const match = res.data;
      return {
        id: match._id,
        teamA: match.teamA,
        teamB: match.teamB,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        status: match.status,
        startTime: match.startTime,
      };
    },
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
  },

  Mutation: {
    // User registration
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

    // User login
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
  },
};

