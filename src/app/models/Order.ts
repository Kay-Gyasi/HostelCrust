export class Order{
  customer:string;
  orderNum:string;
  isFulfilled:boolean;
  isDelivery?:boolean;
  additionalInfo?:string;
  deliveryLocation?:string;
}
