import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$platinumColor'
  },
  topContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$alabasterColor'
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  customFont: {
    fontFamily: 'sansBold'
  },
  separator: {
    height: 1,
    opacity: 0.1,
    backgroundColor: '$blackColor',
    marginTop: 15,
    marginBottom: 15,
    width: 1000
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 20
  }
});

export default styles;
