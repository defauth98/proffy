import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../contexts/auth';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Inputs';

import styles from './styles';
import Select from '../../../components/Select';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../../services/api';

import convertToHour from '../../../utils/convertToHour';
import convertHourToMinutes from '../../../utils/convertHourToMinutes';
import { useNavigation } from '@react-navigation/native';

interface Subject {
  id: string;
  cost: string;
  subject: string;
}

interface ScheduleItem {
  class_id: string;
  from: number;
  to: number;
  week_day: number;
  id: number;
}

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState(user?.surname);
  const [email, setEmail] = useState(user?.email);
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [bio, setBio] = useState(user?.bio);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);

  useEffect(() => {
    loadSubject();
  }, []);

  async function loadSubject() {
    const response = await api.get(`classes/${user?.id}`);

    setSubject(response.data.class);

    const schedule = response.data.schedule.map(
      (scheduleItem: ScheduleItem) => {
        return {
          id: scheduleItem.id,
          week_day: scheduleItem.week_day,
          class_id: scheduleItem.class_id,
          from: convertToHour(scheduleItem.from),
          to: convertToHour(scheduleItem.to),
        };
      }
    );

    setSchedule(schedule);
  }

  function onChangeValue(newValue: string, input: string) {
    switch (input) {
      case 'Nome':
        setName(newValue);
        break;
      case 'Sobrenome':
        setSurname(newValue);
        break;
      case 'E-mail':
        setEmail(newValue);
        break;
      case 'Whatsapp':
        setWhatsapp(newValue);
        break;
      case 'Avatar':
        setAvatar(newValue);
        break;
      case 'Bio':
        setBio(newValue);
        break;
      case 'Custo da sua hora por aula':
        subject &&
          setSubject({
            id: subject?.id,
            cost: newValue,
            subject: subject.subject,
          });
      default:
        break;
    }

    return;
  }

  async function handleScheduleDelete(class_id: string, id: number) {
    await api.delete(`schedule/${class_id}/${id}`);

    loadSubject();
  }

  async function handleAddNewScheduleItem() {
    await api.post(`schedule/${subject?.id}`);

    loadSubject();
  }

  async function handleSubmit() {
    await api.put(`users/${user?.id}`, {
      name,
      surname,
      email,
      whatsapp,
      avatar,
      bio,
    });

    await api.put(`classes/${user?.id}`, {
      subject: subject?.subject,
      cost: subject?.cost,
      schedule: schedule,
    });

    navigation.navigate('Landing');
  }

  function handleUpdateSchedule(index: number, value: any, field: string) {
    const scheduleArray = schedule?.slice();

    const scheduleItem = scheduleArray && scheduleArray[index];

    if (field === 'from' || field === 'to') {
      if (field === 'from') {
        if (scheduleItem) scheduleItem.from = value;
      } else {
        if (scheduleItem) scheduleItem.to = value;
      }
    } else {
      if (scheduleItem) scheduleItem.week_day = value;
    }

    if (scheduleArray) setSchedule(scheduleArray);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={`${name} ${surname}`}
        pageTitle="Meu perfil"
        perfil={true}
        subject={subject?.subject}
      />

      <View style={styles.userWrapper}>
        <ScrollView style={styles.userContainer}>
          <Text style={styles.userTextTitle}>Seus dados</Text>
          <Input label="Nome" content={name} onChangeValue={onChangeValue} />
          <Input
            label="Sobrenome"
            content={surname}
            onChangeValue={onChangeValue}
          />
          <Input label="E-mail" content={email} onChangeValue={onChangeValue} />
          <Input
            label="Whatsapp"
            content={whatsapp}
            onChangeValue={onChangeValue}
          />
          <Input
            label="Avatar"
            content={avatar}
            onChangeValue={onChangeValue}
          />
          <Input
            label="Bio"
            content={bio}
            textarea
            numberOfLines={4}
            onChangeValue={onChangeValue}
          />

          <Text style={styles.userTextTitle}>Sobre a aula</Text>

          <Input
            label="Matéria"
            content={subject?.subject}
            onChangeValue={onChangeValue}
          />

          <Input
            label="Custo da sua hora por aula"
            content={subject?.cost.toString()}
            onChangeValue={onChangeValue}
          />

          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleText}>Horários disponíveis</Text>
            <TouchableOpacity onPress={handleAddNewScheduleItem}>
              <Text style={styles.scheduleAddText}>+ Novo</Text>
            </TouchableOpacity>
          </View>

          {schedule &&
            schedule.map((scheduleItem, index) => {
              return (
                <View key={`${scheduleItem.class_id}${index}`}>
                  <Select
                    label="Dia da semana"
                    key={scheduleItem.class_id}
                    items={[
                      { label: 'Segunda', value: 1 },
                      { label: 'Terça', value: 2 },
                      { label: 'Quarta', value: 3 },
                      { label: 'Quinta', value: 4 },
                      { label: 'Sexta', value: 5 },
                    ]}
                    placeholder="Selecione"
                    defaultValue={scheduleItem.week_day}
                    onChangeItem={(item) =>
                      handleUpdateSchedule(index, item.value, 'week_day')
                    }
                    labelStyles={styles.labelStyle}
                  />
                  <View style={styles.schedules}>
                    <View style={styles.scheduleItem}>
                      <Select
                        label="Das"
                        items={[
                          { label: '07h', value: '7:00' },
                          { label: '08h', value: '8:00' },
                          { label: '09h', value: '9:00' },
                          { label: '10h', value: '10:00' },
                          { label: '11h', value: '11:00' },
                          { label: '12h', value: '12:00' },
                          { label: '13h', value: '13:00' },
                          { label: '14h', value: '14:00' },
                          { label: '15h', value: '15:00' },
                          { label: '16h', value: '16:00' },
                          { label: '17h', value: '17:00' },
                          { label: '18h', value: '18:00' },
                        ]}
                        placeholder="Selecione"
                        defaultValue={scheduleItem.from}
                        labelStyles={styles.labelStyle}
                        onChangeItem={(item) =>
                          handleUpdateSchedule(index, item.value, 'from')
                        }
                      />
                    </View>

                    <View style={styles.scheduleItem}>
                      <Select
                        label="Até"
                        items={[
                          { label: '07h', value: '7:00' },
                          { label: '08h', value: '8:00' },
                          { label: '09h', value: '9:00' },
                          { label: '10h', value: '10:00' },
                          { label: '11h', value: '11:00' },
                          { label: '12h', value: '12:00' },
                          { label: '13h', value: '13:00' },
                          { label: '14h', value: '14:00' },
                          { label: '15h', value: '15:00' },
                          { label: '16h', value: '16:00' },
                          { label: '17h', value: '17:00' },
                          { label: '18h', value: '18:00' },
                        ]}
                        placeholder="Selecione"
                        defaultValue={scheduleItem.to}
                        labelStyles={styles.labelStyle}
                        onChangeItem={(item) =>
                          handleUpdateSchedule(index, item.value, 'to')
                        }
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      handleScheduleDelete(
                        scheduleItem.class_id,
                        scheduleItem.id
                      )
                    }
                  >
                    <View style={styles.delete}>
                      <Text style={styles.deleteText}>Excluir horário</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar alterações</Text>
            </RectButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Perfil;
