import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../../contexts/auth';

import PageHeader from '../../../components/PageHeader';
import TeacherItem, { Teacher } from '../../../components/TeacherItem';

import styles from './styles';

import api from '../../../services/api';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  const { user } = useAuth();

  async function LoadFavorites() {
    const response = await api.get(`/favorites/${user && user?.id}`);

    setFavorites(response.data);
  }

  useFocusEffect(
    React.useCallback(() => {
      LoadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" pageTitle="Estudar" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
              LoadFavorites={LoadFavorites}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
