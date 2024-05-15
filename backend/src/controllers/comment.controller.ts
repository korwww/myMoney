import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Comment } from '../entity/comments.entity';

const commentRepository = AppDataSource.getRepository(Comment);

export const findAll = async (req: Request, res: Response) => {
  res.status(200).send('댓글 조회');
};

export const updateComment = async (req: Request, res: Response) => {
  res.status(200).send('댓글 수정');
};

export const deleteComment = async (req: Request, res: Response) => {
  res.status(200).send('댓글 삭제');
};
