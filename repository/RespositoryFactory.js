import UserRepository from "./userRepository";
import AuthRepository from "./authRepository";
import CategoryRepository from "./categoryRepository";
import RoleRepository from "./roleRepository";
import {EmployerRepositoryFactory} from "./EmployerRepoFactory";

const repositories = {
  auth: AuthRepository,
  user: UserRepository,
  category: CategoryRepository,
  role: RoleRepository,
  employerFactory: EmployerRepositoryFactory
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
