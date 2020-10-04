import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Archivo_400Regular',
    textAlign: 'center',
    width: 300,
    fontSize: 40,
  },
  description: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    width: 300,
    fontSize: 15,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    padding: 24,
    backgroundColor: '#04D361',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default styles;
