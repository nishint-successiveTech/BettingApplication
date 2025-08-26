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
        console.log("hi");
        
        const res = await axios.post(`${BACKEND_URL}/createUser`, args);
   
        return {
          id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber,
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
