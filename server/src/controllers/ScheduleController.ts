import { and, eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import db from '../database/connection';
import { classes, classSchedule } from '../database/schema';

async function resolveClassId(id: string) {
  const numericId = Number(id);

  const classById = await db.query.classes.findFirst({
    columns: { id: true },
    where: eq(classes.id, numericId),
  });

  if (classById) {
    return classById.id;
  }

  const classByUserId = await db.query.classes.findFirst({
    columns: { id: true },
    where: eq(classes.userId, numericId),
  });

  return classByUserId?.id;
}

export default class ScheduleControler {
  async create(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const classId = await resolveClassId(id);

      if (!classId) {
        return res.status(404).json({ error: 'Class not found' });
      }

      await db.insert(classSchedule).values({
        weekDay: 1,
        from: 480,
        to: 1020,
        classId,
      });

      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar horário' });
    }
  }

  async delete(req: Request, res: Response) {
    const { class_id, id } = req.params;

    try {
      const resolvedClassId = await resolveClassId(class_id);

      if (!resolvedClassId) {
        return res.status(404).json({ error: 'Class not found' });
      }

      const sheduleItem = await db
        .delete(classSchedule)
        .where(
          and(
            eq(classSchedule.classId, resolvedClassId),
            eq(classSchedule.id, Number(id))
          )
        )
        .returning({ id: classSchedule.id });

      return res.status(200).json({ sheduleItem: sheduleItem.length });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar horário' });
    }
  }
}
