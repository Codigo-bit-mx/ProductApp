import React, { createContext, useReducer, useEffect } from "react";
import apiCafe from "../api/cafeApi";
import { Usuario, LoginData, LoginResponse, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from "./authReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessage: string
    token: string | null
    user: Usuario | null
    status: 'checking' | 'authenticated' | 'not-authenticated'
    signUp: ({correo, password, nombre}: RegisterData) => void
    signIn: ({correo, password}: LoginData) => void
    logOut: () => void
    removeError: () => void
}

const initialState: AuthState = {
    status: 'checking',
    token: null,
    errorMessage: '',
    user: null
}

export const AuthContext = createContext( {} as AuthContextProps)

export const AuthProvider = ( {children} : any ) => {
    
  const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        checkToken()
    }, [])
    
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    // no token, no autenticado
    if(!token) return dispatch({ type: 'notAuthenticated' })

    // hay token
    const resp = await apiCafe.get('/auth')
    if(resp.status !== 200){
        return dispatch({type: 'notAuthenticated'})
    }
    await AsyncStorage.setItem('token', resp.data.token)
    dispatch({
        type: 'signUp',
        payload: {
            token: resp.data.token,
            user: resp.data.usuario
        }
    })

  }

  const signIn = async ({correo, password}: LoginData) => {
     try {
        const resp = await apiCafe.post<LoginResponse>('auth/login', {correo, password})
        dispatch({
            type:'signUp',
            payload: {
                user: resp.data.usuario, 
                token: resp.data.token
            }
        })
        await AsyncStorage.setItem('token', resp.data.token)
     } catch (error: any) {
        dispatch({
            type:'addError',
            payload: error.response.data.msg || 'Informacion Incorrecta'
        })
     }

  }
  
  const signUp = async ({correo, password, nombre}: RegisterData) => {    
    try {
       const resp = await apiCafe.post('usuarios', {correo, password, nombre})
       dispatch({
        type: 'signUp',
        payload: {
            user: resp.data.usuario, 
            token: resp.data.token
        }
       })
       await AsyncStorage.setItem('token', resp.data.token)
    } catch (error: any) {
        dispatch({
            type:'addError',
            payload: error.response.data.errors[0].msg || 'Revise la informacion'
        })
    }
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('token')
    dispatch({
        type: 'logout'
    })
  }


  const removeError = () => {
    dispatch({
        type: 'removeError'
    })
  }

    return(
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}