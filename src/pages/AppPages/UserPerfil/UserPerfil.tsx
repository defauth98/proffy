import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './userPerfil.css';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';

import PageHeader from '../../../components/PageHeader';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import Loading from '../../../components/Loading';

import warningIcon from '../../../assets/images/icons/warning.png';

interface ScheduleItem {
  week_day: string;
  from: Number;
  to: Number;
  id: Number;
}

function UserPerfil() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [userSubject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: '',
      to: '',
      id: '',
    },
  ]);

  const { user } = useAuth();

  function ConvertToDate(date: any): String {
    const hour = date / 60;
    const minutes = date - hour * 60;

    let hourString = hour.toString();
    let minutesString = minutes.toString();

    if (hour / 10 < 1) hourString = `0${hourString}`;

    if (minutes / 10 < 1) minutesString = `0${minutesString}`;

    return `${hourString}:${minutesString}`;
  }

  useEffect(() => {
    async function getUserData() {
      const userData = await api.get(`/users/${user?.id}`);

      setName(`${userData.data[0].name} ${userData.data[0].surname}`);
      setAvatar(userData.data[0].avatar || '');
      setBio(userData.data[0].bio);
      setWhatsapp(userData.data[0].whatsapp);

      try {
        const userClass = await api.get(`/classes/${user?.id}`);

        setSubject(userClass.data.class.subject);
        setCost(userClass.data.class.cost);
        const scheduleItemsData = userClass.data.schedule;

        const convertedScheduleItems = scheduleItemsData.map(
          (item: ScheduleItem) => ({
            week_day: item.week_day,
            from: ConvertToDate(item.from),
            to: ConvertToDate(item.to),
            id: item.id,
          }),
        );

        setScheduleItems(convertedScheduleItems);
      } catch (error) {
        setSubject('');
        setCost('');
      }
    }

    getUserData();
  }, [user]);

  async function addNewScheduleItem() {
    await api.post(`/schedule/${user?.id}`);
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
        id: '',
      },
    ]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItem);
  }

  function handleUpdateClass(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    const firstName = name.split(' ')[0];

    const surnamesArray = name.split(' ');

    const surnamesArrayWithoutFirst = surnamesArray.map((surname, index) => {
      if (index !== 0) {
        return surname;
      }

      return null;
    });

    let surnames = '';

    surnamesArrayWithoutFirst.forEach((surname) => {
      if (surname !== null) surnames += `${surname} `;
    });

    api
      .put(`users/${user?.id}`, {
        name: firstName,
        surname: surnames,
        avatar,
        whatsapp,
        bio,
      })
      .then(() => {
        if (userSubject.length > 3) {
          api
            .put(`/classes/${user?.id}`, {
              subject: userSubject,
              cost,
              schedule: scheduleItems,
            })

            .then(() => {
              alert('Update realizado com sucesso');
              navigate('/');
            })
            .catch(() => {
              alert('Erro ao tentar submeter o formulário');
            });
        } else {
          alert('Sucesso ao editar o perfil');
        }
      });

    setIsLoading(false);
  }

  async function handleDeleteScheduleItem(event: FormEvent, id: Number) {
    event.preventDefault();

    try {
      await api.delete(`/schedule/${user?.id}/${id}`, {});

      const userClass = await api.get(`/classes/${user?.id}`);

      const scheduleItemsData = userClass.data.schedule;

      const convertedScheduleItems = scheduleItemsData.map(
        (item: ScheduleItem) => ({
          week_day: item.week_day,
          from: ConvertToDate(item.from),
          to: ConvertToDate(item.to),
          id: item.id,
        }),
      );

      setScheduleItems(convertedScheduleItems);

      alert('Deletado com sucesso');
    } catch (error) {
      alert(error);
    }
  }

  // eslint-disable-next-line consistent-return
  function renderClassFields() {
    if (userSubject.length > 3) {
      return (
        <>
          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name='subject'
              label='Matéria'
              value={userSubject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
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
            <Input
              name='cost'
              label='Custo da hora por aula'
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button
                type='button'
                onClick={addNewScheduleItem}
                id='legend-button'
              >
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.id} className='schedule-container-perfil'>
                <div className='schedule-item-perfil'>
                  <Select
                    name='week_day'
                    label='Dia da semana'
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                    value={scheduleItem.week_day}
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
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                    value={scheduleItem.from}
                    name='from'
                    label='Das'
                    type='time'
                  />
                  <Input
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                    value={scheduleItem.to}
                    name='to'
                    label='Até'
                    type='time'
                  />
                </div>
                <button
                  id='delete-button'
                  onClick={(event) => handleDeleteScheduleItem(event, index)}
                  type='button'
                >
                  Excluir horário
                </button>
              </div>
            ))}
          </fieldset>
        </>
      );
    }
  }

  return (
    <div id='page-perfil' className='container'>
      <PageHeader pageTitle='Meu perfil' subject={userSubject} />

      <main>
        <form onSubmit={(event) => handleUpdateClass(event)}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name='whatsapp'
              label='Whatsapp'
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              label='Biografia'
              name='bio'
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          {renderClassFields()}

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type='submit'>
              {isLoading ? (
                <Loading type='spin' color='green' width={30} height={30} />
              ) : (
                'Salvar cadastro'
              )}
            </button>
          </footer>
        </form>
      </main>
      <br />
    </div>
  );
}

export default UserPerfil;
