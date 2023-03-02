import axiosClient from "./axiosClient";
const cartOderApis = {
  /**
   * Add a new todo
   * @param {object} cartOder
   */
  add: async (cartOder) => {
    try {
      const response = await axiosClient.post("/cartOder", cartOder);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/cartOder");
      return response;
    } catch (error) {
      console.log(error);
      // console.log("Cannot connect to API.");
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/cartOder/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Cannot connect to API.");
    }
  },
  update: async (cart) => {
    try {
      const response = await axiosClient.patch(`/cartOder/${cart.id}`,cart);
      return response;
    } catch (error) {
      console.log(error);
      console.log("Cannot connect to API.");
    }
  },
};

export default cartOderApis;