import { and, eq, exists, gt, lte } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../database/connection';
import { classes, classSchedule } from '../database/schema';
import covertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  id?: string | number;
  week_day: number | string;
  from: string;
  to: string;
}

function normalizePage(page: unknown) {
  const pageNumber = Number(page || 1);
  return Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

function mapClassListItem(classItem: any) {
  return {
    class_id: classItem.id,
    subject: classItem.subject,
    cost: classItem.cost,
    user_id: classItem.user.id,
    name: classItem.user.name,
    avatar: classItem.user.avatar,
    bio: classItem.user.bio,
    email: classItem.user.email,
    surname: classItem.user.surname,
    whatsapp: classItem.user.whatsapp,
  };
}

function mapClass(classItem: typeof classes.$inferSelect) {
  return {
    id: classItem.id,
    subject: classItem.subject,
    cost: classItem.cost,
    user_id: classItem.userId,
  };
}

function mapSchedule(scheduleItem: typeof classSchedule.$inferSelect) {
  return {
    id: scheduleItem.id,
    week_day: scheduleItem.weekDay,
    from: scheduleItem.from,
    to: scheduleItem.to,
    class_id: scheduleItem.classId,
    created_at: scheduleItem.createdAt,
  };
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const page = normalizePage(request.query.page);
    const offset = (page - 1) * 5;

    if (id) {
      try {
        const userClass = await db.query.classes.findFirst({
          where: eq(classes.userId, Number(id)),
          with: {
            schedule: true,
          },
        });

        if (!userClass) {
          return response.status(404).json({ error: 'Class not found' });
        }

        return response.status(200).json({
          class: mapClass(userClass),
          schedule: userClass.schedule.map(mapSchedule),
        });
      } catch (error) {
        return response.status(400).json({ error });
      }
    }

    const filters = request.query;

    if (filters.subject && filters.week_day && filters.time) {
      const subject = filters.subject as string;
      const week_day = Number(filters.week_day);
      const time = filters.time as string;

      const timeInMinutes = covertHourToMinutes(time);

      const filteredClasses = await db.query.classes.findMany({
        where: and(
          eq(classes.subject, subject),
          exists(
            db
              .select({ id: classSchedule.id })
              .from(classSchedule)
              .where(
                and(
                  eq(classSchedule.classId, classes.id),
                  eq(classSchedule.weekDay, week_day),
                  lte(classSchedule.from, timeInMinutes),
                  gt(classSchedule.to, timeInMinutes)
                )
              )
          )
        ),
        with: {
          user: true,
        },
        limit: 5,
        offset,
      });

      return response.json(filteredClasses.map(mapClassListItem));
    }

    const allClasses = await db.query.classes.findMany({
      with: {
        user: true,
      },
      limit: 5,
      offset,
    });

    return response.json(allClasses.map(mapClassListItem));
  }

  async create(request: Request, response: Response) {
    const { subject, cost, schedule, user_id } = request.body;

    if (!subject || !cost || !user_id || !Array.isArray(schedule)) {
      return response.status(400).json({ error: 'Dados obrigatórios ausentes' });
    }

    try {
      const [insertedClass] = await db
        .insert(classes)
        .values({
          subject,
          cost: String(cost),
          userId: Number(user_id),
        })
        .returning({ id: classes.id });

      const classId = insertedClass.id;

      await Promise.all(
        schedule.map((scheduleItem: ScheduleItem) =>
          db.insert(classSchedule).values({
            classId,
            weekDay: Number(scheduleItem.week_day),
            from: covertHourToMinutes(scheduleItem.from),
            to: covertHourToMinutes(scheduleItem.to),
          })
        )
      );

      return response.status(201).json({ id: classId });
    } catch (error) {
      console.log(error);

      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { subject, cost, schedule } = request.body;

    if (!subject || !cost || !Array.isArray(schedule)) {
      return response.status(400).json({ error: 'Dados obrigatórios ausentes' });
    }

    try {
      const [updatedClass] = await db
        .update(classes)
        .set({ subject, cost: String(cost) })
        .where(eq(classes.userId, Number(id)))
        .returning({ id: classes.id });

      if (!updatedClass) {
        return response.status(404).json({ error: 'Class not found' });
      }

      const classId = updatedClass.id;

      await Promise.all(
        schedule.map((scheduleItem: ScheduleItem) => {
          const values = {
            weekDay: Number(scheduleItem.week_day),
            from: covertHourToMinutes(scheduleItem.from),
            to: covertHourToMinutes(scheduleItem.to),
          };

          if (scheduleItem.id) {
            return db
              .update(classSchedule)
              .set(values)
              .where(
                and(
                  eq(classSchedule.classId, classId),
                  eq(classSchedule.id, Number(scheduleItem.id))
                )
              );
          }

          return db.insert(classSchedule).values({ ...values, classId });
        })
      );

      return response.status(200).json({ id: classId });
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Erro ao tentar dar update na class' });
    }
  }
}
