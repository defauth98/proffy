import React, { useEffect, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';
import arrowIcon from '../../assets/images/icons/seta.png';

import styles from './styles';
import api from '../../services/api';

import ConvertToHour from '../../utils/convertToHour';
import { useAuth } from '../../contexts/auth';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
  class_id: string;
  user_id: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  LoadFavorites(): void;
}

interface scheduleItem {
  from: Number;
  to: Number;
  week_day: Number;
}

interface ResponseItem {
  class_id: string;
  id: string;
  user_id: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
  LoadFavorites,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [monday, setMonday] = useState<scheduleItem | null>(null);
  const [tuesday, setTuesday] = useState<scheduleItem | null>(null);
  const [wednesday, setWednesday] = useState<scheduleItem | null>(null);
  const [thursday, setThursday] = useState<scheduleItem | null>(null);
  const [friday, setFriday] = useState<scheduleItem | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    async function getSchedule() {
      const response = await api.get(`classes/${teacher.user_id}`);

      response?.data.schedule.map((responseItem: scheduleItem) => {
        switch (responseItem.week_day) {
          case 1:
            setMonday(responseItem);
            break;
          case 2:
            setTuesday(responseItem);
            break;
          case 3:
            setWednesday(responseItem);
            break;
          case 4:
            setThursday(responseItem);
            break;
          case 5:
            setFriday(responseItem);
            break;
          default:
            break;
        }
      });
    }

    getSchedule();
  }, []);

  useEffect(() => {
    async function checkIsfavorited() {
      const response = await api.get(`favorites/${user?.id}`);

      response.data.map((responseItem: ResponseItem) => {
        if (teacher.class_id === responseItem.class_id) {
          setIsFavorited(true);
        }
      });
    }

    checkIsfavorited();
  }, []);

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  async function handleToggleFavorite() {
    if (isFavorited === true) {
      await api.delete(`favorites/${teacher?.id}`);
      setIsFavorited(false);
    } else {
      await api.post('favorites', {
        favorite_user_id: user?.id,
        favorited_class_id: teacher.class_id,
      });
      setIsFavorited(true);
    }

    LoadFavorites();
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.scheduleItemWrapper}>
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.textLeft}>Dia</Text>
            <Text style={styles.textRight}>Horário</Text>
          </View>
          <View style={styles.scheduleItems}>
            <View
              style={[
                styles.scheduleItem,
                monday === null && styles.scheduleItemDisable,
              ]}
            >
              <Text style={styles.scheduleWeekDay}>Segunda</Text>
              <Image source={arrowIcon} />
              <Text style={styles.scheduleHour}>
                {monday ? ConvertToHour(monday.from) : ' '}
                {' - '}
                {monday ? ConvertToHour(monday.to) : ' '}
              </Text>
            </View>
            <View
              style={[
                styles.scheduleItem,
                tuesday === null && styles.scheduleItemDisable,
              ]}
            >
              <Text style={styles.scheduleWeekDay}>Terça</Text>
              <Image source={arrowIcon} />
              <Text style={styles.scheduleHour}>
                {tuesday ? ConvertToHour(tuesday.from) : ' '}
                {' - '}
                {tuesday ? ConvertToHour(tuesday.to) : ' '}
              </Text>
            </View>
            <View
              style={[
                styles.scheduleItem,
                wednesday === null && styles.scheduleItemDisable,
              ]}
            >
              <Text style={styles.scheduleWeekDay}>Quarta</Text>
              <Image source={arrowIcon} />
              <Text style={styles.scheduleHour}>
                {wednesday ? ConvertToHour(wednesday.from) : ' '}
                {' - '}
                {wednesday ? ConvertToHour(wednesday.to) : ' '}
              </Text>
            </View>
            <View
              style={[
                styles.scheduleItem,
                thursday === null && styles.scheduleItemDisable,
              ]}
            >
              <Text style={styles.scheduleWeekDay}>Quinta</Text>
              <Image source={arrowIcon} />
              <Text style={styles.scheduleHour}>
                {thursday ? ConvertToHour(thursday.from) : ' '}
                {' - '}
                {thursday ? ConvertToHour(thursday.to) : ' '}
              </Text>
            </View>
            <View
              style={[
                styles.scheduleItem,
                friday === null && styles.scheduleItemDisable,
              ]}
            >
              <Text style={styles.scheduleWeekDay}>Sexta</Text>
              <Image source={arrowIcon} />
              <Text style={styles.scheduleHour}>
                {friday ? ConvertToHour(friday.from) : ' '}
                {' - '}
                {friday ? ConvertToHour(friday.to) : ' '}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {`   `}
          <Text style={styles.priceValue}>R${teacher.cost},00 reais</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unFavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsAppIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato.</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
