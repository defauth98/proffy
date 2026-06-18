import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import db from '../database/connection';
import { users } from '../database/schema';
import mailer from '../modules/mailer';

import 'dotenv/config';

const secret = process.env.SECRET as string;

export const saltRounds = 10;

function generateToken(id: string | number) {
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  return jwt.sign({ id }, secret, {
    expiresIn: 86400,
  });
}

function normalizeDate(value: Date | string | number) {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function toPublicUser(user: typeof users.$inferSelect) {
  const { password: _password, passwordResetToken: _token, passwordResetExpires: _expires, ...publicUser } = user;

  return publicUser;
}

export default class AuthController {
  async signin(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
    }

    try {
      const userExists = await db.query.users.findFirst({
        columns: { id: true },
        where: eq(users.email, email),
      });

      if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const hash = await bcrypt.hash(password, saltRounds);

      const [insertedUser] = await db
        .insert(users)
        .values({ name, surname, email, password: hash })
        .returning();

      return res.status(201).json({
        user: [toPublicUser(insertedUser)],
        token: generateToken(insertedUser.id),
      });
    } catch (error) {
      console.error(error);

      return res
        .status(400)
        .json({ error: 'Erro inesperado ao criar o usuário' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user || !user.password) {
        return res.status(400).json({ error: 'Email not exists' });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return res.status(400).json({ error: 'Wrong password' });
      }

      const token = generateToken(user.id);

      return res.status(200).json({ user: toPublicUser(user), token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    try {
      const user = await db.query.users.findFirst({
        columns: { id: true },
        where: eq(users.email, email),
      });

      if (!user) return res.status(400).json({ error: 'User not found' });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      const [updatedUser] = await db
        .update(users)
        .set({ passwordResetToken: token, passwordResetExpires: now })
        .where(eq(users.email, email))
        .returning({
          id: users.id,
          name: users.name,
          surname: users.surname,
          email: users.email,
        });

      await mailer.sendMail({
        from: 'ProffyApp <app@proffy.com>',
        to: email,
        subject: 'Recuperação de Senha',
        text: `Link para recuperar senha: http://localhost:3000/recovery-password/${token}`,
      });
      return res.json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao solicitar recuperação de senha' });
    }
  }

  async recoveryPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.query;

    if (!password || !token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Senha e token são obrigatórios' });
    }

    try {
      const user = await db.query.users.findFirst({
        columns: { id: true, passwordResetExpires: true },
        where: eq(users.passwordResetToken, token),
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      if (!user.passwordResetExpires || Date.now() > normalizeDate(user.passwordResetExpires)) {
        return res.status(400).json({ error: 'token expires' });
      }

      const hash = await bcrypt.hash(password, saltRounds);

      const [updatedUser] = await db
        .update(users)
        .set({
          password: hash,
          passwordResetToken: null,
          passwordResetExpires: null,
        })
        .where(eq(users.passwordResetToken, token))
        .returning({
          name: users.name,
          surname: users.surname,
          email: users.email,
        });

      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error: 'Can not update user password' });
    }
  }
}
