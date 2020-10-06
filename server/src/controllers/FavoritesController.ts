import { Request, Response } from 'express';
import db from '../database/connection';

export default class FavoritesController {
  async create(req: Request, res: Response) {
    const { favorite_user_id, favorited_class_id } = req.body;

    try {
      const insertedFavorite = await db('favorites').insert({
        favorite_user_id,
        favorited_class_id,
      });

      res.json(insertedFavorite);
    } catch (error) {
      res.json(error);
    }
  }

  async index(req: Request, res: Response) {
    // user id
    const { id } = req.params;

    const favoritedClasses = await db('favorites')
      .where({ user_id: id })
      .join('classes', 'classes.id', '=', 'favorites.favorited_class_id')
      .join('users', 'users.id', '=', 'favorites.favorite_user_id')
      .select([
        'users.name',
        'users.avatar',
        'users.bio',
        'users.email',
        'users.surname',
        'users.whatsapp',
        'classes.subject',
        'classes.cost',
        'classes.id',
      ]);

    return res.status(200).json(favoritedClasses);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db('favorites').del().where({ id });

      return res.send();
    } catch (error) {
      return res.json(error);
    }
  }
}
