import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formInputs: {},
  inputWrapper: {
    backgroundColor: '#F0F0F7',
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E6E6F0',
    position: 'relative',
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
  closedEyeIcon: {
    position: 'absolute',

    right: 12,
    bottom: 4,

    height: 40,
    width: 40,
  },
});

export default styles;
