export interface LoginData {
    correo: string,
    password: string
}

export interface RegisterData {
    correo: string,
    password: string,
    nombre: string
}

export interface LoginResponse {
    usuario: Usuario
    token: string
}

export interface Usuario {
    rol:    string
    estado: boolean
    google: boolean
    nombre: string
    correo: string
    uid:    string
    img:    string   
}

//Productos
export interface ProductsResponse {
    total: number
    productos: Producto[]
}

export interface Producto {
    precio: number
    _id: string
    nombre: string
    categoria: Categoria
    usuario: Categoria
    img?: string
}

// Categorias 
export interface CategoriaResponse {
    total:      number;
    categorias: Categoria[];
}

export interface Categoria {
    _id:     string;
    nombre:  string;
    usuario?: CreadoPorUsuario;
}

export interface CreadoPorUsuario {
    _id:    string;
    nombre: string;
}
