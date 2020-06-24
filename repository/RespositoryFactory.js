import UserRepository from "./userRepository";
import AuthRepository from "./authRepository";
import CategoryRepository from "./categoryRepository";
import RoleRepository from "./roleRepository";
import {EmployerRepositoryFactory} from "./EmployerRepoFactory";
import {EditorRepositoryFactory} from "./EditorRepoFactory";

const repositories = {
  auth: AuthRepository,
  user: UserRepository,
  category: CategoryRepository,
  role: RoleRepository,
  employerFactory: EmployerRepositoryFactory,
  editorFactory: EditorRepositoryFactory
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
