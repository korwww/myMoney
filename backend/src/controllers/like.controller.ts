import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';

const likeRepository = AppDataSource.getRepository(Like);

export const addLike = async (req: Request, res: Response) => {
  res.status(200).send('좋아요 추가');
};

export const removeLike = async (req: Request, res: Response) => {
  res.status(200).send('좋아요 삭제');
};
