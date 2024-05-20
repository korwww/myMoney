import { Response, Request } from 'express';
import { serviceGetCategory } from '../services/category.service';

interface ICategoryItem {
  id: number;
  name: string;
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategoryItem[] = await serviceGetCategory();
    res.status(200).send(category);
  } catch (error) {
    throw error;
  }
};
