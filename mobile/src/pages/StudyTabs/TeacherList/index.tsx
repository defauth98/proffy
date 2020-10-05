import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';

import PageHeader from '../../../components/PageHeader';
import TeacherItem, { Teacher } from '../../../components/TeacherItem';
import Select from '../../../components/Select';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function LoadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function toggleHandleFiltersVisible() {
    setFilterVisible(!isFilterVisible);
  }

  async function handleFiltersSubmit() {
    LoadFavorites();

    const response = await api.get('classes', {
      params: {
        week_day,
        subject,
        time,
      },
    });

    setTeachers(response.data);
    toggleHandleFiltersVisible();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <PageHeader
        title="Proffs disponíveis"
        headerRight={
          <BorderlessButton onPress={toggleHandleFiltersVisible}>
            <Feather name="filter" size={30} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <ScrollView style={styles.searchForm}>
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
              defaultValue={subject}
              onChangeItem={(item) => setSubject(item.value)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
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
                  defaultValue={week_day}
                  onChangeItem={(item) => setWeekDay(item.value)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Select
                  label="Horário"
                  items={[
                    { label: '00h', value: '00:00' },
                    { label: '01h', value: '01:00' },
                    { label: '02h', value: '02:00' },
                    { label: '03h', value: '03:00' },
                    { label: '05h', value: '05:00' },
                    { label: '06h', value: '06:00' },
                    { label: '07h', value: '07:00' },
                    { label: '08h', value: '08:00' },
                    { label: '09h', value: '09:00' },
                    { label: '10h', value: '10:00' },
                    { label: '11h', value: '11:00' },
                    { label: '12h', value: '12:00' },
                    { label: '13h', value: '13:00' },
                    { label: '14h', value: '14:00' },
                    { label: '15h', value: '15:00' },
                    { label: '16h', value: '16:00' },
                    { label: '17h', value: '17:00' },
                    { label: '18h', value: '18:00' },
                    { label: '19h', value: '19:00' },
                    { label: '20h', value: '20:00' },
                    { label: '21h', value: '21:00' },
                    { label: '22h', value: '22:00' },
                    { label: '23h', value: '23:00' },
                  ]}
                  placeholder="Selecione"
                  defaultValue={time}
                  onChangeItem={(item) => setTime(item.value)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </ScrollView>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TeacherList;
