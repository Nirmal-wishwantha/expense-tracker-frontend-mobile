import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../Home/Home';
import AddExpenses from '../../AddExpenses/AddExpenses';

const Drawer = createDrawerNavigator();

export default function DrawerTab() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Add Expenses" component={AddExpenses} />
    </Drawer.Navigator>
  );
}