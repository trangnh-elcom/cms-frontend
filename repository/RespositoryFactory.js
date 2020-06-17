import UserRepository from "./userRepository";
import AuthRepository from "./authRepository";
import CategoryRepository from "./categoryRepository";
import RoleRepository from "./roleRepository";

const repositories = {
  auth: AuthRepository,
  user: UserRepository,
  category: CategoryRepository,
  role: RoleRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
