import axiosClient from "./axiosClient";
const rolesApi = {
  /**
   * Add a new todo
   * @param {object} user
   */
  add: async (user) => {
    try {
      const response = await axiosClient.post("/roles", user);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/roles");
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },
};
export default rolesApi;
