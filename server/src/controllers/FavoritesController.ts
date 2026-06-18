import { and, eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../database/connection';
import { favorites } from '../database/schema';

export default class FavoritesController {
  async create(req: Request, res: Response) {
    const { favorite_user_id, favorited_class_id } = req.body;

    const exists = await db.query.favorites.findFirst({
      columns: { id: true },
      where: and(
        eq(favorites.favoriteUserId, Number(favorite_user_id)),
        eq(favorites.favoritedClassId, Number(favorited_class_id))
      ),
    });

    if (exists) {
      return res.status(400).json({ message: 'ja favoritado' });
    }

    try {
      const insertedFavorite = await db
        .insert(favorites)
        .values({
          favoriteUserId: Number(favorite_user_id),
          favoritedClassId: Number(favorited_class_id),
        })
        .returning({ id: favorites.id });

      return res.json(insertedFavorite.map((favorite) => favorite.id));
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const favoritedClasses = await db.query.favorites.findMany({
        where: eq(favorites.favoriteUserId, Number(id)),
        with: {
          favoritedClass: {
            with: {
              user: true,
            },
          },
        },
      });

      return res.status(200).json(
        favoritedClasses.map((favorite) => ({
          name: favorite.favoritedClass.user.name,
          avatar: favorite.favoritedClass.user.avatar,
          bio: favorite.favoritedClass.user.bio,
          email: favorite.favoritedClass.user.email,
          surname: favorite.favoritedClass.user.surname,
          whatsapp: favorite.favoritedClass.user.whatsapp,
          user_id: favorite.favoritedClass.user.id,
          subject: favorite.favoritedClass.subject,
          cost: favorite.favoritedClass.cost,
          class_id: favorite.favoritedClass.id,
          id: favorite.id,
        }))
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db.delete(favorites).where(eq(favorites.id, Number(id)));

      return res.send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
