import { Request, Response } from 'express';

import db from '../database/connection';

export default class UserController {
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const users = await db('users')
      .where({ id })
      .select(
        'users.id',
        'users.name',
        'users.surname',
        'users.email',
        'users.avatar',
        'users.whatsapp',
        'users.bio'
      );

    if (!users) {
      return res.status(400).json({
        error: 'Erro ao listar os usuários',
      });
    }

    return res.json(users);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db('users').where({ id }).del();

      return res.status(204).json({
        message: 'Usuário deletado com sucesso.',
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Erro inesperado ao tentar deletar um usuário',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, surname, email, whatsapp, bio, avatar } = req.body;

    try {
      await db('users')
        .update({ name, surname, whatsapp, email, bio, avatar })
        .where({ id });

      return res.status(200).json({ message: 'success' });
    } catch (error) {}
  }
}
