import { createStackNavigator } from '@react-navigation/stack';
import Groups from '@screens/Groups';
import NewGroup from '@screens/NewGroup';
import Players from '@screens/Players';

const {Navigator, Screen} = createStackNavigator()

export const AppRoutes = () => {
  return (
    <Navigator  screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroup} />
      <Screen name="Players" component={Players} />


    </Navigator>
  )
}