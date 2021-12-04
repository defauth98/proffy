import { Request, response, Response } from 'express';
import db from '../database/connection';

export default class FavoritesController {
  async create(req: Request, res: Response) {
    const { favorite_user_id, favorited_class_id } = req.body;

    const exists = await db('favorites').where({
      favorite_user_id,
      favorited_class_id,
    });

    if (!!exists[0]) {
      return res.status(400).json({ message: 'ja favoritado' });
    }

    try {
      const insertedFavorite = await db('favorites').insert({
        favorite_user_id,
        favorited_class_id,
      });

      return res.json(insertedFavorite);
    } catch (error) {
      return res.json(error);
    }
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const favoritedClasses = await db('favorites')
        .where({ favorite_user_id: id })
        .join('classes', 'classes.id', '=', 'favorites.favorited_class_id')
        .join('users', 'users.id', '=', 'classes.user_id')
        .select([
          'users.name',
          'users.avatar',
          'users.bio',
          'users.email',
          'users.surname',
          'users.whatsapp',
          'users.id as user_id',
          'classes.subject',
          'classes.cost',
          'classes.id as class_id',
          'favorites.id',
        ]);

      return res.status(200).json(favoritedClasses);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db('favorites').where({ id }).del();

      return res.send();
    } catch (error) {
      return res.json(error);
    }
  }
}
