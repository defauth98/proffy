import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoWrapper: {
    flex: 1,
    backgroundColor: '#8257e5',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
  },
  backgroundImageWrapper: {
    resizeMode: 'cover',

    width: 250,
    height: 250,

    alignItems: 'center',
    justifyContent: 'center',
  },
  logoProffy: {
    width: 150,
    height: 90,
  },
  logoText: {
    width: 150,
  },

  formWrapper: {
    flex: 1,

    paddingHorizontal: 20,
    paddingVertical: 40,

    backgroundColor: '#E6E6F0',
  },

  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formHeaderText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#32264D',
    fontSize: 26,
  },
  formHeaderRightButton: {},
  rightButtonText: {
    color: '#8257E5',
  },

  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 30,
  },
  remember: {},
  forget: {},
  formButton: {
    backgroundColor: '#04D361',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  formButtonText: {
    fontFamily: 'Archivo_400Regular',
    color: '#fff',
    fontSize: 24,
  },
  formInputs: {},
  inputWrapper: {
    backgroundColor: '#F0F0F7',
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },
  formInput: {},
  formInputPassword: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  formInputEmail: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default styles;
