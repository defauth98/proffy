import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../database/connection';
import { users } from '../database/schema';

export default class UserController {
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const user = await db.query.users.findFirst({
      columns: {
        id: true,
        name: true,
        surname: true,
        email: true,
        avatar: true,
        whatsapp: true,
        bio: true,
      },
      where: eq(users.id, Number(id)),
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json([user]);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db.delete(users).where(eq(users.id, Number(id)));

      return res.status(204).json({ message: 'Usuário deletado com sucesso.' });
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
      const [updatedUser] = await db
        .update(users)
        .set({ name, surname, email, whatsapp, bio, avatar })
        .where(eq(users.id, Number(id)))
        .returning({ id: users.id });

      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json({ message: 'success' });
    } catch (error) {
      return res.status(400).json({
        error: 'Erro inesperado ao tentar atualizar o usuário',
      });
    }
  }
}
