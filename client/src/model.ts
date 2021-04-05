export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    category: string
}

export interface Cart {
    id: number,
    adress: string
    user: User,
    phone: string,
    items: Order[]
}
export interface ProductCategory {
    id: number,
    name: string
}
export interface Product {
    id: number,
    name: string,
    description: string,
    picture: string,
    price: number,
    productCategory: ProductCategory
}

export interface Order {
    ammount: number,
    product: Product,
    cart?: Cart
}