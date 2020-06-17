import Repository from "./Repository";

const resource = "/categories";
export default {
  getAllCategories() {
    return Repository.get(`${resource}/all`);
  },
  getCategoriesByPage(page) {
    return Repository.get(`${resource}?page=${page}`);
  },
};
