import { OrderQuantity } from "./order-quantity.mode";

export interface OrderDetails{
    fullName: string;
    fullAddress: string;
    contactNumber: string;
    alternativeContactNumber: string;
    orderProductQuantityList: OrderQuantity[];
}