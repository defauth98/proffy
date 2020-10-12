import React, { ReactNode } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import profileBackgroungImg from '../../assets/images/profile-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
  pageTitle: string;
  perfil?: boolean;
  subject?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
  pageTitle,
  perfil,
  subject,
}) => {
  const { navigate } = useNavigation();

  const { user } = useAuth();

  function handleGoBack() {
    navigate('Landing');
  }

  function renderTitleOrPerfil() {
    if (perfil) {
      return (
        <View style={styles.profileContainer}>
          <ImageBackground
            source={profileBackgroungImg}
            resizeMode="contain"
            style={styles.backgroundImageContainer}
          >
            <Image
              source={{ uri: user?.avatar }}
              style={styles.profileAvatar}
            />
            <Text
              style={styles.profileName}
            >{`${user?.name} ${user?.surname}`}</Text>
            <Text style={styles.profileSubject}>{subject}</Text>
          </ImageBackground>
        </View>
      );
    }

    return <Text style={styles.title}>{title}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Text style={styles.pageTitle}>{pageTitle}</Text>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        {renderTitleOrPerfil()}

        {headerRight}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
