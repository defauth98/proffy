import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import db from '../database/connection'

import { saltRounds } from './AuthController'

export default class UserController {
  async index(req: Request, res: Response) {
    const users = await db('users');

    if (!users) {
      return res.status(400).json({
        error: "Erro ao listar os usuários"
      })
    }

    return res.json(users);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db('users').where({ id }).del();

      return res.status(204).json({
        message: 'Usuário deletado com sucesso.'
      });

    } catch (error) {

      return res.status(400).json({
        error: 'Erro inesperado ao tentar deletar um usuário'
      })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password } = req.body;

    const userExists = await db('users').where({ id });

    if (!userExists[0]) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    try {
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await db('users').insert({
            email,
            password: hash
          })
        })
      })

    }
    catch (error) {

      return res.status(400).json({
        error: "Erro inesperado ao tentar dar upgrade no usuário."
      })

    }
  }

}