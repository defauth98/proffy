import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F7',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 30,
    marginTop: 30,
  },
  titleWrapper: {},
  formWrapper: {},
  title: {
    marginTop: 30,
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

    marginBottom: 40,
  },

  buttonText: {
    color: '#9C98A6',
  },
  buttonPurple: {
    backgroundColor: '#8257E5',
  },
  buttonPurpleText: {
    color: '#FFF',
  },
});

export default styles;
