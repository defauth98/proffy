import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    flex: 3,

    backgroundColor: '#8257E5',

    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    marginTop: 30,
    height: '35%',
    width: '35%',
  },
  informationWrapper: {
    flex: 4,
    backgroundColor: '#F0F0F7',
    paddingLeft: 24,

    justifyContent: 'space-between',
  },
  textContainer: {},
  textNumber: {
    color: '#6A6180',
    fontFamily: 'Archivo_400Regular',
    fontSize: 40,
    opacity: 0.16,

    marginTop: 20,
  },
  textDescription: {
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
    fontSize: 24,
    lineHeight: 34,
    width: '70%',

    marginTop: 20,
  },
  footerContainer: {
    width: '90%',
    height: '45%',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  actualPageShow: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  firstCircle: {
    backgroundColor: '#8257E5',
    width: 5,
    height: 5,
    borderRadius: 2,
  },
  secondCircle: {
    backgroundColor: '#C1BCCC',
    width: 5,
    height: 5,
    borderRadius: 2,
    marginLeft: 10,
  },
  arrowImage: {},
});

export default styles;
