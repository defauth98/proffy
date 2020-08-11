import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles'
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [isFilterVisible, setFilterVisible] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function LoadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  function toggleHandleFiltersVisible() {
    setFilterVisible(!isFilterVisible)
  }

  async function handleFiltersSubmit() {
    LoadFavorites()

    const response = await api.get("classes", {
      params: {
        week_day,
        subject,
        time,
      },
    });

    console.log(response.data)

    setTeachers(response.data);
    toggleHandleFiltersVisible()
  }

  return (
    <View style={styles.container} >
      <PageHeader
        title="Proffs disponíveis"
        headerRight={(
          <BorderlessButton onPress={toggleHandleFiltersVisible}>
            <Feather name="filter" size={30} color="#fff" />
          </BorderlessButton>
        )}>
        {
          isFilterVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                placeholderTextColor="#c1bccc"
                style={styles.input}
                placeholder="Qual a matéria?"
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    placeholderTextColor="#c1bccc"
                    style={styles.input}
                    placeholder="Qual o dia?"
                    value={week_day}
                    onChangeText={(text) => setWeekDay(text)}
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    placeholderTextColor="#c1bccc"
                    style={styles.input}
                    placeholder="Qual horário?"
                    value={time}
                    onChangeText={(text) => setTime(text)}
                  />
                </View>
              </View>

              <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        }
        )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;