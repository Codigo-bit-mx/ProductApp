import React, {useEffect, useState, useContext} from 'react'
import { Text, View, ScrollView, Button, StyleSheet, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductNavigator';
import { TextInput } from 'react-native-gesture-handler';
import { useCategory } from '../hooks/useCategory';
import { ProductsContext } from '../context/ProductContext';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route, navigation}: Props) => {
  
  const {id = '', name = ''} = route.params
  const [ tempUri, setTempUri ] = useState<string>()
  const { loadProductById, addProduct, updateProduct, uploadImage} = useContext(ProductsContext)

  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name, 
    img: ''
  })

  const {isLoading, categories} = useCategory()

  useEffect(() => {
    navigation.setOptions({
      title: (nombre) ? nombre : 'Producto sin nombre'
    })
  }, [nombre])

  useEffect(() => {
    loadProductId()
  }, [])

  const loadProductId = async() => {
    if( id.length === 0 ) return
    const product = await loadProductById(id)
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    })
  }

  const saveOrUpdate = async() => {
    if(id.length > 0) {
      updateProduct(categoriaId, nombre, id )
    } else {
      const tempCategoriesId = categoriaId || categories[0]._id
      const newProduct = await addProduct( tempCategoriesId, nombre)
    
      onChange(newProduct._id, '_id')  
    }
  }

  const takePhoto = () => {
    launchCamera( {
      mediaType:'photo',
      quality: 0.5
    }, (resp) => {
      if(resp.didCancel) return
      if(!resp.assets) return

      setTempUri(resp.assets[0].uri)
      uploadImage(resp.assets[0], _id)
    })
  }

  const takePhotoFromGallery = () => {
    launchImageLibrary( {
      mediaType:'photo',
      quality: 0.5
    }, (resp) => {
      if(resp.didCancel) return
      if(!resp.assets) return
      
      setTempUri(resp.assets[0].uri)
      uploadImage(resp.assets[0], _id)
    })
  }

  return (
    <View style={styles.container}>
       
       <ScrollView>
        <Text style={styles.label}> Nombre del Producto </Text>
        <TextInput 
          placeholder='Producto'
          style={ styles.TextInput }
          value={ nombre }
          onChangeText={(value) => onChange(value, 'nombre')}
        />
        {/* picker / selector */}
        <Text style={styles.label}>Categoria</Text>

        <Picker
          selectedValue={ categoriaId }
          onValueChange={ ( value ) =>
            onChange( value , 'categoriaId')
          }>
          
          { categories.map( cate => (
            <Picker.Item 
                label={cate.nombre}
                value={cate._id}
                key={cate._id}
            />
          ))}

      </Picker>
      
      <Button
        title="Guardar"
        onPress={ saveOrUpdate }
      />

      
      {(_id.length > 0 ) && (
        <View style={{
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center',
            marginTop:20
        }}>

          <Button
            title="Camara"
            onPress={ takePhoto }
          />
          <View style={{width: 30}} />
          <Button
            title="Galeria"
            onPress={ takePhotoFromGallery }
          />

        </View>

        )}

         {
          (img.length > 0 && !tempUri) && (
            <Image
              source={{uri: img}}
              style={{
                width: '100%',
                height: 300
              }}
            />
          )
         }

{
          ( tempUri ) && (
            <Image 
                source={{ uri: tempUri }}
                style={{
                  height: 300,
                  width: '100%',
                  marginTop: 20,

                }}
            />
        )
    }


       </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal:20
  },
  label:{
    fontSize:20,
    marginTop:10,
    marginBottom:10
  },
  TextInput:{
    borderColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    height: 45, 
    marginTop: 5
  },

})