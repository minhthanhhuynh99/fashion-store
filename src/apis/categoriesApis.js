import axiosClient from "./axiosClient";
const categoriesApis = {
  /**
   * Add a new todo
   * @param {object} category
   */
  add: async (category) => {
    try {
      const response = await axiosClient.post("/categories", category);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  //  Get a list of users
  getAll: async () => {
    try {
      const response = await axiosClient.get("/categories");
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  // Update by id
  edit: async (data) => {
    try {
      const response = await axiosClient.patch("/categories/", data);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },

  /**
   * Update a todo
   * @param {object} category
   */
  update: async (category) => {
    // Require id to process further
    if (!category.id) throw new Error("Missing id in todo object");

    try {
      const response = await axiosClient.patch(
        `/categories/${category.id}`,
        category
      );
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
  /**
   * Remove a todo by id
   * @param {object} categoryID
   */
  delete: async (categoryID) => {
    try {
      const response = await axiosClient.delete(`/categories/${categoryID}`);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
};

export default categoriesApis;
