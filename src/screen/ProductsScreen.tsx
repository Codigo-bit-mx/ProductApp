import React, {useContext, useEffect} from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductContext';
import { ProductsStackParams } from '../navigator/ProductNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {

  const {products, loadProducts, isLoading} = useContext(ProductsContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight:10}}
          onPress={ () => navigation.navigate('ProductScreen', {})}
        >
          <Icon name='add-outline' size={25}/>
        </TouchableOpacity>
      )
    })
  })

const loadProductsFromBackend = async () => {
  await loadProducts()
}


  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
       
        <FlatList 
            data={products}
            keyExtractor={(p) => p._id} 
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ProductScreen', {id: item._id, name: item.nombre})}
              >
                <Text style={styles.productName}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ () => (
              <View style={styles.itemSeparator} />
            )}  
            refreshControl={
              <RefreshControl
              refreshing={isLoading}
              onRefresh={loadProductsFromBackend}
              progressViewOffset={10}
              colors={['green', 'white']}
           />
            }        
        />
    </View>
  )
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 20
  },
  itemSeparator:{
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(255,255,255,0.5)'
  }
})