import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
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
    const response = await api.get(`favorites/${user?.id}`);

    setFavorites(response.data);
  }

  useFocusEffect(
    React.useCallback(() => {
      LoadFavorites();
    }, [])
  );

  function renderItem(item: Teacher) {
    return <TeacherItem teacher={item} LoadFavorites={LoadFavorites} />;
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" pageTitle="Estudar" />

      <FlatList
        data={favorites}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.teacherList}
      />
    </View>
  );
};

export default Favorites;
