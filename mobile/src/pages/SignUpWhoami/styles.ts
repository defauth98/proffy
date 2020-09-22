import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F7',
    padding: 20,
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
  },
  title: {
    marginTop: 90,
    width: 240,
  },
  textTitle: {
    fontSize: 30,
    fontFamily: 'Archivo_400Regular',
    fontWeight: 'bold',
    color: '#32264D',
  },
  textDescription: {
    marginTop: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
  },
  formTitle: {
    fontFamily: 'Archivo_400Regular',
    fontWeight: 'bold',
    color: '#32264D',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    padding: 10,
  },
  button: {
    height: 40,
    width: '100%',
    marginTop: 30,
    borderRadius: 8,
    padding: 24,
    backgroundColor: '#DCDCE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPurple: {
    backgroundColor: '#8257E5',
  },
  buttonText: {
    color: '#9C98A6',
  },
});

export default styles;
