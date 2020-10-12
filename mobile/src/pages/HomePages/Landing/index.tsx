import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { UserData } from '../../../contexts/auth';

import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import styles from './styles';

import landingImg from '../../../assets/images/landing.png';
import studyIcon from '../../../assets/images/icons/study.png';
import giveClassesIcon from '../../../assets/images/icons/give-classes.png';
import heartIcon from '../../../assets/images/icons/heart.png';
import logoutIcon from '../../../assets/images/icons/Sair.png';
import defaultAvatar from '../../../assets/images/default-avatar.png';

function Landing() {
  const [totalConnections, setTotalConnections] = useState('');
  const [userData, setUser] = useState<UserData | null>({} as UserData);

  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });

    setUser(user as UserData);
  }, []);

  function handleNavigateToClassesPage() {
    navigation.navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigation.navigate('StudyTabs');
  }

  function handleNagivateToPerfil() {
    navigation.navigate('Perfil');
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headerContainer}>
          <RectButton onPress={handleNagivateToPerfil}>
            <View style={styles.perfilContainer}>
              <Image
                style={styles.userAvatar}
                source={
                  userData?.avatar
                    ? {
                        uri: userData?.avatar,
                      }
                    : defaultAvatar
                }
              />
              <Text
                style={styles.userName}
              >{`${userData?.name} ${userData?.surname}`}</Text>
            </View>
          </RectButton>
          <RectButton onPress={handleSignOut}>
            <View style={styles.logoutContainer}>
              <Image source={logoutIcon} />
            </View>
          </RectButton>
        </View>
        <View style={styles.bannerContainer}>
          <Image source={landingImg} style={styles.banner} />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleNavigateToStudyPages}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Image source={studyIcon}></Image>

            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>

          <RectButton
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => {
              handleNavigateToClassesPage();
            }}
          >
            <Image source={giveClassesIcon}></Image>

            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas{' '}
          <Image source={heartIcon} />
        </Text>
      </View>
    </View>
  );
}

export default Landing;
