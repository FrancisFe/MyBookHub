import { OrderItems } from "./orderItems";

export interface Order{
    id:string;
    userId:string;
    orderDate:string;
    totalAmount:number;
    status:string;
    items: OrderItems[];
}

export interface OrderDto{
    userId:string;
    orderDate:string;
    totalAmount:number;
    status:string;
    items: OrderItems[];
}