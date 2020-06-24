import Repository from "../Repository";

const resource = "/editor/categories";

const categoryRepository = Repository;
// categoryRepository.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");

export default {
  deleteCategoryById(uuid) {
    return categoryRepository.delete(`${resource}/${uuid}`);
  },
  updateCategoryById(uuid, payload){
    return categoryRepository.put(`${resource}/${uuid}`, payload);
  },
  addCategory(payload) {
    return Repository.post(`${resource}`, payload)
  }
};
