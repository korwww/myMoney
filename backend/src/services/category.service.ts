import { findCategory } from '../models/category.model';

export const serviceGetCategory = async () => {
  return await findCategory();
};
