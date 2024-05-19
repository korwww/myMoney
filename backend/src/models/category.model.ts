import { AppDataSource } from '../data-source';
import { Category } from '../entity/category.entity';

const categoryRepository = AppDataSource.getRepository(Category);

export const findCategory = async () => {
  return await categoryRepository.find();
};
