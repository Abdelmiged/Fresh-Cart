export interface UserData {
    id: string
    name: string
    role: string
    iat: number
    exp: number
}

export interface ShippingAddress {
    details: string
    phone: string
    city: string
}