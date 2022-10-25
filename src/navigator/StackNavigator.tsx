import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen';
import { ProtectedScreen } from '../screen/ProtectedScreen';
import { LoadingScreen } from '../screen/LoadingScreen';
import { ProductNavigator } from './ProductNavigator';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  const {status} = useContext(AuthContext)

  if(status === 'checking') return <LoadingScreen />

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            headerStyle: {
                elevation:0
            },
            cardStyle:{
            backgroundColor:'white'
            }
        }}
    >

        { (status !== 'authenticated') 
        ? (
         <>
           <Stack.Screen name="LoginScreen" component={LoginScreen} />
           <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> 
         </>
         )
        : 
        <>
        <Stack.Screen name="ProductNavigator" component={ProductNavigator} />
        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>
      }

      
    </Stack.Navigator>
  );
}