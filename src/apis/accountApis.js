import axiosClient from "./axiosClient";
const accountApis = {
  /**
   * Add a new todo
   * @param {object} account
   */
  add: async (account) => {
    try {
      const response = await axiosClient.post("/account", account);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  //  Get a list of users
  getItem: async (id) => {
    try {
      const response = await axiosClient.get("/account/" + id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async () => {
    try {
      const response = await axiosClient.get("/account");
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  // Update by id
  edit: async (user) => {
    try {
      const response = await axiosClient.patch("/users/", user);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  /**
   * Update a todo
   * @param {object} account
   */
  update: async (account) => {
    // Require id to process further
    if (!account.id) throw new Error("Missing id in user object");

    try {
      const response = await axiosClient.patch(
        `/account/${account.id}`,
        account
      );
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },

  /**
   * Remove a todo by id
   * @param {object} accountID
   */
  delete: async (accountID) => {
    try {
      const response = await axiosClient.delete(`/account/${accountID}`);
      return response;
    } catch (error) {
      console.log(error);
      // alert("Cannot connect to API.");
    }
  },
};

export default accountApis;
