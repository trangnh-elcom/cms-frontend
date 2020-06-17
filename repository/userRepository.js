import Repository from "./Repository";

const resource = "/users";

const userRepository = Repository;
// userRepository.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");

export default {
  getUserById(userId) {
    return userRepository.get(`${resource}/${userId}`);
  },
  getUsersByPage(page){
    return userRepository.get(`${resource}?page=${page}`);
  }
};
