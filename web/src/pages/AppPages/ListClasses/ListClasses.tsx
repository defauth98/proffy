import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../../components/PageHeader';
import TeacherItem from '../../../components/TeacherItem';

import './ListClassesStyles.css';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { Class } from '../../../type/classes';
import {
  requestAllClasses,
  requestFilteredClasses,
} from '../../../services/classesApi';

function ListClasses() {
  const [teachers, setTeachers] = useState<Class[]>([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [page, setPage] = useState(1);

  async function getAllClasses() {
    const response = await requestAllClasses();

    if (response) {
      setTeachers(response);
    }
  }

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await requestFilteredClasses({
      week_day: weekDay,
      subject,
      time,
      page,
    });

    setTeachers(response);

    const newPage = page + 1;

    setPage(newPage);
  }

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes sãos os proffys disponíveis' pageTitle='Estudar'>
        <form id='search-teachers' onSubmit={searchTeachers}>
          <Select
            name='subject'
            label='Matéria'
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            value={subject}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
              { value: 'Matemática', label: 'Matemática' },
            ]}
          />
          <Select
            name='weekDay'
            label='Dia da semana'
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            value={weekDay}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type='time'
            name='time'
            label='Hora'
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
          />
          <button type='submit' onClick={searchTeachers}>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Class) => (
          <TeacherItem
            key={`${teacher.id} ${teacher.name}`}
            teacher={teacher}
          />
        ))}
      </main>
    </div>
  );
}

export default ListClasses;
