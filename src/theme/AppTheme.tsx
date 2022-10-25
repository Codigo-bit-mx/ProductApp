import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    containerLogin: {
        flex: 1,
        paddingHorizontal: 20,
        height: 600,
        justifyContent:'center',
        // marginBottom:0
    },
    title:{ 
        color:'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label:{
        color: 'white',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputField:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        
    },
    inputFieldIOS:{
        paddingBottom: 4 
    },
    containerButton: {
        marginTop: 50,
        alignItems: 'center'
    },
    buttonLogin:{
        color:'white',
        borderColor:'white',
        borderWidth:2,
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 5, 
    },
    containerRegister: {
        marginTop: 20,
        alignItems: 'flex-end'
    },

}
) 