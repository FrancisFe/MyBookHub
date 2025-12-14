import { CartItem } from "./cartItems";

export interface Cart{
    id: string;
    userId: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    items: CartItem[];
}
