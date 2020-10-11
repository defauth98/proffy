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

interface Subject {
  cost: string;
  subject: number;
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

  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState(user?.surname);
  const [email, setEmail] = useState(user?.email);
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [bio, setBio] = useState(user?.bio);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);

  useEffect(() => {
    async function loadSubject() {
      const response = await api.get(`classes/${user?.id}`);

      setSubject(response.data.class);
      setSchedule(response.data.schedule);
    }

    loadSubject();
  }, []);

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
      default:
        break;
    }

    return;
  }

  async function handleScheduleDelete(
    class_id: string,
    id: number,
    index: number
  ) {
    await api.delete(`schedule/${class_id}/${id}`);

    const scheduleArray = schedule;
    scheduleArray?.splice(index, 1);

    setSchedule(scheduleArray);
  }

  return (
    <View style={styles.container}>
      <PageHeader title={`${name} ${surname}`} pageTitle="Meu perfil" />

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

          {schedule && schedule[0] && (
            <Text style={styles.userTextTitle}>Horários disponíveis</Text>
          )}

          {schedule &&
            schedule.map((scheduleItem, index) => {
              const from = convertToHour(scheduleItem.from);
              const to = convertToHour(scheduleItem.to);

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
                    labelStyles={styles.labelStyle}
                  />
                  <View style={styles.schedules}>
                    <View style={styles.scheduleItem}>
                      <Select
                        label="Das"
                        items={[
                          { label: '07h', value: '7h' },
                          { label: '08h', value: '8h' },
                          { label: '09h', value: '9h' },
                          { label: '10h', value: '10h' },
                          { label: '11h', value: '11h' },
                          { label: '12h', value: '12h' },
                          { label: '13h', value: '13h' },
                          { label: '14h', value: '14h' },
                          { label: '15h', value: '15h' },
                          { label: '16h', value: '16h' },
                          { label: '17h', value: '17h' },
                          { label: '18h', value: '18h' },
                        ]}
                        placeholder="Selecione"
                        defaultValue={from}
                        labelStyles={styles.labelStyle}
                      />
                    </View>

                    <View style={styles.scheduleItem}>
                      <Select
                        label="Até"
                        items={[
                          { label: '07h', value: '7h' },
                          { label: '08h', value: '8h' },
                          { label: '09h', value: '9h' },
                          { label: '10h', value: '10h' },
                          { label: '11h', value: '11h' },
                          { label: '12h', value: '12h' },
                          { label: '13h', value: '13h' },
                          { label: '14h', value: '14h' },
                          { label: '15h', value: '15h' },
                          { label: '16h', value: '16h' },
                          { label: '17h', value: '17h' },
                          { label: '18h', value: '18h' },
                        ]}
                        placeholder="Selecione"
                        defaultValue={to}
                        labelStyles={styles.labelStyle}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      handleScheduleDelete(
                        scheduleItem.class_id,
                        scheduleItem.id,
                        index
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
            <RectButton style={styles.button}>
              <Text style={styles.buttonText}>Salvar alterações</Text>
            </RectButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Perfil;
