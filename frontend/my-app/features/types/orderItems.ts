export interface OrderItems{
    id:string;
    orderId:string;
    bookId:string;
    quantity:number;
    price:number;
    type:string;
    rentalStartDate?:string;
    rentalEndDate?:string;
    rentalReturnedDate?:string;
    isReturned:boolean;


}

export interface OrderItemDto{
    bookId:string;
    bookTitle:string;
    quantity:number;
    price:number;
    subtotal:number;
}

export interface OrderSimpleDto{
    bookId:string;
    orderDate:string;
    totalAmount:number;
    status:string;
}