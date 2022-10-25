import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Text, View, StyleSheet, Button } from 'react-native';

export const ProtectedScreen = () => {
  
  const { token,  user, logOut} = useContext(AuthContext)
  
  return (
    <View
      style={{...styles.container}}
    >
        <Text style={{marginBottom: 10}}>Protected Screen</Text>
    
      <Button 
        color='#5856D6'
        title='Logout'
        onPress={ logOut }
      />
        
        <Text style={{marginBottom: 10}}>
          {JSON.stringify(user, null, 5)}
        </Text>

        <Text style={{marginBottom: 10}}>{ token }</Text>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
})
