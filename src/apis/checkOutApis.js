import axiosClient from "./axiosClient";
const checkOutApis = {
  /**
   * Add a new todo
   * @param {object} checkout
   */
  add: async (checkout) => {
    try {
      const response = await axiosClient.post("/checkout", checkout);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/checkout");
      return response;
    } catch (error) {
      console.log(error);
      // console.log("Cannot connect to API.");
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/checkout/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default checkOutApis;