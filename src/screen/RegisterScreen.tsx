import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { styles } from '../theme/AppTheme'
import { StackScreenProps } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'


interface Props extends StackScreenProps <any, any> {}

export const RegisterScreen = ({navigation}: Props) => {

  const { signUp, errorMessage, removeError } = useContext(AuthContext)

  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if(errorMessage.length === 0) return
    
    Alert.alert(
      'Error registro',
      errorMessage,
      [
       {
        text: 'Ok',
        onPress: removeError
       }
      ]
    )
  }, [errorMessage])


  const onRegister = () => {
    signUp({nombre: name, correo: email, password})
    Keyboard.dismiss()
  }

  return (
    <>
    {/* */}
    <View style={{
      flex: 1,
      backgroundColor:'#5856D6',
    
    }}>  
    
    <KeyboardAvoidingView
      style={{flex:1}}
      behavior={ (Platform.OS === 'ios') ? 'padding' : 'height'}
    >
    
    <View style={ {...styles.containerLogin} }>
        {/*  */}
        <WhiteLogo />
      
        {/*  */}
        <Text style={styles.title}>Registro</Text>
  
        <Text style={styles.label}>Nombre:</Text>
        <TextInput 
            placeholder='Ingresa tu nombre'
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={ (value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            style={[
              styles.inputField,
              (Platform.OS === 'ios') && styles.inputFieldIOS
            ]}
            selectionColor='white'
            autoCapitalize='words'
            autoCorrect={false}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput 
            placeholder='Ingrese su email'
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType='email-address'
            onChangeText={ (value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
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
              onPress={onRegister}
            >
              <Text style={{ color: 'white', fontSize: 15}}>
                  Registrar
              </Text>
            </TouchableOpacity>
        </View>
  
  
        <View style={{ position:'absolute', top: 30, left: 20}}>
            <TouchableOpacity 
              activeOpacity={0.5}
              onPress={() => navigation.replace('LoginScreen')}
            >
              <Icon 
                name='arrow-back-outline'
                color='white'
                size={25}  
              />
            </TouchableOpacity>
        </View>
  
    </View>
    </KeyboardAvoidingView>

    </View> 
    </>
  )
}
