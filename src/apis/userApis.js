import axiosClient from "./axiosClient";
const userApis = {
  /**
   * Add a new todo
   * @param {object} user
   */
  add: async (user) => {
    try {
      const response = await axiosClient.post("/users", user);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/users");
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },
  getItem: async (id) => {
    try {
      const response = await axiosClient.get("/users/" + id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // Update by id
  edit: async (user) => {
    try {
      const response = await axiosClient.patch(`/users/${user.id}`, user);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  /**
   * Update a todo
   * @param {object} user
   */
  update: async (user) => {
    // Require id to process further
    if (!user.id) throw new Error("Missing id in user object");

    try {
      const response = await axiosClient.patch(`/users/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  /**
   * Remove a todo by id
   * @param {object} userID
   */
  delete: async (userID) => {
    try {
      const response = await axiosClient.delete(`/users/${userID}`);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },
};

export default userApis;
