// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// expo
import { Ionicons } from '@expo/vector-icons';

// Screen
import ManageExpense from './src/screens/ManageExpense';
import AllExpenses from './src/screens/AllExpenses';
import RecentExpenses from './src/screens/RecentExpenses';

// GlobalStyles
import { GlobalStyles } from './src/constants/GlobalStyles';

// store
import ExpensesProvider from './src/store/expenses-context';

// components
import IconButton from './src/components/UI/IconButton';

const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            color={tintColor}
            size={24}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='ExpensesOverview'>
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: '#fff',
                // contentStyle: {
                //   backgroundColor: GlobalStyles.colors.primary500,
                // },
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}
