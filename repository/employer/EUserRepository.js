import Repository from "../Repository";

const resource = "/employer/users";

const userRepository = Repository;
// userRepository.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");

export default {
  deleteUserById(email) {
    return userRepository.delete(`${resource}/${email}`);
  },
  updateUserByEmail(email, payload){
    return userRepository.put(`${resource}/${email}`, payload);
  },
  addUserByAdmin(payload){
    return userRepository.post(`${resource}`, payload);
  }
};
