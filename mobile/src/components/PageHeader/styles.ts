import {
  Archivo_400Regular,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257e5',
  },
  pageTitle: {
    color: '#D4C2FF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    height: 220,
    width: '100%',
  },
  profileName: {
    color: '#fff',

    fontFamily: 'Archivo_400Regular',
    fontSize: 24,
    lineHeight: 25,
  },
  profileSubject: {
    color: '#D4C2FF',

    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  profileAvatar: {
    width: 140,
    height: 140,

    borderRadius: 75,

    marginBottom: 10,
  },
  backgroundImageContainer: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
