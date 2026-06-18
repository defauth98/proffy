import { count } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../database/connection';
import { connections } from '../database/schema';

export default class ConnectionController {
  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db.insert(connections).values({ userId: Number(user_id) });

    return response.status(201).send();
  }

  async index(request: Request, response: Response) {
    const [totalConnections] = await db
      .select({ total: count() })
      .from(connections);

    return response.json({ total: totalConnections?.total ?? 0 });
  }
}
