import React, {useState, useEffect} from 'react';
import apiCafe from '../api/cafeApi';
import { Categoria, CategoriaResponse } from '../interfaces/appInterfaces';

export const useCategory = () => {
    
  const [isLoading, setIsLoading] =useState(true)
  const [categories, setCategories] = useState<Categoria[]>([])
    
  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = async() => {
   
    const resp = await apiCafe.get<CategoriaResponse>('/categorias')
    setCategories(resp.data.categorias)
    setIsLoading(false)
}

 return {
    isLoading,
    categories
  }
}
