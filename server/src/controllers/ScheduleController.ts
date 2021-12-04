import { Request, Response } from 'express';

import db from '../database/connection';

export default class ScheduleControler {
  async create(req: Request, res: Response) {
    const { id } = req.params;

    await db('class_schedule').insert({
      week_day: 1,
      from: 480,
      to: 1020,
      class_id: id,
    });

    return res.status(200).send();
  }

  async delete(req: Request, res: Response) {
    const { class_id, id } = req.params;

    const sheduleItem = await db('class_schedule')
      .where({ class_id })
      .andWhere({ id })
      .del();

    return res.status(200).json({ sheduleItem });
  }
}
