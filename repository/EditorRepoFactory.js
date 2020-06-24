import EditorRepository from "./editor/EditorRepository";
import EditorCategoryRepository from "./editor/EditorCategoryRepository";

const repositories = {
  editor: EditorRepository,
  category: EditorCategoryRepository
};

export const EditorRepositoryFactory = {
  get: name => repositories[name]
};
