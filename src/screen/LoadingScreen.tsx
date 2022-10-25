import React from 'react'
import { ActivityIndicator, View } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View 
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} 
    >
        <ActivityIndicator 
            color='#5856D6'
            size={30}
        />
    </View>
  )
}
