import React, {useEffect, useContext} from 'react'
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { styles } from '../theme/AppTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {

  const { signIn, removeError, errorMessage } = useContext(AuthContext)

  const {email, password, onChange} = useForm({
    email: '',
    password: ''
  })

  useEffect(() => {
    if(errorMessage.length === 0) return

    Alert.alert(
      'Login incorrecto',
      errorMessage,
      [
       { 
        text: 'Ok',
        onPress: removeError
       }
      ]
    )
  }, [errorMessage])
  

  const onLogin = () => {
    signIn({correo: email, password})
  }

  return (
  <>
  {/* */}
  <Background />  
  
  <KeyboardAvoidingView
    style={{flex:1}}
    behavior={ (Platform.OS === 'ios') ? 'padding' : 'height'}
  >
  
  <View style={ styles.containerLogin }>
      {/*  */}
      <WhiteLogo />
    
      {/*  */}
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput 
          placeholder='Ingrese su email'
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType='email-address'
          onChangeText={ (value) => onChange(value, 'email')}
          value={email}
          onSubmitEditing={onLogin}
          style={[
            styles.inputField,
            (Platform.OS === 'ios') && styles.inputFieldIOS
          ]}
          selectionColor='white'
          autoCapitalize='none'
          autoCorrect={false}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput 
          placeholder='******'
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType='email-address'
          secureTextEntry={true}
          onChangeText={ (value) => onChange(value, 'password')}
          value={password}
          onSubmitEditing={onLogin}
          style={[
            styles.inputField,
            (Platform.OS === 'ios') && styles.inputFieldIOS
          ]}
          selectionColor='white'
          autoCapitalize='none'
          autoCorrect={false}
      />

      <View style={styles.containerButton}>
          <TouchableOpacity 
            activeOpacity={0.5}
            style={styles.buttonLogin}
            onPress={onLogin}
          >
            <Text style={{ color: 'white', fontSize: 18}}>
                Entrar
            </Text>
          </TouchableOpacity>
      </View>


      <View style={styles.containerRegister}>
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={{ color: 'white', fontSize: 14}}>
                Registrar nueva cuenta
            </Text>
          </TouchableOpacity>
      </View>

  </View>
  </KeyboardAvoidingView>
  </>
  )
}
