import axios from "axios";

const BACKEND_URL = "http://localhost:8787/api/users";

export const resolvers = {
  Query: {
    users: async () => {
      const res = await axios.get(BACKEND_URL);
      console.log(res);
      
      return res.data;
    },
    user: async (_: any, args: { id: string }) => {
      const res = await axios.get(`${BACKEND_URL}/${args.id}`);
      return res.data;
    },
  },

  Mutation: {
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
        
        const res = await axios.post(`${BACKEND_URL}/createUser`, args);
        console.log(res.data);
        
        return {
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
        };
      } catch (error) {
         if (error.response && error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong while creating user");
      }
    },
   // resolvers.ts
loginUser: async (_: any, args: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/loginUser`, {
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
