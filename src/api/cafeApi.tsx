import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const apiCafe = axios.create({
   // baseURL: 'https://codigobitmxrn.herokuapp.com/api'
baseURL: 'http://192.168.0.15:8080/api'
})

apiCafe.interceptors.request.use(
   async (config) => {
      const token = await AsyncStorage.getItem('token')
      if( token ) {
         config.headers!['x-token'] = token
      }
      return config
   }
)


export default apiCafe