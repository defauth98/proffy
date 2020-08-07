import { Request, Response } from 'express'

import db from '../database/connection';
import covertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: "Missing filters to search classes"
      })
    }
  }

  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

    const trx = await db.transaction()

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })

      const user_id = insertedUsersIds[0]

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      })

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: covertHourToMinutes(scheduleItem.from),
          to: covertHourToMinutes(scheduleItem.to)
        }
      })


      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return response.status(201).send()

    } catch (error) {
      console.log(error)

      await trx.rollback()

      return response.status(400).json({
        error: "Unexpected error while creating new class"
      })
    }
  }
}


