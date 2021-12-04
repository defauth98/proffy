import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Inputs';
import Select from '../../../components/Select';

import styles from './styles';

import api from '../../../services/api';

import convertToHour from '../../../utils/convertToHour';

import defaultImage from '../../../assets/images/default-avatar.png';

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

const GiveClasses: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);

  const [exists, setExists] = useState(false);

  useEffect(() => {
    loadSubject();
  }, []);

  useEffect(() => {
    if (schedule === null) setSchedule([{} as ScheduleItem]);
  }, []);

  async function loadSubject() {
    try {
      const response = await api.get(`classes/${user?.id}`);

      setExists(!!response.data.class);

      setSubject(response.data.class);

      if (response.data.schedule[0].class_id) {
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
    } catch (error) {}
  }

  function onChangeValue(newValue: string, input: string) {
    switch (input) {
      case 'Matéria':
        setSubject({
          subject: newValue,
          cost: subject?.cost || '',
        } as Subject);
        break;
      case 'Custo da sua hora por aula':
        setSubject({
          cost: newValue,
          subject: subject?.subject || '',
        } as Subject);
      default:
        break;
    }

    return;
  }

  async function handleAddNewScheduleItem() {
    if (schedule) {
      setSchedule([...schedule, {} as ScheduleItem]);
    }
  }

  async function handleSubmit() {
    if (exists) {
      await api.put(`classes/${user?.id}`, {
        subject: subject?.subject,
        cost: subject?.cost,
        schedule: schedule,
      });

      navigation.navigate('Landing');
    } else {
      await api.post(`classes/`, {
        user_id: user?.id,
        subject: subject?.subject,
        cost: subject?.cost,
        schedule: schedule,
      });

      navigation.navigate('RegisterSuccess');
    }
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
        pageTitle="Dar aulas"
        title="Que incrível que você
        quer dar aulas."
        description="O primeiro passo, é preencher esse
        formulário de inscrição."
      ></PageHeader>

      <View style={styles.userWrapper}>
        <ScrollView style={styles.userContainer}>
          <Text style={styles.userTextTitle}>Seus dados</Text>

          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={user?.avatar ? { uri: user.avatar } : defaultImage}
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name} {user?.surname}
              </Text>
              <Text style={styles.profileSubject}>{subject?.subject}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.userTextTitle}>Sobre a aula</Text>

          <Select
            label="Matéria"
            items={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
            ]}
            placeholder="Selecione"
            defaultValue={subject?.subject}
            onChangeItem={(item) => onChangeValue(item.value, 'Matéria')}
            labelStyles={styles.labelStyle}
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
                <View key={`${scheduleItem.week_day}${index}`}>
                  <Select
                    label="Dia da semana"
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
                </View>
              );
            })}
          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar cadastro</Text>
            </RectButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default GiveClasses;
