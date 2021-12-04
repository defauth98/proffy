import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/connection';
import crypto from 'crypto';

import mailer from '../modules/mailer';

import 'dotenv/config';

const secret = process.env.SECRET as string;

export const saltRounds = 10;

function generateToken(id: string) {
  return jwt.sign({ id }, secret, {
    expiresIn: 86400,
  });
}

export default class AuthController {
  async signin(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;

    try {
      const userExists = await db('users').where({ email });

      if (userExists[0]) {
        return res.status(400).json({
          error: 'Email já cadastrado',
        });
      }

      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await db('users').insert({
            name,
            surname,
            email,
            password: hash,
          });

          const newUser = await db('users')
            .where({ email })
            .select(
              'users.id',
              'users.name',
              'users.surname',
              'users.email',
              'users.whatsapp',
              'users.bio',
              'users.avatar'
            );

          return res.status(200).json({
            user: newUser,
            token: generateToken(newUser[0].id),
          });
        });
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Erro inesperado ao criar o usuário' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userExists = await db('users')
        .where({ email })
        .select('users.password');

      if (!userExists[0]) {
        return res.status(400).json({ Error: 'Email not exists' });
      }
      const userPassword = userExists[0].password;

      const users = await db('users')
        .where({ email })
        .select(
          'users.id',
          'users.name',
          'users.surname',
          'users.email',
          'users.whatsapp',
          'users.bio',
          'users.avatar'
        );

      await bcrypt.compare(password, userPassword, function (err, result) {
        if (result) {
          const token = generateToken(userExists[0].id);

          return res.status(200).json({ user: users[0], token });
        } else {
          return res.status(400).json({ error: 'Wrong password' });
        }
      });
    } catch (error) {
      return res.status(400).json({ error: 'Login error' });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await db('users').where({ email });

      if (!user) return res.status(400).json({ error: 'User not found' });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      const updatedUserID = await db('users')
        .update({
          passwordResetToken: token,
          passwordResetExpires: now,
        })
        .where({ email });

      const updatedUser = await db('users').where({ id: updatedUserID });

      await mailer.sendMail({
        from: 'ProffyApp <app@proffy.com>',
        to: email,
        subject: 'Recuperação de Senha',
        text: `Link para recuperar senha: http://localhost:3000/recovery-password/${token}`,
      });
      return res.json({ updatedUser });
    } catch (error) {
      return res.json({ error });
    }
  }

  async recoveryPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.query;
    const now = Date.now();

    const userExists = await db('users').where({ passwordResetToken: token });

    const user = userExists[0];

    try {
      if (now <= user.passwordResetExpires) {
        if (user) {
          await bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              const updatedUserID = await db('users')
                .update({
                  password: hash,
                  passwordResetToken: null,
                  passwordResetExpires: null,
                })
                .where({ passwordResetToken: token });

              const updatedUser = await db('users')
                .where({
                  id: updatedUserID,
                })
                .select('users.name', 'users.surname', 'users.email');

              return res.status(200).json({ updatedUser });
            });
          });
        }
      } else {
        return res.status(400).json({ error: 'token expires' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'cat not update user password' });
    }
  }
}
