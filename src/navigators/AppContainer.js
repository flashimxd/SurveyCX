import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeComponent from '../components/HomeComponent';

const AppNavigator = createStackNavigator(
  {
    Home: HomeComponent,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
