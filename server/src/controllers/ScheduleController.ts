import { Request, Response } from 'express';

import db from '../database/connection';

export default class ScheduleControler {
  async create(request: Request, response: Response) {
    const { id } = request.params;

    console.log('chegou aq');

    await db('class_schedule').insert({
      week_day: 1,
      to: 600,
      from: 720,
      class_id: id,
    });

    return response.status(200).send();
  }
}
