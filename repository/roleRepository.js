import Repository from "./Repository";

const resource = "/roles";

const roleRepository = Repository;
// roleRepository.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");

export default {
  getRolesUnder(userId) {
    return roleRepository.get(`${resource}`);
  },
};
