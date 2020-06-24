import EmployerRepository from "./employer/employerRepository";
import EUserRepository from "./employer/EUserRepository";

const repositories = {
  employer: EmployerRepository,
  user: EUserRepository
};

export const EmployerRepositoryFactory = {
  get: name => repositories[name]
};
