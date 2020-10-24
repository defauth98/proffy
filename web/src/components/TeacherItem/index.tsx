import React, { useEffect, useState } from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
  class_id: string;
}

export interface TeacherItemProps {
  teacher: Teacher;
}

interface scheduleItem {
  from: Number;
  to: Number;
  week_day: Number;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const [monday, setMonday] = useState<scheduleItem | null>(null);
  const [tuesday, setTuesday] = useState<scheduleItem | null>(null);
  const [wednesday, setWednesday] = useState<scheduleItem | null>(null);
  const [thursday, setThursday] = useState<scheduleItem | null>(null);
  const [friday, setFriday] = useState<scheduleItem | null>(null);

  useEffect(() => {
    api.get(`classes/${teacher.class_id}`).then((response) => {
      response?.data.schedule.map((responseItem: scheduleItem) => {
        switch (responseItem.week_day) {
          case 1:
            setMonday(responseItem);
            break;
          case 2:
            setTuesday(responseItem);
            break;
          case 3:
            setWednesday(responseItem);
            break;
          case 4:
            setThursday(responseItem);
            break;
          case 5:
            setFriday(responseItem);
            break;
          default:
            break;
        }
      });
    });
  }, [teacher, teacher.id]);

  function createNewConnection() {
    api.post('connections', { user_id: teacher.id });
  }

  function convertToHour(date: any): String {
    const hour = date / 60;

    let hourString = hour.toString();

    return `${hourString}h`;
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className="schedule-container">
        <div
          className={`schedule-item ${monday?.from ? '' : 'schedule-item-off'}`}
        >
          <h3>Dia</h3>
          <span>Segunda</span>

          <h3>Horário</h3>
          <span>{`${monday?.from ? convertToHour(monday?.from) : ''} - ${
            monday?.to ? convertToHour(monday?.to) : ''
          }`}</span>
        </div>
        <div
          className={`schedule-item ${
            tuesday?.from ? '' : 'schedule-item-off'
          }`}
        >
          <h3>Dia</h3>
          <span>Terça</span>

          <h3>Horário</h3>
          <span>{`${tuesday?.from ? convertToHour(tuesday?.from) : ''} - ${
            tuesday?.to ? convertToHour(tuesday?.to) : ''
          }`}</span>
        </div>
        <div
          className={`schedule-item ${
            wednesday?.from ? '' : 'schedule-item-off'
          }`}
        >
          <h3>Dia</h3>
          <span>Quarta</span>

          <h3>Horário</h3>
          <span>{`${wednesday?.from ? convertToHour(wednesday?.from) : ''} - ${
            wednesday?.to ? convertToHour(wednesday?.to) : ''
          }`}</span>
        </div>
        <div
          className={`schedule-item ${
            thursday?.from ? '' : 'schedule-item-off'
          }`}
        >
          <h3>Dia</h3>
          <span>Quinta</span>

          <h3>Horário</h3>
          <span>{`${thursday?.from ? convertToHour(thursday?.from) : ''} - ${
            thursday?.to ? convertToHour(thursday?.to) : ''
          }`}</span>
        </div>
        <div
          className={`schedule-item ${friday?.from ? '' : 'schedule-item-off'}`}
        >
          <h3>Dia</h3>
          <span>Sexta</span>

          <h3>Horário</h3>
          <span>{`${friday?.from ? convertToHour(friday?.from) : ''} - ${
            friday?.to ? convertToHour(friday?.to) : ''
          }`}</span>
        </div>
      </div>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>

        <a
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
        >
          <img src={whatsAppIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
