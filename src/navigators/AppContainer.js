import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeComponent from '../components/HomeComponent';
import SurveyComponent from '../components/SurveyComponent';

const AppNavigator = createStackNavigator(
  {
    Home: HomeComponent,
    Survey: SurveyComponent,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
