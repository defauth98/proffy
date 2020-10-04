import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#8257e5',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 40,
    marginBottom: 20,
  },
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  logoutContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#774DD6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  bannerContainer: {
    paddingHorizontal: 40,
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  heading: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#9871f5',
  },
  buttonSecondary: {
    backgroundColor: '#04d361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 30,
  },
});

export default styles;
