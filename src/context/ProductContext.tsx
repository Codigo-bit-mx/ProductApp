import React, {createContext, useState, useEffect} from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import apiCafe from '../api/cafeApi';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[]
    isLoading: boolean
    loadProducts: () => Promise<void>
    addProduct: ( categoryId: string, productName: string ) => Promise<Producto> 
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>
    deleteProduct: ( id: string ) => Promise<void>
    loadProductById: ( id: string ) => Promise<Producto>
    uploadImage: ( data: any, id:string ) => Promise<void>
}

export const ProductsContext = createContext({} as ProductsContextProps) 

export const ProductsProvider = ({children}: any ) => {

   const [products, setProducts ] = useState<Producto[]>([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
        loadProducts()
   }, [])

   const loadProducts = async () => {   
    try {
            setIsLoading(true)
            const resp = await apiCafe.get<ProductsResponse>('/productos?limite=50')
            setProducts([...resp.data.productos])
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
   }

   const addProduct = async ( categoryId: string, productName: string ): Promise<any> => {
    console.log(categoryId)
    console.log(productName)
    try {
        const resp = await apiCafe.post<Producto>('/productos', {
                nombre: productName,
                categoria: categoryId
        })
        
        setProducts([...products, resp.data])
           return resp.data

        } catch (error) {
            console.log(error)
        }

   }

   const updateProduct = async ( categoryId: string, productName: string, productId: string ) => {   
      try {
           const resp = await apiCafe.put<Producto>(`/productos/${productId}`, {
                nombre: productName,
                categoria: categoryId
           })
           setProducts( products.map( prod => {
            return (prod._id === productId) ? resp.data : prod 
           }) )
           
        } catch (error) {
            console.log(error)
        }

   }
   
   const deleteProduct =  async ( id: string ) => {}

   
   const loadProductById = async ( id: string ): Promise<Producto> => {
    const resp = await apiCafe.get<Producto>(`/productos/${id}`)
    return resp.data
   }
  
   const uploadImage = async ( data: any, id:string ) => {
    if( !data ) return

    const fileToUpload = {
        uri: data.uri,
        type: data.type,
        name: data.fileName 
    }

    console.log(fileToUpload)

    const formData = new FormData()
    formData.append('archivo', data.uri )

    try {
        console.log('entro por aca')
        const resp = await apiCafe.put(`/uploads/productos/${ id }`, formData )
        console.log(resp)
    } catch (error) {
        console.log(error)
    }

   }


    return(
        <ProductsContext.Provider value={{
            products,
            isLoading,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage
        }}>
            {children}
        </ProductsContext.Provider>  
    )
}