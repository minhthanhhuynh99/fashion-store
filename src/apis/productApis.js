import axiosClient from "./axiosClient";
const productApis = {
  /**
   * Add a new todo
   * @param {object} product
   */
  add: async (product) => {
    try {
      const response = await axiosClient.post("/products", product);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/products");
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
  getItem: async (id) => {
    try {
      const response = await axiosClient.get("/products/" + id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // Update by id
  edit: async (data) => {
    try {
      const response = await axiosClient.patch("/products/", data);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  /**
   * Update a todo
   * @param {object} product
   */
  update: async (product) => {
    // Require id to process further
    if (!product.id) throw new Error("Missing id in todo object");

    try {
      const response = await axiosClient.patch(
        `/products/${product.id}`,
        product
      );
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
  /**
   * Remove a todo by id
   * @param {object} productID
   */
  delete: async (productID) => {
    try {
      const response = await axiosClient.delete(`/products/${productID}`);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
};

export default productApis;
