import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userWrapper: {
    backgroundColor: '#F0F0F7',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: '#FFF',
    height: '69.7%',

    padding: 14,
    paddingBottom: 30,
    marginTop: -30,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
  },
  userTextTitle: {
    color: '#32264D',

    paddingBottom: 8,

    marginBottom: 22,
    marginTop: 22,

    borderBottomWidth: 1,
    borderBottomColor: '#E6E6F0',

    fontFamily: 'Archivo_700Bold',
    fontSize: 18,
  },
  labelStyle: {
    color: '#9C98A6',
  },
  button: {
    marginTop: 10,
    marginBottom: 80,
    backgroundColor: '#04D361',
    padding: 20,

    alignItems: 'center',

    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },
  schedules: {
    width: '100%',

    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  scheduleItem: {
    width: '45%',
  },
  delete: {
    width: '100%',

    alignItems: 'center',
    marginBottom: 14,
  },
  deleteText: {
    color: 'red',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E6E6F0',

    paddingTop: 10,
    marginTop: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingBottom: 8,

    marginBottom: 22,
    marginTop: 22,

    borderBottomWidth: 1,
    borderBottomColor: '#E6E6F0',
  },
  scheduleAddText: {
    color: '#8257E5',
  },
  scheduleText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 18,
  },
});

export default styles;
