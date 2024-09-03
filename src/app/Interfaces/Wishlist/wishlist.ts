import { Brand, Category, Subcategory } from "../Products/products"

export interface Wishlist {
    status: string
    message: string
    data: string[]
}

export interface WishlistData {
    status: string
    count: number
    data: WishlistProduct[]
}

export interface WishlistProduct {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    __v: number
    id: string
}