import React from 'react';
import Home from './screens/Home'
import Detail from './screens/Detail'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </ActionSheetProvider>
    </NavigationContainer>
  );
}
