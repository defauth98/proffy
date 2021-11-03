import React, { useState, FormEvent, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import warningIcon from '../../../assets/images/icons/warning.svg';

import './styles.css';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';

import PageHeader from '../../../components/PageHeader';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';

import defaultAvatar from '../../../assets/images/default-avatar.png';

interface ScheduleItem {
  week_day: string;
  from: Number;
  to: Number;
  id: Number;
}

function TeacherForm() {
  const history = useHistory();

  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [isNewClass, setIsNewClass] = useState(true);
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const { user } = useAuth();

  useEffect(() => {
    async function getUserData() {
      const userData = await api.get(`/users/${user?.id}`);

      setAvatar(userData.data[0].avatar || '');
      setBio(userData.data[0].bio);
      setWhatsapp(userData.data[0].whatsapp);

      try {
        const userClass = await api.get(`/classes/${user?.id}`);

        setSubject(userClass.data.class.subject);
        setCost(userClass.data.class.cost);
        const scheduleItemsData = userClass.data.schedule;

        const convertedScheduleItems = scheduleItemsData.map(
          (item: ScheduleItem) => {
            return {
              week_day: item.week_day,
              from: ConvertToDate(item.from),
              to: ConvertToDate(item.to),
              id: item.id,
            };
          }
        );
        setIsNewClass(false);
        setScheduleItems(convertedScheduleItems);
      } catch (error) {
        setIsNewClass(true);
      }
    }

    getUserData();
  }, [user]);

  function ConvertToDate(date: any): String {
    const hour = date / 60;
    const minutes = date - hour * 60;

    let hourString = hour.toString();
    let minutesString = minutes.toString();

    if (hour / 10 < 1) hourString = '0' + hourString;

    if (minutes / 10 < 1) minutesString = '0' + minutesString;

    return `${hourString}:${minutesString}`;
  }

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
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

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    if (isNewClass) {
      api
        .post('classes', {
          user_id: user && user?.id,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          history.push('/give-classes-succes');
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert(
        'Já foi realizado o cadastro, vá para a página de perfil para editar'
      );
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse
        formulário de inscrição."
        pageTitle="Dar aulas"
      />

      <main>
        <form onSubmit={(event) => handleCreateClass(event)}>
          <fieldset>
            <legend>Seus dados</legend>

            <div id="userbutton-container">
              <Link to="/" id="perfil-button">
                <img src={avatar || defaultAvatar} alt="Avatar do proffy" />
                <span>
                  {user?.name} {user?.surname}
                </span>
              </Link>
              <Input
                name="whatsapp"
                label="Whatsapp"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                }}
              />
            </div>

            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
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
              name="cost"
              label="Custo da hora por aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
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
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                    value={scheduleItem.from}
                    name="from"
                    label="Das"
                    type="time"
                  />
                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                    value={scheduleItem.to}
                    name="to"
                    label="Até"
                    type="time"
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
