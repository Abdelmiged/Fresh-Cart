import { Brand, Category, Subcategory } from "../Products/products"

export interface Cart {
    status: string
    message?:string
    numOfCartItems: number
    cartId: string
    data: Data
}

export interface Data {
    _id: string
    cartOwner: string
    products: Product[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface Product {
    count: number
    _id: string
    product: Product2
    price: number
}

export interface Product2 {
    subcategory: Subcategory[]
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}