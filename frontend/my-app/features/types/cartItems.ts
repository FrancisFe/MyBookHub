export interface CartItem{
    id: string;
    cartId: string;
    bookId: string;
    quantity: number;
    unitPrice: number;
    type: 'Purchase' | 'Rental';
    availableStock: number;
    createdAt: string;
    updatedAt: string;

}

export interface UpdateCartItemDTO {
    cartItemId: string;
    quantity: number;
}
export interface AddToCartDTO {
    bookId: string;
    quantity: number;
    type: 'Purchase' | 'Rental';
    rentalStartDate?: string;
    rentalEndDate?: string;
}