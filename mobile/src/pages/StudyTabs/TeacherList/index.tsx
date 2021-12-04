import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  BorderlessButton,
  FlatList,
  RectButton,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../../services/api';

import PageHeader from '../../../components/PageHeader';
import TeacherItem, { Teacher } from '../../../components/TeacherItem';
import Select from '../../../components/Select';

import styles from './styles';

interface FavoriteItem {
  class_id: string;
  user_id: string;
}

const TeacherList: React.FC = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [page, setPage] = useState(1);

  function toggleHandleFiltersVisible() {
    setFilterVisible(!isFilterVisible);
  }

  async function handleFiltersSubmit() {
    const teachers = await api.get('classes', {
      params: {
        week_day,
        subject,
        time,
        page,
      },
    });

    setTeachers(teachers.data);

    toggleHandleFiltersVisible();

    setPage(page + 1);
  }

  async function loadMoreTeachers() {
    const newTeachers = await api.get<[]>('classes', {
      params: {
        week_day,
        subject,
        time,
        page,
      },
    });

    const newItems = Array().concat(teachers, newTeachers.data);

    setTeachers(newItems as any);
  }

  function renderItem(item: Teacher) {
    return <TeacherItem teacher={item} LoadFavorites={() => {}} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <PageHeader
        title="Proffs disponíveis"
        pageTitle="Estudar"
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

      <FlatList
        data={teachers}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.teacherList}
        onEndReached={loadMoreTeachers}
        onEndReachedThreshold={0.1}
      />
    </KeyboardAvoidingView>
  );
};

export default TeacherList;
